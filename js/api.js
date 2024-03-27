const URL = 'https://jsonplaceholder.typicode.com';

async function getPosts(){
    const response = await fetch(`${URL}/posts`);
    return await response.json();
}

async function getPost(id){
    const response = await fetch(`${URL}/posts/${id}`);
    return await response.json();
}

async function getComments(id){
    const response = await fetch(`${URL}/posts/${id}/comments`);
    return await response.json();
}

export{
    getPosts,
    getPost,
    getComments
};