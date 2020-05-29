import axios from 'axios';

const spotify = axios.create({ baseURL: 'https://api.spotify.com/v1' });

export const userDetail = () => {
  const token = localStorage.getItem('spotify-token');
  return spotify.get('/me', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const searchAlbums = (searchedWord, actualPage) => {
  const token = localStorage.getItem('spotify-token');
  return spotify.get(`/search?q=${searchedWord}&type=album&limit=10&offset=${10 * (actualPage - 1)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const requestAlbumDetail = albumId => {
  const token = localStorage.getItem('spotify-token');
  return spotify.get(`/albums/${albumId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const requestArtistDetail = artistId => {
  const token = localStorage.getItem('spotify-token');
  return spotify.get(`/artist/${artistId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}