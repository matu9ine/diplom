import {React, useEffect, useState} from 'react'
import style from '../assets/styles/admin.module.css'
import axios from 'axios'

const AdminPanel = ({token, role, setAlert}) => {

  const handleDeleteUser = async (e, id) => {

    e?.preventDefault();

    try {
      const response = await axios.delete(`/user/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert('Пользователь успешно удалён!', 'success');
      fetchData();
    }
    catch (error) {
      setAlert('Ошибка сервера.', 'error');
    }
  }

  const handleDeleteConsult = async (e, id) => {

    e?.preventDefault();

    try {
      const response = await axios.delete(`/consult/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert('Вопрос успешно был удалён!', 'success');
      fetchData();
    }
    catch (error) {
      setAlert('Ошибка сервера.', 'error');
    }
  }

  const handleAnswerConsult = async (e, currentConsultData) => {
    e?.preventDefault();
    
    try {
      const response = await axios.put(
        `/consult/${currentConsultData.id}/`,
        {
          email: currentConsultData.email,
          name: currentConsultData.name,
          phone: currentConsultData.phone,
          question: currentConsultData.question,
          status: !currentConsultData.status
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setAlert('Вы успешно закрыли вопрос!', 'success');
      fetchData();
      
    } catch (error) {
      console.error('Ошибка:', {
        status: error.response?.status,
        data: error.response?.data
      });
    }
  };

  const handlePromoteDemote = async (e, currentUserData, targetRole, specialization = null) => {
    e?.preventDefault();

    try {
      
      const requestData = {
        role: targetRole,
        name: currentUserData.name,
        phone: currentUserData.phone,
        username: currentUserData.username
      };

      if (targetRole === 'master' && specialization) {
        requestData.master_type = specialization;
      }

      const response = await axios.put(
        `/user/${currentUserData.id}/`, requestData,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setAlert('Вы успешно сменили роль пользователю!', 'success');
      fetchData();
      
    } catch (error) {
      setAlert('Ошибка сервера.', 'error');
    }
  };

  const handleDeleteCall = async(e, id) => {
    
    e?.preventDefault();

    try {
      const response = await axios.delete(`/call/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert('Вы успешно удалили заявку!', 'success');
      fetchData();
    }
    catch (error) {
      setAlert('Ошибка сервера.', 'error');
    }
  }

  const handleDeleteQuestionnaire = async(e, id) => {
    
    e?.preventDefault();

    try {
      const response = await axios.delete(`/masters/questionnaire/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert('Анкета успешно была удалена!', 'success');
      fetchData();
    }
    catch (error) {
      setAlert('Ошибка сервера.', 'error');
    }
  }

  const [data, setData] = useState({
    users: [],
    masters: [],
    managers: [],
    consults: [],
    activeCalls: [],
    completedCalls: [],
    fastCalls: [],
    questionnaire: [],
    loading: false,
    error: false
  });

  const fetchData = async (e) => {
    e?.preventDefault();
    
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {

      const [usersRes, mastersRes, questionnaireRes, managerRes, consultRes, activeCalls, completedCalls, fastCalls] = await Promise.all([
        axios.get('/users/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/masters/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/masters/questionnaire/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        (role==='admin' ? axios.get('/managers/', {
          headers: { Authorization: `Bearer ${token}` }
        }) : []),
        axios.get('/consults/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/activecalls/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/completedcalls/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/fastcalls/', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setData({
        users: usersRes.data,
        consults: consultRes.data,
        activeCalls: activeCalls.data,
        completedCalls: completedCalls.data,
        fastCalls: fastCalls.data,
        masters: mastersRes.data,
        managers: role === 'admin' ? managerRes.data : [],
        questionnaire: questionnaireRes.data,
        loading: false,
        error: false
      });

    } catch (error) {

      setAlert('Ошибка загрузки данных', 'error');

      setData(prev => ({
        ...prev,
        loading: false,
        error: true
      }));

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.loading ? (
        <h1 className={style.alert__loading}>Загрузка...</h1>
      ) : data.error ? (
        <h1 className={style.alert__loading}>Ошибка. Перезагрузите страницу.</h1>
      ) : (
        <>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Пользователи ({data.users.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.users.map(user => (
                <div className={style.secondary__info_column} key={user.id}>
                  <h2 className={style.secondary__info_column_title}>
                    Пользователь номер #{user.id}
                  </h2>
                  <p className={style.secondary__info_column_description}>
                    Имя: {user.name}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Телефон пользователя: {user.phone}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Почта пользователя: {user.username}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Роль: Пользователь
                  </p>
                  <div className={style.manage__buttons}>
                    <div className={style.promote__group}>
                      <select
                        id={`specialization-${user.id}`}
                        className={style.specialization_select}
                        defaultValue=""
                      >
                        <option value="fridge">Холодильники</option>
                        <option value="freezer">Морозилки</option>
                        <option value="machines">Стиральные машины</option>
                        <option value="plates">Плиты</option>
                        <option value="oven">Духовки</option>
                      </select>
                      <button 
                        className={style.good__btn} 
                        onClick={(e) => {
                          const selectElement = document.getElementById(`specialization-${user.id}`);
                          handlePromoteDemote(e, user, 'master', selectElement.value);
                        }}
                      >
                        Повысить до мастера
                      </button>
                    </div>
                    {role === 'admin' ? (                
                      <button className={style.good__btn} onClick={(e) => handlePromoteDemote(e, user, 'manager')}>
                        Повысить до менеджера
                      </button>
                    ) : null}
                    <button className={style.bad__btn} onClick={(e) => handleDeleteUser(e, user.id)}>
                      Удалить пользователя
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Анкеты ({data.questionnaire.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.questionnaire.map(quest => (
                <div className={style.secondary__info_column} key={quest.id}>
                  <h2 className={style.secondary__info_column_title}>
                    Анкета номер #{quest.id}
                  </h2>
                  <p className={style.secondary__info_column_description}>
                    Номер пользователя: {quest.client_id}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Имя: {quest.name}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Телефон пользователя: {quest.phone}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Резюме: {quest.note}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Тип мастера: {quest.type === 'fridge' 
                            ? 'Мастер по холодильникам'
                            : quest.type === 'freezer'
                              ? 'Мастер по морозилкам'
                              : quest.type === 'machines'
                                ? 'Мастер по стиральным машинам'
                                : quest.type === 'plates'
                                  ? 'Мастер по ремонту плит' : 'Мастер по ремонту духовок'
                          }
                  </p>
                  <div className={style.manage__buttons}>
                    <button className={style.bad__btn} onClick={(e) => handleDeleteQuestionnaire(e, quest.id)}>
                      Удалить анкету
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Мастера ({data.masters.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.masters.map(master => (
                <div className={style.secondary__info_column} key={master.id}>
                  <h2 className={style.secondary__info_column_title}>
                    Мастер номер #{master.id}
                  </h2>
                  <p className={style.secondary__info_column_description}>
                    Имя: {master.name}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Почта мастера: {master.username}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Телефон мастера: {master.phone}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Роль: Мастер
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Тип: {master.master_type === 'fridge'
                            ? 'Мастер по холодильникам'
                            : master.master_type === 'freezer'
                              ? 'Мастер по морозилкам'
                              : master.master_type === 'machines'
                                ? 'Мастер по стиральным машинам'
                                : master.master_type === 'plates'
                                  ? 'Мастер по ремонту плит'
                                  : 'Мастер по ремонту духовок'}
                  </p>
                  <div className={style.manage__buttons}>
                    {role === 'admin' ? (                
                      <button className={style.good__btn} onClick={(e) => handlePromoteDemote(e, master, 'manager')}>
                        Повысить до менеджера
                      </button>
                    ) : null}
                    <button className={style.bad__btn} onClick={(e) => handlePromoteDemote(e, master, 'user')}>
                      Понизить мастера до пользователя
                    </button>
                    <button className={style.bad__btn} onClick={(e) => handleDeleteUser(e, master.id)}>
                      Удалить пользователя
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {role === 'admin' ? (
            <div className={style.secondary__info_block}>
              <h1 className={style.secondary__info_title}>
                Менеджеры ({data.managers.length})
              </h1>
              <div className={style.secondary__info_scroll}>
                {data.managers.map(manager => (
                  <div className={style.secondary__info_column} key={manager.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Менеджер номер #{manager.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Имя: {manager.name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон менеджера: {manager.phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Почта пользователя: {manager.username}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Роль: Менеджер
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.bad__btn} onClick={(e) => handlePromoteDemote(e, manager, 'user')}>
                        Понизить менеджера до пользователя
                      </button>
                      <button className={style.bad__btn} onClick={(e) => handleDeleteUser(e, manager.id)}>
                        Удалить пользователя
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Консультации ({data.consults.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.consults.map(consult => (
                <div className={style.secondary__info_column} key={consult.id}>
                  <h2 className={style.secondary__info_column_title}>
                    Вопрос #{consult.id}
                  </h2>
                  <p className={style.secondary__info_column_description}>
                    Имя: {consult.name}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Телефон: {consult.phone}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Почта: {consult.email}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Вопрос: {consult.question}
                  </p>
                  <p className={style.secondary__info_column_description}>
                    Статус: {consult.status ? 'Отвечено' : 'Ожидает ответа...'}
                  </p>
                  <div className={style.manage__buttons}>
                    {consult.status ? '' :                   
                      (
                        <button className={style.good__btn} onClick={(e) => handleAnswerConsult(e, consult)}>
                          Отвечено
                        </button>
                      )
                    }
                    <button className={style.bad__btn} onClick={(e) => handleDeleteConsult(e, consult.id)}>
                      Удалить вопрос
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Активные заявки ({data.activeCalls.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.activeCalls.map(activeCall => (
                  <div className={style.secondary__info_column} key={activeCall.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Заявка #{activeCall.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Мастер: {activeCall.master_name ? `${activeCall.master_name}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер мастера: {activeCall.master_id ? `${activeCall.master_id}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон мастера: {activeCall.master_phone ? `${activeCall.master_phone}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {activeCall.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер клиента: {activeCall.client_id}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {activeCall.client_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Примечание: {activeCall.note}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Тип мастера: {activeCall.type === 'fridge'
                            ? 'Мастер по холодильникам'
                            : activeCall.type === 'freezer'
                              ? 'Мастер по морозилкам'
                              : activeCall.type === 'machines'
                                ? 'Мастер по стиральным машинам'
                                : activeCall.type === 'plates'
                                  ? 'Мастер по ремонту плит'
                                  : 'Мастер по ремонту духовок'}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.bad__btn} onClick={(e) => handleDeleteCall(e, activeCall.id)}>
                        Удалить заявку
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              История заявок ({data.completedCalls.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.completedCalls.map(completedCall => (
                  <div className={style.secondary__info_column} key={completedCall.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Заявка #{completedCall.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Мастер: {completedCall.master_name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер мастера: {completedCall.master_id}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон мастера: {completedCall.master_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {completedCall.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата окончания: {completedCall.end_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер клиента: {completedCall.client_id}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {completedCall.client_phone}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.bad__btn} onClick={(e) => handleDeleteCall(e, completedCall.id)}>
                        Удалить заявку
                      </button>
                    </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Заявки в 1 клик ({data.fastCalls.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.fastCalls.map(fastCall => (
                  <div className={style.secondary__info_column} key={fastCall.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Заявка #{fastCall.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Мастер: {fastCall.master_name ? `${fastCall.master_name}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер мастера: {fastCall.master_id ? `${fastCall.master_id}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон мастера: {fastCall.master_phone ? `${fastCall.master_phone}` : 'В обработке...'}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {fastCall.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Имя клиента: {fastCall.client_name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {fastCall.client_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Почта клиента: {fastCall.client_email}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.bad__btn} onClick={(e) => handleDeleteCall(e, fastCall.id)}>
                        Удалить заявку
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AdminPanel