import {req_get} from "./requests"

const get_cuenta_id = (id)=>{
    return req_get("/api/cuenta/"+id)
}


const get_cuenta_documentos = (id)=>{
    return req_get("/api/cuenta/"+id+"/documentos")
}

const getClientes_cuenta = async ()=>{
    return req_get('/api/clientescuenta')
}


export {get_cuenta_id, get_cuenta_documentos, getClientes_cuenta}