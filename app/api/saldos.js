import {req_get, req_post, req_download} from "./requests"


const get_saldos = ()=>{
    return req_get(`/api/saldos`);
}

export {get_saldos}
