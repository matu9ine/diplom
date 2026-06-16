import React from 'react'
import { Link } from 'react-router-dom'
import style from '../assets/styles/footer.module.css'

const pageLinks = [
  { to: '/services', label: 'Услуги' },
  { to: '/masters', label: 'Мастерам' },
  { to: '/brands', label: 'Бренды' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' },
];

const serviceLinks = [
  'Ремонт холодильников',
  'Ремонт газовых плит',
  'Ремонт стиральных машин',
  'Ремонт духовок',
];

const infoLinks = [
  { href: 'http://2gis.ru', label: 'Отзывы клиентов' },
  { href: 'http://telegram.com', label: 'Свидетельство регистрации ИП' },
  { href: 'http://telegram.com', label: 'Способы оплаты услуг' },
];

const socialLinks = [
  { href: 'http://vk.com', icon: '/img/vk.svg', label: 'ВКонтакте' },
  { href: 'http://telegram.com', icon: '/img/tg.svg', label: 'Telegram' },
  { href: 'http://rutube.ru', icon: '/img/rutube.svg', label: 'RuTube' },
];

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <div className={style.brand__column}>
          <Link to="/" className={style.logo} aria-label="Masterico, на главную">
            <span className={style.logo__mark}>M</span>
            <span className={style.logo__text}>
              <strong>Master<span>ico</span></strong>
              <small>appliance service</small>
            </span>
          </Link>

          <p className={style.brand__description}>
            Ремонт бытовой техники в Астрахани с понятной диагностикой, аккуратным сервисом и поддержкой после заявки.
          </p>

          <div className={style.contact__list} aria-label="Контакты">
            <a className={style.contact__item} href="tel:+79093720016">
              <span>Телефон</span>
              <strong>8 909 372-00-16</strong>
            </a>
            <a className={style.contact__item} href="mailto:info@cargoasia.info">
              <span>Почта</span>
              <strong>info@cargoasia.info</strong>
            </a>
            <p className={style.contact__item}>
              <span>Адрес</span>
              <strong>Астрахань, ул. Яблочкова, 1В</strong>
            </p>
          </div>

          <div className={style.socials}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className={style.social__link}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                <img src={item.icon} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className={style.navigation__column}>
          <div className={style.footer__headline}>
            <div>
              <span className={style.eyebrow}>Сервис рядом</span>
              <h2>Оставьте заявку, и мастер быстро уточнит детали ремонта</h2>
            </div>
            <Link to="/contacts" className={style.cta__link}>
              Оставить заявку
            </Link>
          </div>

          <div className={style.info__columns}>
            <div className={style.column}>
              <h3 className={style.columnTitle}>Навигация</h3>
              <div className={style.column__links}>
                {pageLinks.map((item) => (
                  <Link key={item.to} to={item.to} className={style.footer__link}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={style.column}>
              <h3 className={style.columnTitle}>Услуги</h3>
              <div className={style.column__links}>
                {serviceLinks.map((item) => (
                  <Link key={item} to="/services" className={style.footer__link}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className={style.column}>
              <h3 className={style.columnTitle}>Информация</h3>
              <div className={style.column__links}>
                {infoLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={style.footer__link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.bottom__bar}>
        <span>© 2026 Masterico. Все права защищены.</span>
        <div className={style.bottom__links}>
          <Link to="/contacts">Контакты</Link>
          <Link to="/about">О сервисе</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
