import React from 'react';
import { Link } from 'react-router-dom';
import style from '../assets/styles/about.module.css';
import Title from '../components/Title';
import FAQ from './FAQ';

function About({setAlert}) {
  return (
    <>
      <Title
        title="О НАС. МЫ БОЛЬШЕ ЧЕМ СЕРВИС"
        description={`Master&Ko — это удобный агрегатор услуг по ремонту бытовой техники, который помогает быстро найти проверенных мастеров в вашем городе. Мы сотрудничаем только с квалифицированными специалистами, чтобы гарантировать качественный ремонт по справедливой цене.`}
      />
      <section>
        <div className={style.wrapper}>
          <h1 className={style.mainTitle}>
            Наша миссия
          </h1>
          <div className={style.coopertation__grid}>
              <div className={`${style.cooperation__info_box}`}>
                <div className={style.cooperation__info_textbox}>
                  <p className={style.cooperation__info}>
                    В 2004 году инженер Александр Пушкин столкнулся с типичной для того времени проблемой - его холодильник "Бирюса"
                    вышел из строя, а найти толкового мастера оказалось невероятно сложно. После трех дней 
                    безуспешных поисков через газету "Из рук в руки" и советы знакомых, Александр понял: городу нужен
                    принципиально новый подход к организации ремонта бытовой техники.
                  </p>
                  <p className={style.cooperation__info}>
                    Собрав небольшую команду из двух таких же энтузиастов, он создал первый прототип сервиса Master&Ko. В тесной комнатке на окраине Астрахани появился call-центр с двумя телефонными линиями 
                    и бумажным каталогом мастеров. Первый год работы показал - идея востребована: ежемесячно обрабатывали около 300 заявок.
                  </p>
                </div>
                <img className={style.cooperation__image} src="/img/start_master.png" alt="Начинающий мастер" />
              </div>
              <div className={`${style.cooperation__info_box} ${style.reverse}`}>
                <div className={style.cooperation__info_textbox}>
                  <p className={style.cooperation__info}>
                    Двадцать лет назад мы начали с простой идеи — сделать ремонт техники удобным, быстрым и надежным. 
                    Сегодня Master&Ko — это тысячи довольных клиентов и десятки тысяч отремонтированных приборов. 
                    Наши мастера проходят строгий отбор, а каждый ремонт сопровождается гарантией.
                  </p>
                  <p className={style.cooperation__info}>
                    Зарегистрируйтесь на нашем сайте и получайте качественные услуги уже сегодня! Мы ценим ваше время и доверие — оставьте заявку прямо сейчас, 
                    и уже сегодня ваша техника снова будет работать как новая.
                  </p>
                  <Link className={style.cooperation__link} to='/masters'>
                    <button className={style.cooperation__btn}>
                      Присоединяйся
                    </button>
                  </Link>
                </div>
                <img className={style.cooperation__image} src="/img/professional_master.png" alt="Профессиональный мастер" />
              </div>
          </div>
        </div>
      </section>
      <FAQ setAlert={setAlert}/>
    </>
  );
}

export default About;