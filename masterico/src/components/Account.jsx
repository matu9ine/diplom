import React from 'react'
import Title from '../components/Title';
import style from '../assets/styles/account.module.css'
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';
import MasterPanel from './MasterPanel';

const Account = ({authData, setAlert}) => {

  const getUserRoleDescription = (user) => {
    if (user.role === 'admin') return 'Администратор';
    if (user.role === 'manager') return 'Менеджер';
    if (user.role === 'master') {
      switch (user.master_type) {
        case 'fridge':
          return 'Мастер по холодильникам';
        case 'freezer':
          return 'Мастер по морозилкам';
        case 'machines':
          return 'Мастер по стиральным машинам';
        case 'plates':
          return 'Мастер по ремонту плит';
        default:
          return 'Мастер по ремонту духовок';
      }
    }
    return 'Пользователь';
  }

  return (
    <>
      {authData ? (
        <>
          <Title
            title="ПРОФИЛЬ. НЕМНОГО О ТЕБЕ."
            description={`Личный кабинет Master&Ko – ваш удобный инструмент для управления заказами на ремонт бытовой техники! Отслеживайте статус заявки в реальном времени. Записывайтесь на ремонт онлайн – быстро и без звонков. Храните историю заказов и повторяйте их в один клик.`}
          />
          <section>
            <div className={style.info__wrapper}>
              <div className={style.main__info_block}>
                <h1 className={style.info__title}>
                  ИНФОРМАЦИЯ
                </h1>
                <div className={style.info__block}>
                  <div className={style.info__line}>
                    <h2 className={style.info__line_title}>Почта</h2>
                    <p className={style.info__line_info}>{authData.user.username}</p>
                  </div>
                  <div className={style.info__line}>
                    <h2 className={style.info__line_title}>Имя</h2>
                    <p className={style.info__line_info}>{authData.user.name}</p>
                  </div>
                  <div className={style.info__line}>
                    <h2 className={style.info__line_title}>Телефон</h2>
                    <p className={style.info__line_info}>{authData.user.phone}</p>
                  </div>
                  <div className={style.info__line}>
                    <h2 className={style.info__line_title}>Роль</h2>
                    <p className={style.info__line_info}>
                      {getUserRoleDescription(authData.user)}
                    </p>
                  </div>
                </div>
              </div>
              <div className={style.secondary__info}>
                <h1 className={style.info__title}>
                  Дополнительно
                </h1>
                <div className={style.secondary__info_blocks}>
                  {(authData.user.role === 'admin' || authData.user.role === 'manager') 
                    ? <AdminPanel token={authData.token} role={authData.user.role} setAlert={setAlert} /> 
                    : authData.user.role === 'master' ? <MasterPanel token={authData.token} user={authData.user} setAlert={setAlert} /> : <UserPanel token={authData.token} setAlert={setAlert} />
                  }
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Title
          title="ПРОФИЛЬ. АВТОРИЗИРУЙТЕСЬ."
          description={`Личный кабинет Master&Ko – ваш удобный инструмент для управления заказами на ремонт бытовой техники! Отслеживайте статус заявки в реальном времени. Записывайтесь на ремонт онлайн – быстро и без звонков. Храните историю заказов и повторяйте их в один клик.`}
        />
      )}
    </>
  )
}

export default Account