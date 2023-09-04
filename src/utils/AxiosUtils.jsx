import axios from 'axios'
import { HomeownerUrl, ProfessionalUrl,AdminUrl } from '../Constants/Constants'

const CreateAxiosClient = (baseURL) =>{
    const client = axios.create({
        baseURL,
        timeout : 8000,
        timeoutErrorMessage: "Request timed out please try again!!!" 
    })
    return client
}


const attachToken = (req,tokenName) => {
    let authToken = localStorage.getItem(tokenName.access)
    if(authToken){
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req
}


const HomeownerAxiosInstant = CreateAxiosClient(HomeownerUrl)
HomeownerAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})


const ProfessionalAxiosInstant = CreateAxiosClient(ProfessionalUrl)
ProfessionalAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})

const AdminAxiosInstant = CreateAxiosClient(AdminUrl)
AdminAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})




export {HomeownerAxiosInstant,ProfessionalAxiosInstant,AdminAxiosInstant}

