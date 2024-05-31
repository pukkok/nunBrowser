import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { JoinPage, LoginPage, MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'
import PlatformPage from './Pages/Platform/PlatformPage';
import ServicePage from './Pages/Service/ServicePage';
import Header from './Pages/Common/Header';
import Footer from './Pages/Common/Footer';
import AdminPage from './Pages/Platform/AdminPage/AdminPage';

function App() {

  const UseCommon = () => {
    return(
      <>
        <Header/>
        <Outlet/>
        <Footer/>
      </>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<UseCommon/>}>
          <Route exact path='/' element={<MainPage/>}/>
          <Route exact path='/service/:serviceName' element={<ServicePage/>}/>
          <Route exact path='/search' element={<SearchPage/>}/>
          <Route exact path='/kinder' element={<PlatformPage/>}/>
        </Route>
        <Route path='user'>
          <Route exact path='login' element={<LoginPage/>}/>
          <Route exact path='join' element={<JoinPage/>}/>
        </Route>
        <Route path='admin' element={<AdminPage/>}/>
        <Route exact path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;


