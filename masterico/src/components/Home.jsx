import {React, useRef} from 'react'
import style from '../assets/styles/home.module.css'
import Tripleslide from './Tripleslide';
import FAQ from './FAQ';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { slides } from '../data/services';
import { cards_data } from '../data/plus';
import heroImage from '../assets/img/slide_1.png';

const serviceCards = [
  { title: 'Холодильники', time: '1-3 дня', price: 'от 500р', image: '/img/fridge.png', link: '/services?service=fridge' },
  { title: 'Морозильники', time: '1-3 дня', price: 'от 500р', image: '/img/freezer.png', link: '/services?service=freezer' },
  { title: 'Стиральные машины', time: '1-3 дня', price: 'от 500р', image: '/img/wasching.png', link: '/services?service=machines' },
  { title: 'Духовые шкафы', time: '1-3 дня', price: 'от 500р', image: '/img/oven.png', link: '/services?service=oven' },
  { title: 'Газовые плиты', time: '1-3 дня', price: 'от 500р', image: '/img/plate.png', link: '/services?service=plates' }
];

const processSteps = [
  { number: '01', title: 'Заявка', text: 'Опишите технику, поломку и удобное время для звонка.' },
  { number: '02', title: 'Диагностика', text: 'Подбираем мастера под тип техники и согласуем выезд.' },
  { number: '03', title: 'Ремонт', text: 'Мастер приезжает с инструментами и нужными запчастями.' },
  { number: '04', title: 'Гарантия', text: 'Фиксируем результат и оставляем гарантию на выполненные работы.' }
];

const Home = ({setAlert}) => {

    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            client_name: formData.get('name'),
            client_phone: formData.get('phone'),
            client_email: formData.get('email'),
            note: formData.get('note')
        };
        
        try {
            await axios.post('/fastcalls/', userData);
            setAlert('Вы успешно отправили заявку!', 'success');
            formRef.current.reset();
        }
        catch (error) {
            setAlert('Ошибка сервера', 'error');
            formRef.current.reset();
        }
    };

  return (
    <>
      <section className={style.hero} style={{backgroundImage: `linear-gradient(90deg, rgba(12, 17, 15, 0.9) 0%, rgba(12, 17, 15, 0.72) 42%, rgba(12, 17, 15, 0.2) 100%), url(${heroImage})`}}>
        <div className={style.hero__inner}>
          <div className={style.hero__content}>
            <div className={style.hero__eyebrow}>
              <span>Астрахань</span>
              <span>Выездной ремонт</span>
              <span>Гарантия</span>
            </div>
            <h1 className={style.hero__title}>
              Ремонт бытовой техники без лишнего ожидания
            </h1>
            <p className={style.hero__lead}>
              Подберем мастера под вашу поломку, согласуем выезд и поможем вернуть технику в работу с понятной ценой и гарантией.
            </p>
            <div className={style.hero__actions}>
              <a className={style.hero__primary} href="#quick-request">Оставить заявку</a>
              <Link className={style.hero__secondary} to="/services">Смотреть услуги</Link>
            </div>
            <div className={style.hero__stats}>
              <div>
                <strong>20+</strong>
                <span>лет опыта</span>
              </div>
              <div>
                <strong>1-3</strong>
                <span>дня на ремонт</span>
              </div>
              <div>
                <strong>12</strong>
                <span>месяцев гарантии</span>
              </div>
            </div>
          </div>

          <div className={style.request__panel} id="quick-request">
            <div className={style.request__header}>
              <span className={style.request__badge}>Быстрая заявка</span>
              <h2>Мастер свяжется с вами</h2>
              <p>Заполните форму, и мы уточним детали поломки.</p>
            </div>
            <form className={style.form__application} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
              <div className={style.form__field}>
                <p className={style.form__field_title}>Имя</p>
                <input type="text" name='name' required placeholder='Ваше имя *' className={style.form__field_input} />
              </div>
              <div className={style.form__fields_group}>
                <div className={style.form__field}>
                  <p className={style.form__field_title}>Телефон</p>
                  <input type="number" name='phone' required placeholder='+7 (___) ___ - __ - __ *' className={style.form__field_input} />
                </div>
                <div className={style.form__field}>
                  <p className={style.form__field_title}>Email</p>
                  <input type='email' name='email' required placeholder='Введите e-mail *' className={style.form__field_input} />
                </div>
              </div>
              <div className={style.form__field}>
                <p className={style.form__field_title}>Что случилось</p>
                <textarea
                  placeholder='Укажите технику, фирму, адрес и что именно не работает *' 
                  required
                  name='note'
                  className={style.form__field_area} 
                  minLength={50}
                />
              </div>
              <p className={style.warning}>* - обязательные поля</p>
              <button type="submit" className={style.form__button_submit}>
                Отправить заявку
                <img src="/img/arrow-circle-left.svg" alt="Стрелка перехода" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={style.service__showcase}>
        <div className={style.section__heading}>
          <span>Популярные услуги</span>
          <h2>Выберите технику, а мы подберем мастера</h2>
        </div>
        <div className={style.service__grid}>
          {serviceCards.map((service) => (
            <Link to={service.link} className={style.service__card} key={service.title}>
              <img src={service.image} alt={service.title} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.time}</p>
              </div>
              <strong>{service.price}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={style.trust__section}>
        <div className={style.trust__visual}>
          <img src="/img/man.svg" className={style.face__company} alt="Лицо компании" />
          <div className={style.floating__card}>
            <strong>Проверенный мастер</strong>
            <span>Диагностика, ремонт и гарантия в одном выезде</span>
          </div>
        </div>
        <div className={style.trust__content}>
          <div className={style.section__heading_left}>
            <span>Почему Masterico</span>
            <h2>Сервис, который выглядит так же аккуратно, как работает</h2>
          </div>
          <div className={style.trust__grid}>
            {cards_data.map((card) => (
              <div className={style.trust__item} key={card.description}>
                <img src={card.image} alt={card.description} />
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={style.process__section}>
        <div className={style.section__heading}>
          <span>Как это работает</span>
          <h2>Понятный путь от заявки до исправной техники</h2>
        </div>
        <div className={style.process__grid}>
          {processSteps.map((step) => (
            <div className={style.process__card} key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className={style.slider__wrapper}>
          <div className={style.section__heading}>
            <span>Каталог ремонта</span>
            <h2>Виды услуг</h2>
          </div>
          <Tripleslide slidesData={slides}/>
        </div>
      </section>

      <section>
        <div className={style.about__wrapper}>
          <div className={style.about__info}>
            <span className={style.about__eyebrow}>О компании</span>
            <h2 className={style.about__title}>
              Работаем с техникой, людьми и сроками одинаково внимательно
            </h2>
            <p className={style.about__text}>
              Master&Ko - сервисный центр бытовой техники: от стиральных машин и холодильников до духовых шкафов и плит. Мы соединяем клиентов с мастерами, которым можно доверить ремонт без лишней нервозности.
            </p>
            <p className={style.about__text}>
              Наша задача - быстро понять проблему, подобрать специалиста, объяснить стоимость и довести ремонт до результата. Поэтому в дизайне главной теперь тоже больше порядка: заявка, услуги, процесс и гарантия видны сразу.
            </p>
          </div>
          <div className={style.about__media}>
            <img src="/img/confirm.png" alt="Документы" className={style.about__image} />
            <div className={style.about__note}>
              <strong>Гарантия и документы</strong>
              <span>Фиксируем обращение и условия работы</span>
            </div>
          </div>
        </div>
      </section>

      <FAQ setAlert={setAlert}/>

      <section>
        <div className={style.cooperation__wrapper}>
          <div className={style.cooperation__title}>
            <span>Для мастеров</span>
            <h2 className={style.mainCoopTitle}>
              Хотите брать заявки через Masterico?
            </h2>
            <p className={style.secCoopTitle}>
              Зарегистрируйтесь, расскажите о специализации и получайте обращения в личном кабинете.
            </p>
          </div>
          <div className={style.coopertation__grid}>
            <div className={`${style.cooperation__info_box}`}>
              <img className={style.cooperation__image} src="/img/master_1.png" alt="Фото работы" />
              <div className={style.cooperation__info_textbox}>
                <h3>Понятный старт</h3>
                <p className={style.cooperation__info}>
                  Перейдите на страницу “Мастера”, укажите информацию о себе и прикрепите данные для идентификации.
                </p>
                <p className={style.cooperation__info}>
                  Условия работы и дополнительные пожелания можно описать в примечании к анкете.
                </p>
              </div>
            </div>
            <div className={`${style.cooperation__info_box} ${style.reverse}`}>
              <img className={style.cooperation__image} src="/img/master_2.png" alt="Фото работы" />
              <div className={style.cooperation__info_textbox}>
                <h3>Заявки в личном кабинете</h3>
                <p className={style.cooperation__info}>
                  После подтверждения вы сможете отслеживать заявки, видеть контакты клиентов и работать по выбранной специализации.
                </p>
                <Link className={style.cooperation__link} to='/masters'>
                  <button className={style.cooperation__btn}>
                    Стать мастером
                    <img src="/img/arrow-circle-left.svg" alt="Стрелка перехода" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
