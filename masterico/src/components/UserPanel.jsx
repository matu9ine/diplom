import {React, useEffect, useState} from 'react'
import axios from 'axios';
import style from '../assets/styles/user.module.css'

const UserPanel = ({token, setAlert}) => {

  const [data, setData] = useState({
    myActiveCalls: [],
    myHistoryCalls: [],
    loading: false,
    error: false
  });

  const fetchData = async (e) => {
    e?.preventDefault();
    
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {

      const [myActiveCallsRes, myHistoryCallsRes] = await Promise.all([
        axios.get('/mycalls/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/mycalls/history/', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setData({
        myActiveCalls: myActiveCallsRes?.data,
        myHistoryCalls: myHistoryCallsRes.data,
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
                Мои заявки ({data.myActiveCalls.length})
              </h1>
              <div className={style.secondary__info_scroll}>
                {data.myActiveCalls.map(call => (
                    <div className={style.secondary__info_column} key={call.id}>
                      <h2 className={style.secondary__info_column_title}>
                        Заявка #{call.id}
                      </h2>
                      <p className={style.secondary__info_column_description}>
                        Мастер: {call.master_name ? `${call.master_name}` : 'В обработке...'}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Номер мастера: {call.master_id ? `${call.master_id}` : 'В обработке...'}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Телефон мастера: {call.master_phone ? `${call.master_phone}` : 'В обработке...'}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Дата создания: {call.created_date}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Ваш номер: {call.client_id}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Ваш телефон: {call.client_phone}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Примечание: {call.note}
                      </p>
                      <p className={style.secondary__info_column_description}>
                        Тип: {call.type === 'fridge'
                              ? 'Ремонт холодильников'
                              : call.type === 'freezer'
                                ? 'Ремонт морозильников'
                                : call.type === 'machines'
                                  ? 'Ремонт стиральных машин'
                                  : call.type === 'plates'
                                    ? 'Ремонт плит'
                                    : 'Ремонт духовок'}
                      </p>
                    </div>
                ))}
              </div>
            </div>
            <div className={style.secondary__info_block}>
              <h1 className={style.secondary__info_title}>
                История заявок ({data.myHistoryCalls.length})
              </h1>
              <div className={style.secondary__info_scroll}>
                {data.myHistoryCalls.map(call => (
                  <div className={style.secondary__info_column} key={call.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Заявка #{call.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Имя мастера: {call.master_name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Номер мастера: {call.master_id}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон мастера: {call.master_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {call.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата окончания: {call.end_date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
    </>
  )
}

export default UserPanel