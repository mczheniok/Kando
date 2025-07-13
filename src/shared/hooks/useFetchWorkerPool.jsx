import { useEffect, useRef, useState } from 'react';

export function useFetchWorkerPool(poolSize = 4) {
  const workersRef = useRef([]);
  const queueRef = useRef([]);
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      for (let i = 0; i < poolSize; i++) {
        const worker = new Worker('/workers/service-worker.js');
        worker.busy = false;
        worker.id = i;
        workersRef.current.push(worker);
      }
    }

    return () => {
      workersRef.current.forEach(worker => worker.terminate());
    };
  }, [poolSize]);

  const executeRequest = (payload) => {
    return new Promise((resolve, reject) => {
      const availableWorker = workersRef.current.find(w => !w.busy);
      
      if (availableWorker) {
        runRequest(availableWorker, payload, resolve, reject);
      } else {
        queueRef.current.push({ payload, resolve, reject });
      }
    });
  };

  const runRequest = (worker, payload, resolve, reject) => {
    worker.busy = true;
    setActiveRequests(prev => prev + 1);

    const handleMessage = (event) => {
      const { type: responseType, payload: responsePayload } = event.data;
      
      worker.removeEventListener('message', handleMessage);
      worker.busy = false;
      setActiveRequests(prev => prev - 1);

      if (responseType === 'ERROR') {
        reject(new Error(responsePayload.message));
      } else {
        resolve(responsePayload);
      }
      
      // Обрабатываем очередь
      if (queueRef.current.length > 0) {
        const {  payload: nextPayload, resolve: nextResolve, reject: nextReject } = queueRef.current.shift();
        runRequest(worker, nextPayload, nextResolve, nextReject);
      }
    };

    worker.addEventListener('message', handleMessage);
    worker.postMessage({ payload });
  };

  const fetchMultiple = async (urls) => {
    const requests = urls.map(url => 
      executeRequest({ url })
    );
    
    return Promise.all(requests);
  };

  return {
    fetchJson: (url, options) => executeRequest({ url, options }),
    fetchMultiple,
    activeRequests
  };
}