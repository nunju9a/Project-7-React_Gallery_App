import React from 'react';

const LoadingPhotos = props => {
    return (
        <div className="loading-photos">
          <h3>Please hold while</h3>
          <p>Pictures are loading</p>
          <div className="loader">
          </div>
        </div>
    );
}
export default LoadingPhotos;