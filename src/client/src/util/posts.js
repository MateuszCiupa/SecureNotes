export const addPost = post => fetch('/api/post', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getPosts = () => fetch('/api/post', {
    headers: {
        'Accept': 'application/json'
    }
});