import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <div className="artist-related">
      <p>{artist.name}</p>
      <a target="_blank" rel="noopener noreferrer" href={artist.external_urls.spotify}>
        <i className="fas fa-play-circle">Go to this artist on spotify</i>
      </a>
    </div>
  );
}
 
export default ArtistCard;