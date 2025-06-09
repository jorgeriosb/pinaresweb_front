import {req_get, req_post} from "./requests"



// const get_cliente_id = async (id)=>{
//     return req_get(`/api/clientes/${id}`)
// }

const genera_pagare = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/pagare", payload)
}





export {genera_amortizacion};