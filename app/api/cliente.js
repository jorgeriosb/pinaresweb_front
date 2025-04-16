import {req_get, req_post} from "./requests"



const get_cliente_id = async (id)=>{
    return req_get(`/api/clientes/${id}`)
}

const create_cliente = async (payload) =>{
    return req_post("/api/clientes", payload)
}

const get_clientes = async()=>{
    return req_get("/api/clientesall")
}



export {get_cliente_id, create_cliente, get_clientes};