import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosData (sidoCode, sggCode , setFunc) {

    const { data } = await axios.post(`/api/kinder`, 
    {
        sidoCode, sggCode
    })

    return setFunc(data)
}

export default axiosData