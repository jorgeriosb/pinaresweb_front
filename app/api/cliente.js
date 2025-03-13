import {req_get} from "./requests"

const getClientes = async ()=>{
    return req_get('/api/clientes')
}

const get_cliente_id = async (id)=>{
    return req_get(`/api/clientes/${id}`)
}



export {getClientes, get_cliente_id};