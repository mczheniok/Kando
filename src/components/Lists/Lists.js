import styles from "./list.module.css"

export const Listh4 = ({list,className,s}) => {
    return (
      <div className={className}>
          {list?.map((el,ind) => {
          return <h4 className={styles.CategoryElement} key={`${s}-list-el-${ind}`}>{el}</h4>
          })}
      </div>
    ) 
  }
