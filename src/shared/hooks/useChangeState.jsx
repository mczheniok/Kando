import { useState } from "react";


export default function useChange(prev) {
    const [state,set] = useState(prev);

    return [state,set];
} 