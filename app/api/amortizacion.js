import {req_get, req_post} from "./requests"



const get_amortizacion_id = async (id)=>{
    return req_get(`/api/amortizacion/${id}`)
}

const genera_tabla_amortizacion = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/tablaamortizacion", payload)
}


const genera_amortizacion = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/amortizacion", payload)
}

const get_amortizaciones_sincuenta = async (id)=>{
    return req_get(`/api/amortizacionsincuenta`)
}








export {genera_tabla_amortizacion, genera_amortizacion, get_amortizacion_id, get_amortizaciones_sincuenta};