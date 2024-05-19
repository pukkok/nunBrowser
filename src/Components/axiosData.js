import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_RESTAPI_URL

async function axiosData (sidoCode, sggCode, setFunc) {

    const { data } = await axios.post(`/api/kinder`, 
    {
        sidoCode, sggCode
    })

    return setFunc(data)
}

async function allAxiosData (list, setFunc) {
    const success = await Promise.all(
        list.map( async item => {
            const {sidoCode, code} = item
            const { data } = await axios.post(`/api/kinder`,{
                sidoCode, sggCode: code
            })
            return data
        })
    )
    const allData = await success.reduce((acc, r) => acc.concat(r), [])
    return setFunc(allData)

}

export {axiosData, allAxiosData}