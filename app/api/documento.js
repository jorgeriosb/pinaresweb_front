import {req_get} from "./requests"

const get_documento_movimientos = (id)=>{
    return req_get(`/api/documento/${id}/movimientos`);
}


export {get_documento_movimientos}