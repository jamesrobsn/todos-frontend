const API_URL = '/api/todos/'

export async function getTodos() {
    return fetch(API_URL)
    .then(resp => {
        if(!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not running..."};
                throw err;
            }
        }
        return resp.json();
    })
}

export async function createTodo(val) {
    return fetch(API_URL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({name: val})
    })
    .then(resp => {
        if(!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not running..."};
                throw err;
            }
        }
        return resp.json();
    })
}

export async function removeTodo(id) {
    const deleteURL = API_URL + id;

    return fetch(deleteURL, {
        method: 'delete'
    })
    .then(resp => {
        if(!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not running..."};
                throw err;
            }
        }
        return resp.json();
    })
}

export async function updateTodo(todo) {
    const updateURL = API_URL + todo._id;
    
    return fetch(updateURL, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({completed: !todo.completed})
    })
    .then(resp => {
        if(!resp.ok) {
            if(resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    let err = {errorMessage: data.message};
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not running..."};
                throw err;
            }
        }
        return resp.json();
    })
}