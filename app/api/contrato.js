import {req_get, req_post} from "./requests"


const genera_contrato = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/contrato", payload)
}





export {genera_contrato};