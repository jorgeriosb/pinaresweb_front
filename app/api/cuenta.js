import {req_get, req_post} from "./requests"

const get_cuenta_id = (id)=>{
    return req_get("/api/cuenta/"+id)
}


const get_cuenta_documentos = (id)=>{
    return req_get("/api/cuenta/"+id+"/documentos")
}

const getClientes_cuenta = async ()=>{
    return req_get('/api/clientescuenta')
}


const genera_cuenta = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/cuenta", payload)
}

const get_cuentas_vencidas = ()=>{
    return req_get("/api/cuentas_vencidas")
}

const estado_de_cuenta = (id)=>{
    return req_get("/api/estadodecuenta/"+id)
}
export {get_cuenta_id, get_cuenta_documentos, getClientes_cuenta, genera_cuenta, get_cuentas_vencidas, estado_de_cuenta}