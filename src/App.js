import { Routes, Route } from 'react-router-dom';
import { MainPage } from './Pages'


import SearchPage from './Pages/SearchPage';
import CheckBox from './Components/CheckBox';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route exact path='/' element={<MainPage></MainPage>}/>
        <Route exact path='/search' element={<SearchPage></SearchPage>}/>
        <Route exact path='/imsi' element={<CheckBox></CheckBox>}/>
      </Routes>
    </div>
  );
}

export default App;


