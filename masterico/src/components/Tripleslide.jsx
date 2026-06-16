import React, { useState, useRef, useEffect } from 'react'
import Slide from './Slide'
import style from '../assets/styles/tripleslide.module.css'

const slideWidth = 390
const slidesPerView = 3

const Tripleslide = ({ slidesData = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef(null)

  const totalSlides = slidesData.length
  const maxIndex = totalSlides - slidesPerView

  const goNext = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0))
  }

  const goPrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex))
  }

  useEffect(() => {
    const offset = -currentIndex * slideWidth
    const track = sliderRef.current
    if (track) {
      track.style.transition = 'transform 0.5s ease-in-out'
      track.style.transform = `translateX(${offset}px)`
    }
  }, [currentIndex])

  return (
    <div className={style.dynamic__slider}>
      <img
        src="/img/arrow-left.svg"
        alt="Стрелка влево"
        className={style.arrow__left}
        onClick={goPrev}
      />

      <div className={style.slider__wrapper}>
        <div ref={sliderRef} className={style.slider__track}>
          {slidesData.map((slide, index) => (
            <div className={style.slide__item} key={index}>
              <Slide 
                {...slide} 
              />
            </div>
          ))}
        </div>
      </div>

      <img
        src="/img/arrow-right.svg"
        alt="Стрелка вправо"
        className={style.arrow__right}
        onClick={goNext}
      />
    </div>
  )
}

export default Tripleslide