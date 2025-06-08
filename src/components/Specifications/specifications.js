"use client"
import styles from "./specifications.module.css";
import { SendNotify } from "../Notifications/notification";

export default function Specifications({ TableList }) {
  setTimeout(() => {
    SendNotify("Error in Data","error")
    console.log(true);
  },1500)

  return (
    <ul className={`${styles.SpecificationsList} flex flex-col align-center`}>
      {TableList.map((el, ind) => {
        return (
          <li key={`specification-table-el-${ind}`} className={`${styles.SpecificationsBlock} flex flex-row`}>
            <div className={`${styles.SpecificationsInfo} flex flex-row`} style={{gap: "0"}}>
              <div className={styles.SpecificationsKey}>
                <h3>{el.key}</h3>
              </div>
              <div className={styles.SpecificationsValue}>
                <h3>{el.value}</h3>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
}