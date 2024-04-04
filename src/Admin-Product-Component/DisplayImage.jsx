import React from 'react';

function DisplayImage({ image }) {

    const fullPath = image;
    console.log(image);
    const parts = fullPath.split('/');
    const filename = parts[parts.length - 1];

    console.log(filename);
    const imageUrl = `http://localhost:8080/images/${filename}`;

    return (
        <div>
            <img src={imageUrl} alt="Something" className='image-product' />
        </div>
    );
}

export default DisplayImage;
