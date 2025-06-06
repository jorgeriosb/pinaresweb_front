import {req_get, req_post} from "./requests"

const get_inmueble_id = (id)=>{
    return req_get("/api/inmueble/"+id)
}

const get_inmuebles_disponibles = (id)=>{
    return req_get("/api/inmueblesdisponibles")
}

const update_inmueble_precio = (payload)=>{
    return req_post("/api/updateinmuebleprecio", payload)
}


export {get_inmueble_id, get_inmuebles_disponibles, update_inmueble_precio}