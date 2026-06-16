import React from 'react'
import style from '../assets/styles/brands.module.css'
import BrandCard from '../components/BrandCard'
import { cards_data } from '../data/brand_info'
import Title from './Title'

const Brands = () => {
  return (
    <>
        <Title
            title="УГОЛОК БРЕНДОВ НАМ ДОВЕРЯЮТ ПРОФЕССИОНАЛЫ"
            description={`Master&Ko – агрегатор проверенных сервисов по ремонту бытовой техники. В нашем "Уголке брендов" только качественные бренды техники с оригинальными запчастями от производителя и гарантией качества. Быстро, надежно, с выездом на дом.`}
        />
        <section>
            <div className={style.wrapper}>
                <h1 className={style.mainTitle}>
                    Бренды
                </h1>
                <div className={style.brand__box}>
                    {cards_data.map((card, index) => (
                        <BrandCard key={index}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </section>
    </>

  )
}

export default Brands