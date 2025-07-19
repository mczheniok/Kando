"use client"

import { 
    useEffect,
    useRef
} from "react";


export const TelegramLoginWidget = ({ botName, authUrl }) => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        if (containerRef.current) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.async = true;
            script.setAttribute('data-telegram-login', botName);
            script.setAttribute('data-auth-url', authUrl);
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-radius', '10');
            script.setAttribute('data-request-access', 'write');
            
            containerRef.current.appendChild(script);
            
            return () => {
                if (containerRef.current) {
                    containerRef.current.innerHTML = '';
                }
            };
        }
    }, [botName, authUrl]);
    
    return <div ref={containerRef}></div>;
};