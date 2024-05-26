import { Routes, Route } from 'react-router-dom';
import { JoinPage, LoginPage, MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'
import PlatformPage from './Pages/Platform/PlatformPage';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<MainPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/join' element={<JoinPage/>}/>
        <Route exact path='/search' element={<SearchPage/>}/>
        <Route exact path='/kinder' element={<PlatformPage/>}/>
        <Route exact path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;


