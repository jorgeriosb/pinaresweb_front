import {req_get, req_post} from "./requests"



const get_vendedores = async()=>{
    return req_get("/api/vendedores")
}



export {get_vendedores};