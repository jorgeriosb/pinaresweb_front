import {req_get, req_post} from "./requests"


const get_gixamortizacion = (id)=>{
    return req_get(`/api/gixamortizacion/${id}`);
}


export {get_gixamortizacion}
