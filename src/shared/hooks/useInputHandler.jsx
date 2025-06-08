import { useRef } from "react";

export function useInputHandler(obj) {//obj = start data;
    const dataRef = useRef(obj);

    const handler = (e) => {
        const trg = e.target;
        dataRef[trg.name] = trg.value
        return;
    }

    return [dataRef,handler];
}