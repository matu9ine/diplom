import React from 'react'
import Title from '../components/Title';
import style from '../assets/styles/contacts.module.css'

const Contacts = () => {
  return (
    <>
        <Title 
            title="КОНТАКТЫ. МЫ РЯДОМ. ВСЕГДА."
            description={`Master&Ko – ваш агрегатор проверенных сервисов по ремонту бытовой техники. Если у вас есть вопросы, предложения о сотрудничестве или нужна помощь в подборе мастера – мы всегда рады помочь онлайн, либо же вы можете придти в наш физический филлиал по ул. Яблочкова, 1В.`}
        />
        <section>
            <div className={style.wrapper}>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaecd2e49eeaca6d6a83f682e415fe3f93729788525fa503fb3976442ee02ec16&amp;source=constructor" width="100%" height="400" />
                <div className={style.box}>
                    <div className={style.box__item}>
                        <div className={style.title__box}>
                            <img src="/img/contact_1.svg" className={style.box__image} alt="Гарантия качества" />
                            <h1 className={style.title}>
                                Гарантия качества и надежности
                            </h1>
                        </div>
                        <p className={style.descr}>
                            Агрегатор может проверять и фильтровать исполнителей (например, по отзывам, опыту, лицензиям), предлагая клиентам только проверенные варианты, что снижает риски некачественного ремонта.
                        </p>
                    </div>
                    <div className={style.box__item}>
                        <div className={style.title__box}>
                            <img src="/img/contact_2.svg" className={style.box__image} alt="Гарантия качества" />
                            <h1 className={style.title}>
                                Экономия времени и удобство
                            </h1>
                        </div>
                        <p className={style.descr}>
                            Пользователи могут быстро сравнить цены, отзывы и рейтинги мастеров или сервисных центров в одном месте, не тратя время на самостоятельный поиск через разные площадки.
                        </p>
                    </div>
                    <div className={style.box__item}>
                        <div className={style.title__box}>
                            <img src="/img/contact_3.svg" className={style.box__image} alt="Гарантия качества" />
                            <h1 className={style.title}>
                                Прозрачность и выгодные условия
                            </h1>
                        </div>
                        <p className={style.descr}>
                            Возможность увидеть реальные расценки разных мастеров, акции или спецпредложения, а также условия гарантии на работы — это помогает пользователям выбрать оптимальный вариант по цене и качеству.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Contacts