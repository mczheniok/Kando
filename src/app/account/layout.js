import styles from "./account.module.css"
import Header  from "../../shared/blocks/Header";
import Footer from  "../../shared/blocks/Footer";
import { LeftBar } from "./leftbar/leftbar";
import { NotificationContainer } from "../../components/Notifications/notification"


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
                    <LeftBar />
                    <div className={`${styles.main} flex flex-col`}>
                        {children}
                    </div>
                </main>
                <NotificationContainer />
            <Footer></Footer>
        </div>
    )
}
