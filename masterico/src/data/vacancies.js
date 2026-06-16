import style from '../assets/styles/masters.module.css'
import { Link } from 'react-router-dom';
export const slides = [
    {
      image: "/img/vacancia_1.png",
      extraContent: (
        <div className={style.vacancia__group}>
          <h1 className={style.vacancia__title}>
            Мастер по ремонту холодильников
          </h1>
          <p className={style.vacancia__description}>
            Требуются навыки работы с различными моделями и хорошая техническая грамотность. Предоставляем стабильную зарплату и возможность роста.
          </p>
          <Link className={style.link} to="/masters?vacancies=fridge">
            <button className="primary-button">Выбрать</button>
          </Link>
        </div>
      )
    },
    {
      image: "/img/vacancia_2.png",
      extraContent: (
        <div className={style.vacancia__group}>
          <h1 className={style.vacancia__title}>
            Мастер по ремонту морозильников
          </h1>
          <p className={style.vacancia__description}>
            В команду требуется мастер по ремонту морозильников! Основные обязанности включают диагностику, а также профилактическое обслуживание.          
          </p>
          <Link className={style.link} to="/masters?vacancies=freezer">
            <button className="primary-button">Выбрать</button>
          </Link>
        </div>
      )
    },
    {
      image: "/img/vacancia_3.png",
      extraContent: (
        <div className={style.vacancia__group}>
          <h1 className={style.vacancia__title}>
            Мастер по ремонту стиральных машин
          </h1>
          <p className={style.vacancia__description}>
            Ищем мастера по ремонту стиральных машин, готового решить любые проблемы с бытовой техникой наших клиентов.         
          </p>
          <Link className={style.link} to="/masters?vacancies=machines">
            <button className="primary-button">Выбрать</button>
          </Link>
        </div>
      )
    },
    {
      image: "/img/vacancia_4.jpg",
      extraContent: (
        <div className={style.vacancia__group}>
          <h1 className={style.vacancia__title}>
            Мастер по ремонту ремонту газовых плит
          </h1>
          <p className={style.vacancia__description}>
            Требуется мастер по ремонту газовых плит с технической грамотностью и опытом работы с разными моделями. Гарантируем карьерный рост!         
          </p>
          <Link className={style.link} to="/masters?vacancies=plates">
            <button className="primary-button">Выбрать</button>
          </Link>
        </div>
      )
    },
    {
      image: "/img/vacancia_5.jpg",
      extraContent: (
        <div className={style.vacancia__group}>
          <h1 className={style.vacancia__title}>
            Мастер по ремонту духовых шкафов
          </h1>
          <p className={style.vacancia__description}>
            Требуется мастер по ремонту духовых шкафов с технической грамотностью для диагностики неисправностей различных моделей (газовых и электрических).          
          </p>
          <Link className={style.link} to="/masters?vacancies=oven">
            <button className="primary-button">Выбрать</button>
          </Link>
        </div>
      )
    }
  ];