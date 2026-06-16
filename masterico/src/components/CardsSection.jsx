import React from 'react'
import style from "../assets/styles/cardsection.module.css"
import Card from './Card'

const CardsSection = ({mainTitle, cardsData}) => {
  return (
    <section>
        <div className={style.cards__wrapper}>
            <h2 className={style.mainTitle}>{mainTitle}</h2>
            <div className={style.cardsGrid}>
                {cardsData.map((card, index) => (
                    <Card 
                        key={index} 
                        {...card} 
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default CardsSection