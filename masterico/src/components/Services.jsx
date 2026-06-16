import {React, useRef, useState, useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios'
import style from '../assets/styles/services.module.css'

const serviceOptions = [
    {
        id: 'fridge',
        title: 'Ремонт холодильников',
        text: 'Диагностика охлаждения, компрессора, утечек и электроники.',
        image: '/img/fridge.png',
        time: '1-3 дня',
        price: 'от 500р'
    },
    {
        id: 'freezer',
        title: 'Ремонт морозильников',
        text: 'Восстановим стабильную заморозку и проверим контур охлаждения.',
        image: '/img/freezer.png',
        time: '1-3 дня',
        price: 'от 500р'
    },
    {
        id: 'machines',
        title: 'Ремонт стиральных машин',
        text: 'Поможем с протечками, сливом, барабаном, нагревом и ошибками.',
        image: '/img/wasching.png',
        time: '1-3 дня',
        price: 'от 500р'
    },
    {
        id: 'oven',
        title: 'Ремонт духовок',
        text: 'Настроим нагрев, датчики, дверцу, питание и режимы работы.',
        image: '/img/oven.png',
        time: '1-3 дня',
        price: 'от 500р'
    },
    {
        id: 'plates',
        title: 'Ремонт газовых плит',
        text: 'Проверим конфорки, розжиг, подачу газа и безопасность узлов.',
        image: '/img/plate.png',
        time: '1-3 дня',
        price: 'от 500р'
    }
];

const benefits = [
    'Проверенные мастера с понятной специализацией',
    'Заявка сразу попадает в нужный тип услуги',
    'История обращений остается в личном кабинете'
];

const steps = [
    'Выберите услугу',
    'Опишите проблему',
    'Дождитесь звонка мастера'
];

const Services = ({authData, setAlert}) => {

    const formRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedService, setSelectedService] = useState('fridge');

    const scrollToForm = () => {
        setTimeout(() => {
            document.getElementById('application-form')?.scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedService(serviceId);
        setSearchParams({ service: serviceId });
        scrollToForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            client_id: authData.user.id,
            client_name: authData.user.name,
            client_email: authData.user.username,
            client_phone: authData.user.phone,
            type: selectedService,
            note: formData.get('note')
        };
        
        try {
            await axios.post('/calls/', userData, {
                headers: {
                    Authorization: `Bearer ${authData.token}`
                }
            });
            setAlert('Вы успешно оставили заявку!', 'success');
            setSearchParams({});
            setSelectedService('');
            formRef.current.reset();
        }
        catch (error) {
            setAlert('Ошибка сервера.', 'error');
            setSearchParams({});
            setSelectedService('');
            formRef.current.reset();
        }
    };

    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            setSelectedService(serviceParam);
            scrollToForm();
        }
    }, [searchParams]);

  return (
    <>
        <section className={style.hero}>
            <div className={style.hero__content}>
                <span className={style.eyebrow}>Услуги Masterico</span>
                <h1 className={style.hero__title}>
                    Быстро подберем мастера под вашу поломку
                </h1>
                <p className={style.hero__description}>
                    Выберите тип техники, опишите проблему и получите понятный следующий шаг без долгих звонков и поиска специалиста вручную.
                </p>
                <div className={style.hero__actions}>
                    <a href="#application-form" className={style.primary__link}>
                        Оставить заявку
                    </a>
                    <Link to="/contacts" className={style.secondary__link}>
                        Контакты сервиса
                    </Link>
                </div>
                <div className={style.hero__stats} aria-label="Преимущества сервиса">
                    <div>
                        <strong>5</strong>
                        <span>типов техники</span>
                    </div>
                    <div>
                        <strong>1-3</strong>
                        <span>дня на ремонт</span>
                    </div>
                    <div>
                        <strong>24/7</strong>
                        <span>заявки онлайн</span>
                    </div>
                </div>
            </div>

            <div className={style.hero__visual} aria-hidden="true">
                <div className={style.hero__image_main}>
                    <img src="/img/brief_information.png" alt="" />
                </div>
                <div className={style.hero__device_card}>
                    <img src="/img/fridge.png" alt="" />
                    <span>Холодильники</span>
                </div>
                <div className={style.hero__device_card}>
                    <img src="/img/wasching.png" alt="" />
                    <span>Стиральные машины</span>
                </div>
            </div>
        </section>

        <section className={style.services__section}>
            <div className={style.section__header}>
                <span className={style.eyebrow}>Каталог работ</span>
                <h2>Выберите услугу</h2>
                <p>
                    Карточки сразу подставляют нужный тип ремонта в форму ниже, чтобы заявка ушла мастеру с правильной специализацией.
                </p>
            </div>

            <div className={style.services__grid}>
                {serviceOptions.map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        className={`${style.service__card} ${selectedService === service.id ? style.service__card_active : ''}`}
                        onClick={() => handleServiceSelect(service.id)}
                    >
                        <span className={style.service__time}>{service.time}</span>
                        <img src={service.image} alt={service.title} className={style.service__image} />
                        <span className={style.service__price}>{service.price}</span>
                        <h3>{service.title}</h3>
                        <p>{service.text}</p>
                        <span className={style.service__cta}>Выбрать услугу</span>
                    </button>
                ))}
            </div>
        </section>

        <section>
            <div className={style.wrapper}>
                <div className={style.info}>
                    <span className={style.eyebrow}>Как это работает</span>
                    <h2 className={style.title}>
                        Краткая справка
                    </h2>
                    <p className={style.text}>
                        Masterico — это удобный агрегатор услуг по ремонту бытовой техники, который соединяет вас с проверенными мастерами в вашем городе. Мы сотрудничаем только с квалифицированными специалистами, чтобы гарантировать качественный ремонт по справедливой цене.
                    </p>
                    <p className={style.text}>
                        Для оформления заявки необходимо авторизоваться на сайте — это обеспечивает безопасность ваших данных и упрощает дальнейшее взаимодействие с мастером. После регистрации вы сможете оставить запрос, отслеживать статус ремонта и сохранять историю обращений.
                    </p>
                    <div className={style.benefits}>
                        {benefits.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
                <div className={style.image__panel}>
                    <img src="/img/brief_information.png" alt="Краткая справка" className={style.image} />
                    <div className={style.image__note}>
                        <strong>После заявки</strong>
                        <span>мастер уточнит детали и согласует удобное время</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="application-form">
            <div className={style.work__wrapper}>
                <div className={style.application__info}>
                    <span className={style.eyebrow}>Онлайн-заявка</span>
                    <h2 className={style.work__title}>
                        Отправьте заявку прямо сейчас
                    </h2>
                    <p className={style.work__description}>
                        Сэкономьте время: выберите тип ремонта, опишите симптомы поломки и удобное время звонка. Заявка попадет в систему, а мастер свяжется с вами для согласования деталей.
                    </p>
                    <div className={style.steps}>
                        {steps.map((item, index) => (
                            <div className={style.step} key={item}>
                                <span>{index + 1}</span>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={style.work__form_wrapper}>
                    <form className={style.work__form} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                        <div className={style.work__form_field_select}>
                            <p className={style.work__form_field_title}>
                                Выбранная услуга
                            </p>
                            {authData ?
                                <select
                                    name="specialization"
                                    className={style.specialization_select}
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Выберите услугу</option>
                                    {serviceOptions.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.title}
                                        </option>
                                    ))}
                                </select> : <>
                                    <input
                                    type="text"
                                    required
                                    placeholder="Авторизуйтесь, чтобы выбрать услугу *"
                                    className={style.work__form_field_input}
                                    disabled />
                                </> 
                            }
                        </div>
                        <div className={style.work__form_field}>
                            <p className={style.work__form_field_title}>
                                Примечание
                            </p>
                            <textarea
                                placeholder="Опишите проблему, модель техники и удобное время звонка. Чем подробнее описание, тем быстрее мастер подготовится к ремонту *" 
                                required
                                name="note"
                                className={style.work__form_field_area} 
                                disabled={!authData}
                                minLength={50}
                            />
                        </div>
                        <p className={style.warning}>
                            {authData ? '* - обязательные поля' : 'Для отправки заявки нужно войти в личный кабинет'}
                        </p>
                        <button type="submit" className={style.form__button_submit} disabled={!authData}>
                            {authData ? 'Отправить заявку' : 'Авторизуйтесь'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default Services
