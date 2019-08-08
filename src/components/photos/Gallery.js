import React from 'react';
import GallerItem from './GalleryItem';
import LoadingPhotos from './LoadingPhotos';
import NoPhotos from './NoPhotos';

const Gallery = props => {
    const galleryList = props.gallery;
    let photos;

    if (props.loading) {
        photos = <LoadingPhotos />
    } else if (galleryList.length > 0) {
        photos = galleryList.map((photo) =><GallerItem key = {photo.id} url={photo.url} />);
    } else {
        photos = <NoPhotos />
    }

    return(
        <div className="photo-container">
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default Gallery;