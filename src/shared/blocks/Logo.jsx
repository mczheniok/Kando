import localFont from "next/font/local"
import Link from "next/link"


const pacifico = localFont({
    src: "../../../public/fonts/pacifico.ttf",
    style: "latin",
    weight: "400"
})



export default function Logo({size,type=false}) {
    switch(type) {
        case true: 
            
        return <Link href={"/"} className={`${size} ${pacifico.className}`}>Kando</Link>;

        case false:

        return <span className={`${size} ${pacifico.className}`}>Kando</span>;
    }
}