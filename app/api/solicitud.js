import {req_get, req_post, req_put} from "./requests"




const genera_solicitud = async (payload) =>{
    console.log("aqui entro")
    return req_post("/api/solicitud", payload)
}

const get_solicitud_all = async () =>{
    return  req_get(`/api/solicitudes`);
}

const get_solicitud = (id)=>{
    return req_get (`/api/solicitud/${id}`);
}

const update_solicitud = async(id, payload) =>{
    return req_put("/api/solicitud/", id, payload)
}





export {genera_solicitud, get_solicitud_all, get_solicitud, update_solicitud};