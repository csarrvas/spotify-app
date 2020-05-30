import React from 'react';
import { millisToMinutesAndSeconds } from '../../helpers/helpers';
import './trackCard.scss';

const TrackCard = ({ track, fromAlbum = true, topNumber = 0 }) => {
  return (
    <div className="track">
      {fromAlbum
        ? <p>{`CD-${track.disc_number} / ${track.track_number} - ${track.name}`}</p>
        : <p>{`${topNumber} - ${track.name}`}</p>
      }
      <p>{`Duration: ${millisToMinutesAndSeconds(track.duration_ms)}`}</p>
      <a target="_blank" rel="noopener noreferrer" href={track.external_urls.spotify}>
        <i className="fas fa-play-circle">Go to this song on spotify</i>
      </a>
    </div>
  );
}
 
export default TrackCard;