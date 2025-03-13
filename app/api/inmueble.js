import {req_get} from "./requests"

const get_inmueble_id = (id)=>{
    return req_get("/api/inmueble/"+id)
}


export {get_inmueble_id}