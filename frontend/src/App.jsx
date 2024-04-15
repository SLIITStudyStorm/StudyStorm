import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/sideBar';

const App = () => {

  return (
    <>
      <ToastContainer />
      <Container className='mw-100 py-0 px-0' id="main" style={{position:'fixed', minHeight:'100vh', width:'100%', height:'100%', overflow:'auto', display:'flex', background:'#eef2f6'}}>
        <Sidebar />
        <Outlet />
      </Container>
    </>
  );
};

export default App;