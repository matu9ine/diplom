import React from 'react'
import style from '../assets/styles/slide.module.css'

const Slide = ({image, extraContent}) => {
  return (
    <div className={style.slide}>
        <img src={image} alt='' className={style.slide__image} />
        <div className={style.slide__content}>
            {extraContent}
        </div>
    </div>
  )
}

export default Slide