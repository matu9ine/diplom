import {React, useEffect, useState} from 'react'
import style from '../assets/styles/master.module.css'
import axios from 'axios'

const MasterPanel = ({token, user, setAlert}) => {

  const handlePinMaster = async (e, call_id) => {
    e?.preventDefault();

    try {

      if (data.workCalls.length >= 3) {
        setAlert('Больше трёх заявок брать нельзя', 'error');
        return;
      }

      const callResponse = await axios.get(
        `/call/${call_id}/`,
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      const currentCall = callResponse.data;

      if (currentCall.master_id) {
        setAlert('Заявка закреплена за другим мастером!', 'error');
        fetchData();
        return;
      }

      const response = await axios.put(
        `/call/${call_id}/`, 
        {
          master_id: user.id,
          master_name: user.name,
          master_phone: user.phone
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setAlert('Вы успешно взяли заявку!', 'success');
      fetchData();
      
    } catch (error) {
      setAlert('Заявка была удалена.', 'error');
      fetchData();
    }
  };

  const handleCompleteCall = async(e, call_id) => {
    e?.preventDefault();

    try {

      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const response = await axios.put(
        `/call/${call_id}/`, 
        {
          end_date: `${year}-${month}-${day}`
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setAlert('Вы успешно уведомили о выполненной работе!', 'success');
      fetchData();
      
    } catch (error) {
      setAlert('Заявка была удалена.', 'error');
      fetchData();
    }
  };

  const [data, setData] = useState({
    activeCalls: [],
    fastCalls: [],
    workCalls: [],
    loading: false,
    error: false
  });

  const fetchData = async (e) => {
    e?.preventDefault();
    
    setData(prev => ({ ...prev, loading: true, error: null }));

    try {

      const [activeCalls, fastCalls, workCallsRes] = await Promise.all([
        axios.get('/masters/calls/',
        {
          params: {
            type: user.master_type
          },
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/fastcalls/active/', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/masters/calls/work/', {
          params: {
            params: {
              id: user.id
            }
          },
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setData({
        activeCalls: activeCalls.data,
        fastCalls: fastCalls.data,
        workCalls: workCallsRes.data,
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
              Ваши заявки ({data.activeCalls.length})
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
                      Дата создания: {activeCall.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Почта клиента: {activeCall.client_email}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {activeCall.client_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Примечание: {activeCall.note}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.good__btn} onClick={(e) => handlePinMaster(e, activeCall.id)}>
                        Взять заявку
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
                      Имя клиента: {fastCall.client_name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {fastCall.client_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Почта клиента: {fastCall.client_email}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Примечание: {fastCall.note}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {fastCall.created_date}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.good__btn} onClick={(e) => handlePinMaster(e, fastCall.id)}>
                        Взять заявку
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div className={style.secondary__info_block}>
            <h1 className={style.secondary__info_title}>
              Закреплённые за вами заявки ({data.workCalls.length})
            </h1>
            <div className={style.secondary__info_scroll}>
              {data.workCalls.map(workCall => (
                  <div className={style.secondary__info_column} key={workCall.id}>
                    <h2 className={style.secondary__info_column_title}>
                      Заявка #{workCall.id}
                    </h2>
                    <p className={style.secondary__info_column_description}>
                      Имя клиента: {workCall.client_name}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Телефон клиента: {workCall.client_phone}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Почта клиента: {workCall.client_email}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Дата создания: {workCall.created_date}
                    </p>
                    <p className={style.secondary__info_column_description}>
                      Примечание: {workCall.note}
                    </p>
                    <div className={style.manage__buttons}>
                      <button className={style.good__btn} onClick={(e) => handleCompleteCall(e, workCall.id)}>
                        Заявка выполнена
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

export default MasterPanel