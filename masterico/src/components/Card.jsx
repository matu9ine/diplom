import React from 'react'
import style from '../assets/styles/card.module.css'

const Card = ({image, description}) => {
  return (
    <div className={style.card}>
        <img 
          src={image}
          alt={description}
          className={style.image}
        />
        <p className={style.description}>{description}</p>
    </div>
  )
}

export default Card