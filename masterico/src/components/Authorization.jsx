import {React, useState, useRef, useEffect} from 'react'
import axios from 'axios'
import style from '../assets/styles/auth.module.css'

const Authorization = ({active, onClose, setAuthData, setAlert}) => {

  const [activeForm, setActiveForm] = useState('login');
  const formGroupsRef = useRef(null);
  const authFormRef = useRef(null);
  const regFormRef = useRef(null);
  const prevHeightRef = useRef(0);

  useEffect(() => {
    if (!formGroupsRef.current) return;
    const activeFormRef = activeForm === 'login' ? authFormRef : regFormRef;
    if (activeFormRef.current) {
        const newHeight = activeFormRef.current.scrollHeight;
        const prevHeight = prevHeightRef.current;
        if (activeForm === 'login' && prevHeight > 0) {
            formGroupsRef.current.style.maxHeight = `${prevHeight}px`;
        }
        else {
            prevHeightRef.current = authFormRef.current.scrollHeight;
            formGroupsRef.current.style.maxHeight = `${newHeight}px`;
        }
    }
}, [activeForm]);

    const handleAuth = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            username: formData.get('email'),
            password: formData.get('password'),
        };
        
        try {
            const response = await axios.post('/token/', userData);
            const { access, refresh } = response.data;
            const userResponse = await axios.get('/auth/users/me/', {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });
            setAuthData({
            token: access,
            refreshToken: refresh,
            user: userResponse.data.role === 'master'
                ? userResponse.data
                : {
                    id: userResponse.data.id,
                    role: userResponse.data.role,
                    username: userResponse.data.username,
                    name: userResponse.data.name,
                    phone: userResponse.data.phone
                }
            });
            setAlert('Вы успешно авторизованы!', 'success');
            authFormRef.current.reset();
            onClose();
        }
        catch (error) {
            setAlert('Неверный логин или пароль', 'error');
            authFormRef.current.reset();
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const password = formData.get('password');
        const passwordConfirm = formData.get('confirm_password');

        if (password !== passwordConfirm) {
            setAlert('Пароли не совпадают!', 'error');
            return;
        }

        const userData = {
            name: formData.get('name'),
            username: formData.get('email'),
            phone: formData.get('phone'),
            password: password,
        };
        
        try {
            const response = await axios.post('/auth/users/', userData);
            setAlert('Вы успешно зарегистрированы!', 'success');
            regFormRef.current.reset();
            setActiveForm('login');
        }
        catch (error) {
            setAlert('Такой аккаунт уже существует!', 'error');
            regFormRef.current.reset();
        }
    };

  return (
    <>
        <section className={`${style.auth} ${active ? style.show : ''}`}>
            <div className={style.wrapper}>
                <div className={style.choose}>
                    <div className={style.switch__buttons}>
                        <h1 className={`${style.switch__title} ${activeForm === 'login' ? style.active : ''}`} onClick={() => setActiveForm('login')}>
                            Вход
                        </h1>
                        <h1 className={`${style.switch__title} ${activeForm === 'register' ? style.active : ''}`} onClick={() => setActiveForm('register')} >
                            Регистрация
                        </h1>
                    </div>
                    <img src="/img/arrow-circle-white-right.svg" className={style.exit__button} onClick={onClose} alt="Выход" />
                </div>
                <div className={`${style.form__groups} ${activeForm === 'register' ? style.active : ''}`} ref={formGroupsRef}>
                    <form className={`${style.form__auth} ${activeForm === 'login' ? style.active : ''}`} ref={authFormRef} onSubmit={handleAuth}>
                        <div className={style.field__group}>
                            Email
                            <input type="text" name='email' placeholder='Введите почту *' className={style.field} required />
                        </div>
                        <div className={style.field__group}>
                            Пароль
                            <input type="password" name='password' placeholder='Введите пароль *' className={style.field} required />
                        </div>
                        <button type="submit" className={style.submit}>
                            Войти
                        </button>
                    </form>
                    <form className={`${style.form__reg} ${activeForm === 'register' ? style.active : ''}`} ref={regFormRef} onSubmit={handleRegister}>
                        <div className={style.field__group}>
                            Имя
                            <input type="text" name='name' placeholder='Введите имя *' className={style.field} required />
                        </div>
                        <div className={style.field__group}>
                            Email
                            <input type="email" name='email' placeholder='Введите почту *' className={style.field} required />
                        </div>
                        <div className={style.field__group}>
                            Номер телефона
                            <input type="number" name='phone' placeholder='Введите телефон *' className={style.field} required />
                        </div>
                        <div className={style.field__group}>
                            Пароль
                            <input type="password" name='password' placeholder='Введите пароль *' className={style.field} required />
                        </div>
                        <div className={style.field__group}>
                            Повторите пароль
                            <input type="password" name='confirm_password' placeholder='Повторите пароль *' className={style.field} required />
                        </div>
                        <button type="submit" className={style.submit}>
                            Зарегистрироваться
                        </button>
                    </form>
                </div>
            </div>
        </section>
    </>
  )
}

export default Authorization