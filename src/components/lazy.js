"use client"
import dynamic from "next/dynamic"
import loading from "./loader"

export const LazyVideoSection = dynamic(() => import("./Products/Video"),{ssr: false,loading: loading});
export const LazyProductList = dynamic(() => import("./ProductsList/Products"),{ssr: false,loading});
export const LazyMap = dynamic(() => import("./Map/map"),{ssr: false,loading});
export const LazyReviewsSection = dynamic(() => import("./Reviews/ReviewsBlock"),{ssr: false,loading});
export const LazySpecifications = dynamic(() => import("./Specifications/specifications"),{ssr: false,loading});
export const LazyNone = dynamic(() => import("@/shared/information/none"),{ssr: false,loading});
export const LazyCategory = dynamic(() => import("@/features/products/CategoryBlock/herocategoryblock").then(mod => ({default: mod.HeroCategory})),{ssr: false,loading});
export const LazySearch = dynamic(() => import("../shared/blocks/search/Search").then(mod => ({default: mod.default})),{ssr: false,loading});