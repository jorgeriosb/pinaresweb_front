let backend_url =  process.env.NEXT_PUBLIC_BACKEND_URL;


const getClientes = async ()=>{
    return fetch(backend_url+'/api/clientes')
}

const get_cliente_id = async (id)=>{
    return fetch(`${backend_url}/api/clientes/${id}`)
}



export {getClientes, get_cliente_id};