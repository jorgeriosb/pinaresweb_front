let backend_url =  process.env.NEXT_PUBLIC_BACKEND_URL;

const submitLogin = async (usuario, password)=>{
    const token = localStorage.getItem("token");
    const val = await  fetch(backend_url+'/api/login', {
        method:"POST",
        body: JSON.stringify({ usuario,password }),
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json"
        },
    })
    return await val.json()
}



export {submitLogin}