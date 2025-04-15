import {req_get, req_post} from "./requests"

const get_documento_movimientos = (id)=>{
    return req_get(`/api/documento/${id}/movimientos`);
}

const crear_documento_pago_anterior = (id, payload)=>{
    return req_post(`/api/documento/${id}/pagoanterior`, payload)
}

const pagar_documentos_varios = (payload)=>{
    return req_post(`/api/documentos/pagar`, payload)
}


export {get_documento_movimientos, crear_documento_pago_anterior, pagar_documentos_varios}