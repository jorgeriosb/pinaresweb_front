import {req_get, req_post} from "./requests"



// const get_cliente_id = async (id)=>{
//     return req_get(`/api/clientes/${id}`)
// }

const genera_contrato = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/contrato", payload)
}





export {genera_contrato};