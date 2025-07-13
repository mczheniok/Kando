// This should be in /public/workers/fetch-worker.js
self.addEventListener('message', handleApirequest);

async function handleApirequest(event) {
    const { payload } = event.data;
    try {
        const response = await fetch(payload.url, payload.options || {}); 
        
        

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        self.postMessage({
            type: "FETCH_SUCCESS",
            payload: { data } // Fix: wrap data in payload object
        });
    } catch (error) {
        self.postMessage({
            type: "ERROR",
            payload: {
                message: error.message,
                type: error.status
            }
        });
    }
}