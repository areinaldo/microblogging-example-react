import API from "./api";
export {
    login,
    postNewUser,
    getAllPosts
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
