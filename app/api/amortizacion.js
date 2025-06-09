import {req_get, req_post} from "./requests"



// const get_cliente_id = async (id)=>{
//     return req_get(`/api/clientes/${id}`)
// }

const genera_amortizacion = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/tablaamortizacion", payload)
}





export {genera_amortizacion};