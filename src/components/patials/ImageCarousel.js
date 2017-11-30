import React from 'react';

import ImageGallery from 'react-image-gallery';

class ImageCarousel extends React.Component{
    handleImageLoad(event) {
    }

    render() {
        const { images } = this.props;
        return (
            <ImageGallery
                items={images}
                slideInterval={6000}
                showThumbnails={false}
                autoPlay={true}
                showPlayButton={false}
                onImageLoad={this.handleImageLoad}/>
        );
    }
}

export default ImageCarousel;
