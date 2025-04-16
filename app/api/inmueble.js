import {req_get} from "./requests"

const get_inmueble_id = (id)=>{
    return req_get("/api/inmueble/"+id)
}

const get_inmuebles_disponibles = (id)=>{
    return req_get("/api/inmueblesdisponibles")
}


export {get_inmueble_id, get_inmuebles_disponibles}