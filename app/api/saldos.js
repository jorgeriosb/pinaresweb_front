import {req_get, req_post, req_download} from "./requests"


const get_saldos = ()=>{
    return req_get(`/api/saldos`);
}

const get_saldos_vencidos = ()=>{
    return req_get(`/api/saldos_vencidos`);
}
export {get_saldos, get_saldos_vencidos}
