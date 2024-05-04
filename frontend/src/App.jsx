import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/sideBar';
import Header from './components/header';
import { useEffect, useState } from 'react';

const App = () => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(location.pathname === '/');
  const { id } = useParams();
  
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = `StudyStorm | Home`;
        break;
      case '/admin/course/create':
        document.title = `StudyStorm | Add Course`;
        break;
        case `/admin/course/update/${id}`:
          document.title = `StudyStorm | Update Course`;
          break;
      default:
        document.title = `StudyStorm | 404 Not Found`;
        break;
    }

    if (location.pathname.includes('/admin')) {
      setShowHeader(false);
    } else { 
      setShowHeader(true);
    }

  }, [location.pathname]);

  return (
    <>
      <ToastContainer />
      <Container className='mw-100 py-0 px-0' id="main" style={{position:'fixed', minHeight:'100vh', width:'100%', height:'100%', overflow:'auto', display:'flex', background:'rgb(246 245 238)'}}>
        {showHeader ? <Header /> : <Sidebar />}        
        <Outlet />
      </Container>
    </>
  );
};

export default App;