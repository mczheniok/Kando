import { useLayoutEffect, useState } from "react";
import { socket } from "@/features/client/socket";

export function useSocket() {
    const [status, setStatus] = useState(socket.connected);

    useLayoutEffect(() => {
        // Подключаемся только если не подключены
        if (!socket.connected) {
            socket.connect();
        }

        const onConnect = () => {
            setStatus(true);
        };

        const onDisconnect = () => {
            setStatus(false);
        };

        // Устанавливаем начальный статус
        setStatus(socket.connected);

        // Подписываемся на события
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            // Отписываемся от событий, но НЕ закрываем socket
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            // НЕ ДЕЛАЙТЕ socket.close() здесь!
        };
    }, []);

    return [socket, status];
}