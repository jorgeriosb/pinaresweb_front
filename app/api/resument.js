import {req_get, req_post, req_download} from "./requests"


const get_resumen = (id)=>{
    return req_get(`/api/resumen`);
}

const get_resumen_inmuebles_fecha = (fecha)=>{
    return req_get(`/api/resumen/${fecha}`);
}

const get_resumen2 = (id)=>{
    return req_get(`/api/resumen2`);
}




export {get_resumen, get_resumen_inmuebles_fecha, get_resumen2}
