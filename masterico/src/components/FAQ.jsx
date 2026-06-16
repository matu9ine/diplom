import {React, useState, useRef} from 'react'
import style from '../assets/styles/faq.module.css'
import { questions } from '../data/questions.js'
import axios from 'axios'

const FAQ = ({setAlert}) => {

  const [openId, setOpenId] = useState(null);

  const consultRef = useRef(null);

  const toggleAnswer = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      question: formData.get('question')
    }

    try {
      const response = await axios.post('/consults/', userData);
      setAlert('Спасибо за ваш вопрос!', 'success');
      consultRef.current.reset()
    }
    catch (error) {
      setAlert('Ошибка сервера', 'error');
      consultRef.current.reset()
    }
  }

  return (
    <section>
      <div className={style.wrapper}>
        <h1 className={style.mainTitle}>
          Часто задаваемые вопросы
        </h1>
        <div className={style.mainContent}>
          <div className={style.questions}>
            {questions.map(({ id, question, answer }) => (
              <div key={id} className={`${style.question} ${openId === id ? style['question--active'] : ''}`} onClick={() => toggleAnswer(id)}>
                <div className={style.question__title}>
                  <p className={style.mainQuestTitle}>{question}</p>
                  <svg className={style.question__icon} width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="https://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_5858_63)">
                        <path d="M0.865934 13.5C0.865934 6.27539 6.71623 0.421875 13.9369 0.421875C21.1575 0.421875 27.0078 6.27539 27.0078 13.5C27.0078 20.7246 21.1575 26.5781 13.9369 26.5781C6.71623 26.5781 0.865934 20.7246 0.865934 13.5ZM13.9369 24.8906C20.193 24.8906 25.3212 19.8229 25.3212 13.5C25.3212 7.24043 20.2563 2.10938 13.9369 2.10938C7.68074 2.10938 2.55251 7.17715 2.55251 13.5C2.55251 19.7596 7.6175 24.8906 13.9369 24.8906ZM14.5957 20.0127L20.6621 13.9482C20.9098 13.7004 20.9098 13.2996 20.6621 13.0518L14.5957 6.9873C14.348 6.73945 13.9474 6.73945 13.6997 6.9873L13.336 7.35117C13.0883 7.59902 13.0883 8.01035 13.3466 8.25293L17.8529 12.6035H7.82305C7.47519 12.6035 7.19058 12.8883 7.19058 13.2363V13.7637C7.19058 14.1117 7.47519 14.3965 7.82305 14.3965H17.8529L13.3413 18.7471C13.0883 18.9949 13.083 19.401 13.3308 19.6488L13.6944 20.0127C13.9474 20.2605 14.348 20.2605 14.5957 20.0127Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5858_63">
                          <rect width="26.9852" height="27" fill="white" transform="matrix(-1 0 0 1 27.4297 0)"/>
                        </clipPath>
                      </defs>
                  </svg>
                </div>
                <div className={`${style.question__answer} ${openId === id ? style['question__answer--active'] : ''}`}>
                  {answer}
                </div>
              </div>
            ))}
          </div>
          <div className={style.consult}>
            <form className={style.consult__form} ref={consultRef} onSubmit={handleSubmit}>
              <div className={style.consult__form_title}>
                <h2 className={style.consult__title}>
                  Остались вопросы?
                </h2>
                <p className={style.consult__manage}>
                  Оставьте заявку и наш менеджер ответит вам в ближайшее время
                </p>
              </div>
              <div className={style.consult__form_fields}>
                <input type="text" placeholder="Имя *" name="name" required className={style.consult__form_field} />
                <input type="number" placeholder="Телефон *" name="phone" required className={style.consult__form_field} />
                <input type="email" placeholder="Email" name="email" required className={style.consult__form_field} />
                <input type="text" placeholder="Ваш вопрос" name="question" required className={style.consult__form_field} />
              </div>
              <button type="submit" className={style.consult__submit_btn}>
                Отправить запрос
                <img src="/img/arrow-circle-left.svg" alt="Стрелка перехода" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ