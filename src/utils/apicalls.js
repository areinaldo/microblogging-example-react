import API from "./api";
export {
    login,
    postNewUser,
    getAllPosts,
    getMyPosts,
    deletePost,
    postNewPost,
    putExistingPost
};
function login(username, password){
    return API.post('/users/signin', {
        username, password
    }).then(result => result.data)
    .catch(function(error){
        //TODO aqui se indica lo que se quiere hacer en caso de que ocurra un error
    });
}

function postNewUser(username, password, fullname, email, role){
    return API.post('/users', {
        username,
        password,
        fullname,
        email,
        role
    }).then(result => result.data);
}

function getAllPosts(){
    return API.get('/posts').then(res => res.data);
}

function getMyPosts(iduser){
    return API.get('/post/all'+iduser).then(res => res.data);
}

function deletePost(idpost){
    return API.delete('/posts/'+idpost).then(result => result.data);
}

function postNewPost(iduser, title, description){
    return API.post('/posts', {
        iduser, title, description
    }).then(result => result.data);
}

function putExistingPost(idpost, title, description){
    return API.put('/posts'+idpost, {
        title,
        description
    }).then(result => result.data);
}