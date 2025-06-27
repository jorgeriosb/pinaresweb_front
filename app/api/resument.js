import {req_get, req_post, req_download} from "./requests"


const get_resumen = (id)=>{
    return req_get(`/api/resumen`);
}

const get_resumen_inmuebles_fecha = (fecha)=>{
    return req_get(`/api/resumen/${fecha}`);
}


export {get_resumen, get_resumen_inmuebles_fecha}
