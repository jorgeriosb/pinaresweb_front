let backend_url =  process.env.NEXT_PUBLIC_BACKEND_URL;

const req_post = (url, payload)=>{
    const token = localStorage.getItem("token");
    return fetch(backend_url+url, {
        method:"POST",
        body: JSON.stringify(payload),
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
    })
}

const req_put = (url, id, payload) =>{
    const token = localStorage.getItem("token");
    return fetch(`${backend_url}${url}${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
      })

}

const req_get = (url)=>{
    const token = localStorage.getItem("token");
    return fetch(backend_url+url, {
        method:"GET",
        headers: {
            "Accept":"application/json", 
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        },
    })
}

const req_download = (url)=>{
    const token = localStorage.getItem("token");
    return fetch(backend_url+url, {
        method:"GET",
        headers: {
            'Accept': 'application/pdf',
            "Authorization":"Bearer "+token
        },
    })
}



export {req_post, req_get, req_download, req_put}