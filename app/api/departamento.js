import {req_get, req_post, req_put} from "./requests"



const get_cliente_id = async (id)=>{
    return req_get(`/api/clientes/${id}`)
}

const create_cliente = async (payload) =>{
    return req_post("/api/clientes", payload)
}

const get_departamentos = async()=>{
    return req_get("/api/departamento")
}

const update_cliente = async(id, payload) =>{
    return req_put("/api/clientes/", id, payload)
}



export {get_cliente_id, create_cliente, update_cliente, get_departamentos};