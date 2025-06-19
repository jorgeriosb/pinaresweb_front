import {req_get, req_post} from "./requests"



// const get_cliente_id = async (id)=>{
//     return req_get(`/api/clientes/${id}`)
// }

const genera_tabla_amortizacion = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/tablaamortizacion", payload)
}


const genera_amortizacion = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/amortizacion", payload)
}






export {genera_tabla_amortizacion, genera_amortizacion};