import { useEffect } from 'react'
import axios from 'axios';

function App() {

  useEffect(()=>{
  const testFetch = async () => {
    const url = 'https://e-childschoolinfo.moe.go.kr/api/notice/basicInfo2.do?'
    const key = `key=${process.env.REACT_APP_CHILDSCHOOL_OPENAPI_KEY}`
    const option = '&sidoCode=27&sggCode=27140'

    const data = await axios.get('/api'+`${url}${key}${option}`)
    console.log(data)
  }

    testFetch()
  },[])

  return (
    <div className="App">
      앱이 열림
    </div>
  );
}

export default App;
