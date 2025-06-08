import styles from "./info.module.css";


export function SkeletonWithShimmer({w=100,h=25}) {
    return (
        <div className={styles.shimmer} style={{width: `${w}px`,height: `${h}px`}}></div>
    )
}

export function SkeletonCircleWithShimmer({w=100,h=100}) {
    return (
        <div className={styles.shimmer} style={{width: `${w}px`,height: `${h}px`,aspectRatio: '1',borderRadius: "50%"}}></div>
    )
}