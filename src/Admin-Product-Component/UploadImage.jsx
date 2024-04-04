import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

function UploadImage() {
    const [image, setImage] = useState(null);
    const [feedback, setFeedback] = useState(''); // For user feedback
    const { id } = useParams();
    const history = useHistory();

    const handleImageChange = (event) => {
        setFeedback(''); // Reset feedback
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(file);
        }
    };

    const handleImageUpload = async () => {
        if (!image) {
            setFeedback('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch(`http://localhost:8080/product/${id}/upload-image`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setFeedback('Image uploaded successfully.');
                history.push("/productsall");
            } else {
                setFeedback('Image upload failed.');
            }
        } catch (error) {
            setFeedback(`Error uploading image: ${error.message}`);
        }
    };

    return (
        <div>
            <div>
                <Button className='back-btn' variant="contained" color="primary" onClick={() => history.push("/productsall")}>Back</Button>
            </div>
            <div className='upload-img'>
                <h4>Choose photo</h4>
                <input type="file" accept="image/*" onChange={handleImageChange} className='upload' />
                <Button variant="text" onClick={handleImageUpload} color="primary">Upload Image</Button>
                {feedback && <p>{feedback}</p>}
            </div>
        </div>
    );
}

export default UploadImage;
