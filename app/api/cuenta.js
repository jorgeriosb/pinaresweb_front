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

export {get_cuenta_id, get_cuenta_documentos, getClientes_cuenta, genera_cuenta}