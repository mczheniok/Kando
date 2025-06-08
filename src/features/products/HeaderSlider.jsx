"use client"

import { useRef, useState } from "react"
import styles from "./slider.module.css"
import { CardBlockPicture } from "@/components/Cards/Card"

export const HeadSlider = () => {
    const sliderRef = useRef(null)
    const info = "Створення Інтернет магазину"
    const [slideOpacities, setSlideOpacities] = useState([1, 1, 1]); // Используем массив для прозрачности каждого слайда
    const arrSlides = [
        {
            title: "Максимальна швидкість",
            text: "це найшвидший в Україні! Завдяки передовим технологіям, оптимізованому коду та потужним серверним рішенням ми гарантуємо блискавичне завантаження сторінок, навіть за умов високих навантажень. Незалежно від вашого місцезнаходження, ви завжди зможете насолоджуватися миттєвим доступом до всіх наших сервісів. Без затримок, без відставань — тільки швидкість та зручність!",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        },
        {
            title: "Штучній Інтелект",
            text: "Автоматизуйте створення описів за допомогою штучного інтелекту. Це дозволяє швидко та якісно генерувати тексти, які приваблюють увагу потенційних покупців.Переваги: Швидкість, якість, персоналізація та економія часу.",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.webp"
        },
        {
            title: "Третій слайд",
            text: "Текст третього слайда",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        }
    ]

    const handleScroll = () => {
        const scrollTop = sliderRef.current.scrollTop;
        const sliderHeight = sliderRef.current.scrollHeight - sliderRef.current.clientHeight; // Высота прокрутки

        // Рассчитываем прозрачность для каждого слайда на основе позиции прокрутки
        const newOpacities = slideOpacities.map((_, index) => {
            const slideStart = (sliderHeight / slideOpacities.length) * index; // Начало слайда
            const slideEnd = (sliderHeight / slideOpacities.length) * (index + 1); // Конец слайда
            
            let opacity = 1;

            if (scrollTop < slideStart+120) {
                opacity = 1;
            } else if (scrollTop > slideEnd+120) {
                opacity = 0;
            } else {
                opacity = 1 - (scrollTop - slideStart) / (slideEnd - slideStart);
            }

            return Math.max(0, Math.min(1, opacity)); // Ограничиваем значение от 0 до 1
        });

        setSlideOpacities(newOpacities);
    };

    return (
        <section className="flex flex-col align-center" style={{height: "fit-content"}}>
            <span style={{width: "60%",textAlign: "center",color: "linear-gradient(to right,#fbad41,#f63)"}}>
                <h1>Наша платформа Kando накраще місце для</h1>
                <h1 className={styles.HeaderColor}>{info}</h1>
            </span>
            <div ref={sliderRef} style={{overflow: "auto",maxHeight: "265px"}} onScroll={handleScroll}>
                {slideOpacities.map((opacity,ind) => {
                    return (
                        <div key={`el-in-slider-${ind}`} className={`${styles.SliderBlock} flex flex-row align-center`} style={{opacity: `${opacity}`}}> 
                            <div className={`${styles.SliderBlock} flex flex-col`} > 
                                <h1>{arrSlides[ind].title}</h1>
                                <h3 style={{fontWeight: "400"}}>{arrSlides[ind].text}</h3>
                            </div>
                            <div className={`${styles.SliderBlock}`}>
                                <picture style={{width: "100%",height: "100%"}} className="flex flex-col align-center justify-center" >
                                    <source srcSet={[arrSlides[ind].src]} type="image/webp" />
                                    <img src={arrSlides[ind].image} alt="🚀" width="150" height="150" />
                                </picture>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export const SliderInfo = () => {
    const arrInfo = [
        {
            title: "Максимальна швидкість",
            text: "це найшвидший в Україні! Завдяки передовим технологіям, оптимізованому коду та потужним серверним рішенням ми гарантуємо блискавичне завантаження сторінок, навіть за умов високих навантажень. Незалежно від вашого місцезнаходження, ви завжди зможете насолоджуватися миттєвим доступом до всіх наших сервісів. Без затримок, без відставань — тільки швидкість та зручність!",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        },
        {
            title: "Штучній Інтелект",
            text: "Автоматизуйте створення описів за допомогою штучного інтелекту. Це дозволяє швидко та якісно генерувати тексти, які приваблюють увагу потенційних покупців.Переваги: Швидкість, якість, персоналізація та економія часу.",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.webp"
        },
        {
            title: "Третій слайд",
            text: "Текст третього слайда",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        }
    ]


    return (
        <div className="flex flex-col align-center" style={{width: "100%",overflowX: "hidden"}}>
            <div className={`${styles.SliderContainer} flex flex-row`}  style={{background: "var(--background)",marginTop: "40px",width: "100%"}}>
            {arrInfo.map((el,ind) => {
            return (
                <div key={`el-in-slider-${ind}`} className={`${styles.SliderBlock} flex flex-row align-center`}> 
                    <div>
                        <div className={`${styles.SliderInfo} flex flex-col`} > 
                            <h1>{el.title}</h1>
                            <h3 style={{fontWeight: "400"}}>{el.text}</h3>
                        </div>
                    </div>
                    <div className={`${styles.SliderInfo}`}>
                        <picture style={{width: "100%",height: "100%"}} className="flex flex-col align-center justify-center" >
                            <source srcSet={el.src} type="image/webp" />
                            <img src={el.image} alt="🚀" width="150" height="150" />
                        </picture>
                    </div>
                </div>
            )
            })}
            {arrInfo.map((el,ind) => {
            return (
                <div key={`el-in-slider-${ind}`} className={`${styles.SliderBlock} flex flex-row align-center`}> 
                    <div className={`${styles.SliderInfo} flex flex-col`} > 
                        <h1>{el.title}</h1>
                        <h3 style={{fontWeight: "400"}}>{el.text}</h3>
                    </div>
                    <div className={`${styles.SliderInfo}`}>
                        <picture style={{width: "100%",height: "100%"}} className="flex flex-col align-center justify-center" >
                            <source srcSet={el.src} type="image/webp" />
                            <img src={el.image} alt="🚀" width="150" height="150" />
                        </picture>
                    </div>
                </div>
            )
            })}
        </div>
        </div>
    )
}



export const HeroCardsBlock = () => {
    const Cards = [
        {
            title: "Максимальна швидкість",
            text: "це найшвидший в Україні! Завдяки передовим технологіям, оптимізованому коду та потужним серверним рішенням ми гарантуємо блискавичне завантаження сторінок, навіть за умов високих навантажень. Незалежно від вашого місцезнаходження, ви завжди зможете насолоджуватися миттєвим доступом до всіх наших сервісів. Без затримок, без відставань — тільки швидкість та зручність!",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        },
        {
            title: "Штучній Інтелект",
            text: "Автоматизуйте створення описів за допомогою штучного інтелекту. Це дозволяє швидко та якісно генерувати тексти, які приваблюють увагу потенційних покупців.Переваги: Швидкість, якість, персоналізація та економія часу.",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.webp"
        },
        {
            title: "Третій слайд",
            text: "Автоматизуйте створення описів за допомогою штучного інтелекту. Це дозволяє швидко та якісно генерувати тексти, які приваблюють увагу потенційних покупців.Переваги: Швидкість, якість, персоналізація та економія часу.",
            image: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif",
            src: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp"
        }
    ]
    

    return (
        <section className={`${styles.InfoCardsContainer} flex flex-row`}>            
            {Cards.map((el,ind) => {
                return (
                    <CardBlockPicture text={el.text} img={el.image} title={el.title} src={el.src} key={`info-card-el-${ind}`}></CardBlockPicture>
                )
            })}
        </section>
    )
}
