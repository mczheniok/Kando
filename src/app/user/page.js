import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer"
import { MainContainer } from "@/components/Containers/container"
import Image from "next/image"
import Link from "next/link"

export default function ViewUserPage() {
    const image = []

    const SocialLinkRef = ({src,name}) => {
        return (
            <Link href={"/"}>
                <Image width={40} height={40} src={`/logos/${src}`} alt={`${name} logo`}></Image>
            </Link>
        )
    }

    return (
        <>
            <Header/>
                <MainContainer>
                    <section className="flex flex-col align-center" style={{width: '100%',height: "1200px",gap: "0rem"}}>
                        <article style={{width: '100%',height: "40vh",position: "relative"}}>
                            <Image alt="User banner" height={320} width={1050} style={{objectFit: "cover",width: '100%',height: '100%',objectPosition: "center"}} src={"/assets/leleka.jpg"}></Image> 
                            <div className="flex flex-row align-center" style={{position: "absolute",background: "rgba(0,0,0,0.1)",padding: '.3rem .5rem',borderRadius: "1rem",right: ".5rem",bottom: ".5rem",zIndex: "100"}}>
                                <SocialLinkRef src={"telegram.svg"} name={"Telegram"}></SocialLinkRef>
                                <SocialLinkRef src={"google.png"} name={"Google"}></SocialLinkRef>
                                <SocialLinkRef src={"github.png"} name={"github"}></SocialLinkRef>
                            </div>
                        </article>
                        <article className="flex flex-row align-start" style={{width: "85%",padding: "2rem 0rem"}}>
                            <Image alt="user avatar" style={{borderRadius: "50%",transform: "translateY(-70%)",aspectRatio: "1",width: "175px",height: "175px"}} src={"/assets/me.jpg"} height={175} width={175}></Image>

                            <h1>i144hz</h1>
                        </article>
                    </section>              
                </MainContainer>
            <Footer/>
        </>
    )
}