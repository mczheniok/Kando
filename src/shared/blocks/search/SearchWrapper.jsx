import SearchComponent from "./Search"
import { Suspense } from "react";

export function Search() {
    return (
        <Suspense fallback={<div>Завантаження пошуку...</div>}>
            <SearchComponent />
        </Suspense>
    )
}