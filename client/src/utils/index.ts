import api from '../config/request'

interface IRequest {
    url: string,
    body: object
}
const add = async(url: string, body: object) => {
    return api.post(`/api${url}`, body)
}

const fetch = (url: string) => {
    return api.get(`/api${url}`)}

const API = { add, fetch }

export default API