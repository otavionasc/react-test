import axios from 'axios';

const api = axios.create({
    baseURL: 'https://developer.spotify.com/web-api/get-list-featured-playlists'
});

export default api;