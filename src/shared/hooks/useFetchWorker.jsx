import { 
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

export function useFetchWorker() {
    const workerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isWorkerReady, setIsWorkerReady] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                // Fix: Use correct worker file name
                workerRef.current = new Worker("/workers/fetch-worker.js");
                
                workerRef.current.onmessage = event => {
                    const { type, payload } = event.data;
                    setIsLoading(false);
                    if (type === "ERROR") {
                        setError(payload.message);
                    } else {
                        setError(null);
                    }
                };

                workerRef.current.onerror = (error) => {
                    console.error("Worker error:", error);
                    setError("Worker failed to load");
                    setIsLoading(false);
                };

                // Mark worker as ready
                setIsWorkerReady(true);
            } catch (err) {
                console.error("Failed to create worker:", err);
                setError("Failed to initialize worker");
            }
        }

        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, []);

    const fetchJson = useCallback((url, options = {}) => {
        return new Promise((resolve, reject) => {
            if (!workerRef.current || !isWorkerReady) {
                reject(new Error("Worker not initialized"));
                return;
            }

            setIsLoading(true);
            setError(null);
            
            const handleMessage = event => {
                const { type, payload } = event.data;
                if (type === "FETCH_SUCCESS") {
                    workerRef.current.removeEventListener("message", handleMessage);
                    resolve(payload.data);
                } else if (type === "ERROR") {
                    workerRef.current.removeEventListener("message", handleMessage);
                    reject(new Error(payload.message));
                }
            };

            workerRef.current.addEventListener("message", handleMessage);
            
            // Fix: Check environment variable name
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_URL || '';
            workerRef.current.postMessage({
                payload: { 
                    url: `${baseUrl}${url}`, 
                    options 
                }
            });
        });
    }, [isWorkerReady]);

    return {
        fetchJson,
        isLoading,
        error,
        isWorkerReady
    };
}