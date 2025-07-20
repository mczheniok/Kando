import styles from "./blocks.module.css";
import Logo from "./Logo";

import { HeadNav } from "./Header/headNav";

function Header() {
    return ( 
        <header className={`${styles.header} flex flex-row align-center`}>
            <div className="container flex flex-row align-center justify-between">
                <Logo size={`${styles.logo}`} type={true}></Logo>
                <HeadNav></HeadNav>  
            </div>  
        </header>
    )    
};

export default Header; 