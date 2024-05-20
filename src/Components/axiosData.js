import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosData (sidoCode, sggCode, setFunc) {
    const { data } = await axios.post(`/api/kinder`, { sidoCode, sggCode })
    return setFunc(data)
}

async function allAxiosData (allData, setFunc) {
    const success = await Promise.all(
        allData.map( item => {
            const {sidoCode, code} = item
            return axios.post('/api/kinder', {
                sidoCode, sggCode : code
            })
        })
    )
    const flat = await success.reduce((acc, r)=>acc.concat(r.data), [])
    return setFunc(flat)

}

async function axiosPagesOptionData (sidoCode, sggCode, page, cnt, setFunc) {

    const { data } = await axios.post(`/api/kinder?page=${page}&cnt=${cnt}`, 
    {
        sidoCode, sggCode
    })

    return setFunc(data)
}

export {axiosData, allAxiosData, axiosPagesOptionData}