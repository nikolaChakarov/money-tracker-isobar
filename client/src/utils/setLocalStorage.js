const setLocalStorage = (user) => {
    localStorage.setItem('id', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('token', user.token);
}

export default setLocalStorage;