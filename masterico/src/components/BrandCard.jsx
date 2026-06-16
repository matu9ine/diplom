import React from 'react'
import style from '../assets/styles/brandcard.module.css'

const BrandCard = ({image, link, title, description}) => {
  return (
    <div className={style.card}>
      <img src={image} alt='' className={style.image} />
      <div className={style.content}>
        <h1 className={style.title}>
          {title}
        </h1>
        <p className={style.descr}>
          {description}
        </p>
        <a className={style.link} href={link} target='_blank' rel='noopener noreferrer'>
          <button className="primary-button">
            Посмотреть
          </button>
        </a>

      </div>
    </div>
  )
}

export default BrandCard