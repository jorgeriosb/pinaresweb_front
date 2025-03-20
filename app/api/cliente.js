import {req_get, req_post} from "./requests"

const getClientes = async ()=>{
    return req_get('/api/clientes')
}

const get_cliente_id = async (id)=>{
    return req_get(`/api/clientes/${id}`)
}

const create_cliente = async (payload) =>{
    return req_post("/api/clientes", payload)
}



export {getClientes, get_cliente_id, create_cliente};