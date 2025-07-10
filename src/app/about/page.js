import Header from "@/shared/blocks/Header"
import Footer from "@/shared/blocks/Footer";
import { ContainerLanguage , MainContainer } from "@/components/Containers/container";
import Logo from "@/shared/blocks/Logo";    


export default function Page() {
    const UL = ({children,title,style=""}) => {
        return (
            <>
                <h2>{title}</h2>
                <ul style={{paddingLeft: "2rem",listStyle: "circle",gap: ".8rem"}} className="flex flex-col ">
                    {children && children}
                </ul>
            </>
        )
    }

    return (
        <ContainerLanguage>
          <link rel="canonical" href="https://kando.pp.ua/about" />
          <Header></Header>
            <MainContainer>
                <section className="flex flex-col align-start" style={{padding: "1rem 0rem",gap: "1.5rem"}}>
                    <h1>
                        Про нас
                    </h1>

                    <span>
                        Привіт! Мене звати Євгеній, і я — засновник Kando — українського маркетплейсу, створеного для того, щоб кожен міг зручно продавати й знаходити потрібні речі або послуги у своєму місті та по всій Україні.
                    </span>

                    <span>
                        Ідея створити Kando з'явилася з особистого досвіду — мені завжди хотілося мати просту та зрозумілу платформу, без зайвих кроків, де можна швидко розмістити оголошення та знайти потенційного покупця або продавця. На відміну від складних сервісів, де важко зорієнтуватись, я прагну зробити Kando максимально доступним для кожного — незалежно від досвіду чи технічних знань.
                    </span>

                    <UL title={"На нашій платформі ви можете розміщувати оголошення про продаж:"}>
                        <li>побутової техніки та електроніки;</li>
                        <li>меблів і предметів інтер'єру;</li>
                        <li>одягу, взуття, аксесуарів;</li>
                        <li>авто, мото та велотехніки;</li>
                        <li>нерухомості;</li>
                        <li>послуг і багато іншого.</li>
                    </UL>
                    <span>
                        Ми не підтримуємо онлайн-оплати — і це свідоме рішення на початковому етапі. Kando — це простір для прямих контактів між продавцем і покупцем. Ви самостійно домовляєтесь про зустріч, умови продажу або доставки через особистий чат.
                    </span>
                    <UL title={"Зараз сайт активно розвивається. Найближчим часом планую впровадити:"}>
                        <li>функції просування оголошень для збільшення охоплення;</li>
                        <li>базову аналітику переглядів;</li>
                        <li>можливість створення профілю продавця з рейтингом та історією оголошень;</li>
                        <li>інтеграцію з Google Ads та аналітикою для більш ефективної реклами.</li>
                    </UL>
                    
                    <span>
                        Я самостійно працюю над розвитком Kando і завжди відкритий до зворотного зв’язку. Якщо у вас є побажання, ідеї або ви знайшли помилки — не соромтесь писати. Разом ми зробимо цей проєкт ще кращим.
                    </span>
                    <span style={{marginTop: "2rem"}}>
                        Дякую, що обираєте Kando!
                    </span>
                    <Logo size="h1-text">

                    </Logo>
                </section>
            </MainContainer>
          <Footer></Footer>
        </ContainerLanguage>
    )
}