import React from 'react'
import style from '../assets/styles/title.module.css'

const Title = ({title, description}) => {
  return (
    <section>
        <div className={style.wrapper}>
            <h1 className={style.title}>
                {title}
            </h1>
            <p className={style.description}>
                {description}
            </p>
        </div>
    </section>
  )
}

export default Title