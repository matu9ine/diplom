import {React, useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from '../assets/styles/header.module.css'
import Authorization from './Authorization'

const navItems = [
  { to: '/services', label: 'Услуги' },
  { to: '/masters', label: 'Мастерам' },
  { to: '/brands', label: 'Бренды' },
  { to: '/about', label: 'О компании' },
  { to: '/contacts', label: 'Контакты' }
];

const Header = ({setAuthData, authData, setAlert}) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setAuthData(null);
    setAlert('Вы покинули личный кабинет.', 'warning');
    closeMenu();
  };

  return (
    <>
      <Authorization
        active = {openStatus}
        onClose={() => setOpenStatus(false)}
        setAuthData = {setAuthData}
        setAlert = {setAlert}
      />
      <header className={style.header}>
        <div className={style.header__wrapper}>
          <Link to="/" className={style.logo} onClick={closeMenu} aria-label="Masterico, на главную">
            <span className={style.logo__mark}>M</span>
            <span className={style.logo__text}>
              <strong>Master<span>ico</span></strong>
              <small>appliance service</small>
            </span>
          </Link>

          <button
            className={`${style.menu__button} ${menuOpen ? style.menu__button_active : ''}`}
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`${style.header__nav} ${menuOpen ? style.header__nav_open : ''}`} aria-label="Основная навигация">
            <div className={style.header__links}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({isActive}) => `${style.nav__link} ${isActive ? style.nav__link_active : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className={style.header__actions}>
              <a className={style.phone__link} href="tel:+79093720016">
                <span>Связаться</span>
                <strong>8 909 372-00-16</strong>
              </a>
              {authData ? (
                <div className={style.auth__group}>
                  <NavLink to="/profile" className={style.profile__button} onClick={closeMenu}>
                    Профиль
                  </NavLink>
                  <button className={style.logout__button} onClick={() => handleLogout()}>
                    Выйти
                  </button>
                </div>
              ) : (
                <button className={style.auth__button} onClick={() => { setOpenStatus(true); closeMenu(); }}>
                  Войти
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
