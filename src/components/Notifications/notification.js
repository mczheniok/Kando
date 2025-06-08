"use client"
import { ToastContainer,toast } from "react-toastify";

export function NotificationContainer() {
    return (
        <ToastContainer position="bottom-right"></ToastContainer>
    )
}

export function SendNotify(title,type) {
    return toast(title,{
        type: type, //'info', 'success', 'warning', 'error', 'default'
        autoClose: 4500
    });
}
