import style from '../assets/styles/home.module.css'
import { Link } from 'react-router-dom';
export const slides = [
    {
      image: "/img/fridge.png",
      extraContent: (
        <div className={style.service__group}>
          <h1 className={style.service__title}>
            Ремонт холодильников
          </h1>
          <div className={style.info__group}>
            <img src="/img/calendar.svg" alt="Календарь"/>
            1-3 дня
          </div>
          <span className={style.price}>от<h2>500р</h2></span>
          <div className={style.service__buttons}>
            <Link className={style.link} to="/services?service=fridge">
              <button className="primary-button">Оставить заявку</button>
            </Link>
            <button className="secondary-button">Подробнее</button>
          </div>
        </div>
      )
    },
    {
      image: "/img/freezer.png",
      extraContent: (
        <div className={style.service__group}>
          <h1 className={style.service__title}>
          Ремонт морозильников
          </h1>
          <div className={style.info__group}>
            <img src="/img/calendar.svg" alt="Календарь"/>
            1-3 дня
          </div>
          <span className={style.price}>от <h2>500р</h2></span>
          <div className={style.service__buttons}>
            <Link className={style.link} to="/services?service=freezer">
              <button className="primary-button">Оставить заявку</button>
            </Link>
            <button className="secondary-button">Подробнее</button>
          </div>
        </div>
      )
    },
    {
      image: "/img/wasching.png",
      extraContent: (
        <div className={style.service__group}>
          <h1 className={style.service__title}>
          Ремонт стиральных машин
          </h1>
          <div className={style.info__group}>
            <img src="/img/calendar.svg" alt="Календарь"/>
            1-3 дня
          </div>
          <span className={style.price}>от <h2>500р</h2></span>
          <div className={style.service__buttons}>
            <Link className={style.link} to="/services?service=machines">
              <button className="primary-button">Оставить заявку</button>
            </Link>
            <button className="secondary-button">Подробнее</button>
          </div>
        </div>
      )
    },
    {
      image: "/img/oven.png",
      extraContent: (
        <div className={style.service__group}>
          <h1 className={style.service__title}>
            Ремонт духовок
          </h1>
          <div className={style.info__group}>
            <img src="/img/calendar.svg" alt="Календарь"/>
            1-3 дня
          </div>
          <span className={style.price}>от <h2>500р</h2></span>
          <div className={style.service__buttons}>
            <Link className={style.link} to="/services?service=oven">
              <button className="primary-button">Оставить заявку</button>
            </Link>
            <button className="secondary-button">Подробнее</button>
          </div>
        </div>
      )
    },
    {
      image: "/img/plate.png",
      extraContent: (
        <div className={style.service__group}>
          <h1 className={style.service__title}>
            Ремонт газовых плит
          </h1>
          <div className={style.info__group}>
            <img src="/img/calendar.svg" alt="Календарь"/>
            1-3 дня
          </div>
          <span className={style.price}>от <h2>500р</h2></span>
          <div className={style.service__buttons}>
            <Link className={style.link} to="/services?service=plates">
              <button className="primary-button">Оставить заявку</button>
            </Link>
            <button className="secondary-button">Подробнее</button>
          </div>
        </div>
      )
    }
  ];