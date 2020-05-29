import React from 'react';
import './albumCard.scss';
import { Link } from 'react-router-dom';

const AlbumCard = ({ album }) => {
  console.log(album);

  const displayArtistName = artists => {
    if (artists.length === 0) {
      return <p>No artist found for this album</p>
    } else {
      return <p>{(artists.reduce((all, artist) => all + artist.name + ', ', '')).slice(0, -2)}</p>
    }
  }

  return (
    <div className="album-card">
      <div>
        <p className="title">{album.artists.length > 1 ? 'Artists' : 'Artist'}</p>
        {displayArtistName(album.artists)}
      </div>
      <div>
        <p className="title">Go to album</p>
        <a target="_blank" rel="noopener noreferrer" href={album.external_urls.spotify}>Listen on spotify</a>
      </div>
      <figure>
        <img alt={`album ${album.name}`} src={album.images['1'].url}/>
      </figure>
      <div>
        <p>{album.name}</p>
      </div>
      <div>
        <Link to={`/albums/${album.id}`}><button>Album detail</button></Link>
      </div>
    </div>
  );
}
 
export default AlbumCard;