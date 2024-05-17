import { Routes, Route } from 'react-router-dom';
import { MainPage, NotFoundPage, SearchPage } from './Pages'
import './App.css'

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<MainPage></MainPage>}/>
        <Route exact path='/search' element={<SearchPage></SearchPage>}/>
        <Route exact path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;


