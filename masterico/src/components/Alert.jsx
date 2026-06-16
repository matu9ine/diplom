import {React, useEffect, useState} from 'react'
import style from '../assets/styles/alert.module.css';

const Alert = ({ message, type, onClose }) => {

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const timer = setTimeout(handleClose, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${style.alert} ${style[type]} ${isClosing ? style.closing : ''}`}>
      <div className={style.alert__content}>
        {message}
        <button className={style.alert__close} onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Alert;