import {React, useRef, useState, useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import style from '../assets/styles/masters.module.css'
import { cards_data } from '../data/brands'
import axios from 'axios';

const vacancyOptions = [
    {
        id: 'fridge',
        title: 'Мастер по ремонту холодильников',
        text: 'Диагностика, ремонт систем охлаждения, компрессоров и электронных модулей.',
        image: '/img/vacancia_1.png',
        tag: 'Холодильники'
    },
    {
        id: 'freezer',
        title: 'Мастер по ремонту морозильных камер',
        text: 'Работа с морозильными камерами, утечками, датчиками и профилактикой.',
        image: '/img/vacancia_2.png',
        tag: 'Морозильники'
    },
    {
        id: 'machines',
        title: 'Мастер по ремонту стиральных машин',
        text: 'Слив, протечки, барабан, нагрев, ошибки электроники и выездные ремонты.',
        image: '/img/vacancia_3.png',
        tag: 'Стиральные машины'
    },
    {
        id: 'plates',
        title: 'Мастер по ремонту газовых плит',
        text: 'Проверка конфорок, розжига, подачи газа и безопасная настройка узлов.',
        image: '/img/vacancia_4.jpg',
        tag: 'Газовые плиты'
    },
    {
        id: 'oven',
        title: 'Мастер по ремонту духовых шкафов',
        text: 'Электрические и газовые духовки, нагрев, датчики, дверцы и режимы.',
        image: '/img/vacancia_5.jpg',
        tag: 'Духовые шкафы'
    }
];

const advantages = [
    {
        value: 'Гибкий график',
        text: 'Можно выстраивать загрузку под свой темп и специализацию.'
    },
    {
        value: 'Поток заявок',
        text: 'Заявки приходят из сервиса, без самостоятельного поиска клиентов.'
    },
    {
        value: 'Рост навыков',
        text: 'Работа с разными брендами и типами бытовой техники.'
    }
];

const steps = [
    'Выберите вакансию',
    'Расскажите про опыт',
    'Дождитесь звонка менеджера'
];

const Masters = ({authData, setAlert}) => {

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

    const handleVacancySelect = (vacancyId) => {
        setSelectedService(vacancyId);
        setSearchParams({ vacancies: vacancyId });
        scrollToForm();
    };

    useEffect(() => {
        const serviceParam = searchParams.get('vacancies');
        if (serviceParam) {
            setSelectedService(serviceParam);
            
            const timeoutId = setTimeout(() => {
                document.getElementById('application-form')?.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            client_id: authData.user.id,
            name: authData.user.name,
            phone: authData.user.phone,
            type: selectedService,
            note: formData.get('note')
        };
        
        try {
            await axios.post('/questionnaire/', userData, {
                headers: {
                    Authorization: `Bearer ${authData.token}`
                }
            });
            setAlert('Вы успешно оставили анкету на рассмотрение!', 'success');
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

  return (
    <>
        <section className={style.hero}>
            <div className={style.hero__content}>
                <span className={style.eyebrow}>Карьера в Masterico</span>
                <h1 className={style.hero__title}>
                    Присоединяйтесь к команде мастеров бытового сервиса
                </h1>
                <p className={style.hero__description}>
                    Мы соединяем специалистов с клиентами, помогаем держать стабильный поток заявок и создаем понятные условия для работы в своем направлении ремонта.
                </p>
                <div className={style.hero__actions}>
                    <a href="#application-form" className={style.primary__link}>
                        Заполнить анкету
                    </a>
                    <Link to="/services" className={style.secondary__link}>
                        Посмотреть услуги
                    </Link>
                </div>
            </div>

            <div className={style.hero__visual} aria-hidden="true">
                <img src="/img/professional_master.png" alt="" className={style.hero__image} />
                <div className={style.hero__badge}>
                    <strong>5</strong>
                    <span>направлений ремонта</span>
                </div>
                <div className={style.hero__card}>
                    <img src="/img/master_1.png" alt="" />
                    <span>Выездные заявки</span>
                </div>
            </div>
        </section>

        <section className={style.advantages}>
            {advantages.map((item) => (
                <div className={style.advantage__card} key={item.value}>
                    <strong>{item.value}</strong>
                    <p>{item.text}</p>
                </div>
            ))}
        </section>

        <section className={style.vacancies__section}>
            <div className={style.section__header}>
                <span className={style.eyebrow}>Открытые направления</span>
                <h2>Выберите вакансию</h2>
                <p>
                    Нажмите на подходящее направление, и оно сразу подставится в анкету ниже.
                </p>
            </div>

            <div className={style.vacancies__grid}>
                {vacancyOptions.map((vacancy) => (
                    <button
                        key={vacancy.id}
                        type="button"
                        className={`${style.vacancy__card} ${selectedService === vacancy.id ? style.vacancy__card_active : ''}`}
                        onClick={() => handleVacancySelect(vacancy.id)}
                    >
                        <img src={vacancy.image} alt={vacancy.title} />
                        <span className={style.vacancy__tag}>{vacancy.tag}</span>
                        <h3>{vacancy.title}</h3>
                        <p>{vacancy.text}</p>
                        <span className={style.vacancy__cta}>Выбрать</span>
                    </button>
                ))}
            </div>
        </section>

        <section className={style.brands__section}>
            <div className={style.brands__content}>
                <span className={style.eyebrow}>Опыт с техникой</span>
                <h2>Работа с известными брендами</h2>
                <p>
                    В сервисе встречаются разные производители, поэтому мастер быстрее прокачивает диагностику, аккуратность и техническую насмотренность.
                </p>
            </div>
            <div className={style.brands__grid}>
                {cards_data.map((card) => (
                    <div className={style.brand__card} key={card.description}>
                        <img src={card.image} alt={card.description} />
                        <span>{card.description}</span>
                    </div>
                ))}
            </div>
        </section>

        <section id="application-form">
            <div className={style.work__wrapper}>
                <div className={style.work__info}>
                    <span className={style.eyebrow}>Анкета кандидата</span>
                    <h2 className={style.work__title}>
                        Готовы устроиться?
                    </h2>
                    <p className={style.work__description}>
                        Заполните короткую анкету: укажите направление, опыт, желаемый график и ожидания по доходу. После отправки менеджер свяжется с вами и согласует дальнейший шаг.
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
                                Выбранная вакансия
                            </p>
                            {authData ?
                                <select
                                    name="specialization"
                                    className={style.specialization_select}
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Выберите вакансию</option>
                                    {vacancyOptions.map((vacancy) => (
                                        <option key={vacancy.id} value={vacancy.id}>
                                            {vacancy.title}
                                        </option>
                                    ))}
                                </select> : <>
                                    <input
                                    type="text"
                                    required
                                    placeholder="Авторизуйтесь, чтобы выбрать вакансию *"
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
                                placeholder="Укажите навыки, опыт, желаемый доход, удобный график и район работы. После этого менеджер свяжется с вами для собеседования *" 
                                required
                                name="note"
                                className={style.work__form_field_area} 
                                disabled={!authData}
                                minLength={50}
                            />
                        </div>
                        <p className={style.warning}>
                            {authData ? '* - обязательные поля' : 'Для отправки анкеты нужно войти в личный кабинет'}
                        </p>
                        <button type="submit" className={style.form__button_submit} disabled={!authData}>
                            {authData ? 'Отправить анкету' : 'Авторизируйтесь'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>

    
  )
}

export default Masters
