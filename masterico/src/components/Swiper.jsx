import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import style from '../assets/styles/swiper.module.css'
import { slides } from '../data/slider';

const Swiper = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <section>
        <div className={style.swiper__wrapper} style={{backgroundImage: `url(${slides[activeIndex].image})`}}>
            <div className={style.swiper__wrapper__group}>
                <img className={style.swiper__arrow} src="/img/arrow-left.svg" alt="Стрелка влево"  onClick={prevSlide}/>
                <div className={style.swiper__wrapper__content}>
                    <div className={style.swiper__wrapper__content_title}>
                        <h1 className={style.swiper__title}>
                            {slides[activeIndex].title}
                        </h1>
                        <p className={style.swiper__description}>
                            {slides[activeIndex].description}
                        </p>
                    </div>
                    <Link className={style.swiper__link} to="/services">
                        <button className={style.swiper__button}>
                            Оставить заявку
                            <img src="/img/arrow-circle-left.svg" alt="Стрелка перехода" className={style.arrow__swiper__button} />
                        </button>
                    </Link>
                </div>
                <img className={style.swiper__arrow} src="/img/arrow-right.svg" alt="Стрелка вправо" onClick={nextSlide} />
            </div>
            <div className={style.swiper__progress__bar}>
                {slides.map((p, index) => (
                    <div key={index} className={`${style.swiper__progress__point} ${index === activeIndex ? style.active : ''}`} 
                    onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default Swiper