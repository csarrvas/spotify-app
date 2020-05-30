import React from 'react';
import { Link } from 'react-router-dom';
import './albumCard.scss';

const AlbumCard = ({ album }) => {
  return (
    <div className="album-card">
      <div>
        {album.artists.length === 0
          ? <p>No artist found for this album</p>
          : <p>{(album.artists.reduce((all, artist) => all + artist.name + ', ', '')).slice(0, -2)}</p>
        }
      </div>
      <figure>
        <img alt={`album ${album.name}`} src={album.images['1'].url}/>
      </figure>
      <div>
        <p>{album.name}</p>
      </div>
      <div>
        <a target="_blank" rel="noopener noreferrer" href={album.external_urls.spotify}>
          <i className="fas fa-play-circle"> Go to this album on spotify</i>
        </a>
      </div>
      <div>
        <Link to={`/albums/${album.id}`}><button>Album detail</button></Link>
      </div>
    </div>
  );
}
 
export default AlbumCard;