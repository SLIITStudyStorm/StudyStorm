import { Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/sideBar';
import Header from './components/header';
import { useEffect, useState } from 'react';

const App = () => {
  const [title, setTitle] = useState("Home");
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Home');
        break;
      default:
        setTitle('404 Not Found');
        break;
    }

    document.title = `StudyStorm | ${title}`;
  }, [title]);
  return (
    <>
      <ToastContainer />
      <Container className='mw-100 py-0 px-0' id="main" style={{position:'fixed', minHeight:'100vh', width:'100%', height:'100%', overflow:'auto', display:'flex', background:'rgb(246 245 238)'}}>
        {isHomePage ? <Header /> : <Sidebar />}        
        <Outlet />
      </Container>
    </>
  );
};

export default App;