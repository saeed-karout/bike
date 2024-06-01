
import React, { useState } from 'react';
import { Bike } from '../types';

const BikeListItem: React.FC<{ bike: Bike }> = ({ bike }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShowMore = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <tr>
      <td data-label="Title">
        <h4>{bike.title}</h4>
      </td>
       <td data-label="Description">
        {bike.description && (showFullDescription || bike.description.length <= 80) ? (
          bike.description
        ) : (
          <>
            {bike.description ? bike.description.substring(0, 80) : ''}...
            {bike.description && bike.description.length > 80 && (
              <button onClick={handleShowMore} style={{ fontSize:'8px',marginLeft: '10px', cursor: 'pointer' }}>
                {showFullDescription ? 'Show Less' :'Show More'}
              </button>
            )}
          </>
        )}
      </td>
      <td data-label="Stolen on">
        <p>{new Date(bike.date_stolen * 1000).toLocaleDateString()}</p>
      </td>
      <td data-label="Reported on">
        <p>{new Date(bike.date_reported * 1000).toLocaleDateString()}</p>
      </td>
      <td data-label="Location">
        <p>{bike.stolen_location}</p>
      </td>
      <td data-label="Image">
        {bike.thumb && <img style={{ borderRadius: '20%' }} width={150} height={150} src={bike.thumb} alt={bike.title} />}
      </td>
    </tr>
  );
};

export default BikeListItem;
