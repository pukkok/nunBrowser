import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosData (sidoCode, sggCode, currentPage=1, setFunc) {

    const { data } = await axios.post(`/api/kinder`, 
    {
        sidoCode, sggCode, currentPage
    })

    return setFunc(data)
}

async function allAxiosData (setFunc) {
    const { data } = await axios.get('/api/kinder/all')
    return setFunc(data)
}

export {axiosData, allAxiosData}