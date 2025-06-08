const TTL = 5 * 60 * 1000;


export function openCacheDB(dbName) {
    return new Promise((resolve,reject) => {
        const req = indexedDB.open(dbName,1);

        req.onupgradeneeded = e => {
            const db = e.target.result;
            if(!db.objectStoreNames.contains("cache")) {
                db.createObjectStore("cache",{keyPath: "url"});
            }
        }

        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    }) 
}

export async function getFromCache(url) {
    const db = await openCacheDB("kando");

    return new Promise((resolve,reject) => {
        const tx = db.transaction("cache","readonly");
        const store = tx.objectStore("cache");
        const req = store.get(url);

        req.onsuccess = () => {
            const result = req.result;
            if(!result) return resolve(null);

            const expired = Date.now() - result.timestamp > TTL;
            if(expired) {
                db.transaction("cache","readwrite").objectStore("cache").delete(url);
                return resolve(null);
            }

            return resolve(result.data);
        }

        req.onerror = () => resolve(null);
    })
}

export async function setToCache(url,data) {
    const db = await openCacheDB("kando");

    return new Promise((resolve) => {
        const tx = db.transaction("cache","readwrite");
        const store = tx.objectStore("cache");
        store.put({ url, data, timestamp: Date.now() });

        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
    })
}