import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {React, useState, useEffect} from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Masters from './components/Masters';
import Brands from './components/Brands';
import Contacts from './components/Contacts';
import Services from './components/Services';
import Account from './components/Account'
import Alert from './components/Alert';

function App() {

  const [hasShownAuthAlert, setHasShownAuthAlert] = useState(false);

  const [authData, setAuthData] = useState(() => {
    const savedData = localStorage.getItem('authData');
    return savedData ? JSON.parse(savedData) : null;
  });

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData));
    } else {
      localStorage.removeItem('authData');
    }
  }, [authData]);

  return (
    <div>
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={closeAlert}
        />
      )}
      <Router>
        <Header
          authData={authData}
          setAuthData={setAuthData}
          setAlert={showAlert}
        />
        <Routes>
          <Route exact path="/" element={<Home setAlert={showAlert} />}/>
          <Route path="/about" element={<About setAlert={showAlert} />}/>
          <Route path="/masters" element={<Masters authData={authData} setAlert={showAlert}/>}/>
          <Route path="/brands" element={<Brands />}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/services" element={<Services authData={authData} setAlert={showAlert}/>}/>
          <Route 
            path="/profile" 
            element={
              <Account 
                authData={authData}
                setAlert={showAlert}
              />
            }
          />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
