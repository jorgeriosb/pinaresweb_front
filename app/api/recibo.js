import {req_get, req_post, req_download} from "./requests"


const get_recibo = (id)=>{
    return req_download(`/api/recibo/${id}`);
}


export {get_recibo}
