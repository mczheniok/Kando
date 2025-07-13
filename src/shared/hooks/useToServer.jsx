import { SendNotify } from "@/components/Notifications/notification";
import { useState, useEffect, useRef } from "react";
import { getFromCache, setToCache } from "../db/indexedDB";

function checkStatus(status,error) {
    switch(status) {
        case 429: 
            return SendNotify("Забагато запитів", "error");
        default:
            return SendNotify(error,"error");
    }
}

export function useToServer(url, n = true, t = true) {
    const [data, setData] = useState(t ? [] : {});
    const [isLoading, setIsLoading] = useState(false);
    const workerRef = useRef(null);
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        const initWorkerAndFetch = async () => {
            setIsLoading(true);

            try {
                const cached = await getFromCache(url);
                if (cached) {
                    setData(cached);
                }

                if (!workerRef.current) {
                    workerRef.current = new Worker("/workers/fetch-worker.js");
                }

                const response = await new Promise((resolve, reject) => {
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
                    
                    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL_URL || '';
                    workerRef.current.postMessage({
                        payload: { 
                            url: `${baseUrl}${url}`, 
                            options: {
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                        }
                    });
                });

                if (response.status) {
                    checkStatus(response.status);
                }

                if (response.err || response.error) {
                    SendNotify(response.message || "Помилка запиту", "error");
                    return;
                }
                const responseData = response.data || response;
                
                await setToCache(url, responseData);
                setData(responseData);
            } catch (err) {
                const errorMessage = err.message || "Помилка мережі";
                SendNotify(errorMessage, "error");
            } finally {
                setIsLoading(false);
            }
        };

        initWorkerAndFetch();

        // Cleanup
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
                workerRef.current = null;
            }
        };
    }, [url, n]); // Только url и n в зависимостях

    return [isLoading, data];
}