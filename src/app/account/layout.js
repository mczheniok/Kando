import styles from "./account.module.css"
import Header  from "../../shared/blocks/Header";
import Footer from  "../../shared/blocks/Footer";
import { LeftBarContainer } from "./leftbar/leftbar";
import { NotificationContainer } from "../../components/Notifications/notification"
import { Suspense } from "react";

export const metadata = {
    robots: {
        index: false,
        follow: false
    }
}


export default function AccountLayout({ children }) {
    return (
        <div>
            <Header></Header>
                <main className={`container ${styles.GridAccount}`}>
                    <LeftBarContainer />
                    <div className={`${styles.main} flex flex-col`}>
                        <Suspense fallback={<div style={{minHeight: "600px",width: "100%"}}>🚀 Загрузка...</div>}>
                            {children}
                        </Suspense>
                    </div>
                </main>
                <NotificationContainer />
            <Footer></Footer>
        </div>
    )
}
