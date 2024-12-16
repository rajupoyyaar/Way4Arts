import React, { useState, useEffect } from 'react';
import MainScreen from '../Components/MainScreen';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import './UploadArt.css';
import Loading from '../Components/Loading';
import Error from '../Components/Error';
import { uploadArt } from '../Fetures/ArtSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UploadArt = () => {
  const [profile, setProfile] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [uploading, setUploading] = useState(false); // New state for upload progress

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { artist } = useSelector((state) => state.artist); // Get artist state
  const { loading, error } = useSelector((state) => state.art);

  useEffect(() => {
    // Redirect to login if artist is not logged in
    if (!artist?.token) {
      navigate('/artist-login');
    }
  }, [artist?.token, navigate]);

  const postDetails = async (pics) => {
    if (!pics) {
      setValidationError('Please select a file to upload.');
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      setUploading(true); // Start upload spinner
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'notesapp');
      data.append('cloud_name', 'deebtrhka');
      await fetch('https://api.cloudinary.com/v1_1/deebtrhka/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.url.toString());
          setValidationError(null); // Clear error on successful upload
        })
        .catch((err) => {
          console.log(err);
          setValidationError('Image upload failed. Please try again.');
        })
        .finally(() => setUploading(false)); // End upload spinner
    } else {
      setValidationError('Only JPEG and PNG formats are supported.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!profile || !price || !category) {
      setValidationError('All fields are required.');
      return;
    }
    setValidationError(null); // Clear validation error if form is valid
    await dispatch(uploadArt({ price, category, art: profile }));
    navigate("/")
  };

  return (
    <div className="upload-art-container">
      <Container className="upload-art">
        <MainScreen title="Upload">
          {loading && <Loading />}
          {error && <Error variant="danger">{error}</Error>}
          {validationError && <Error variant="danger">{validationError}</Error>} {/* Display validation errors */}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formGroupCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
              />
              {uploading && (
                <div className="mt-2">
                  <Spinner animation="border" size="sm" /> Uploading...
                </div>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="lg mb-3"
              disabled={uploading} // Disable submit during upload
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Form>
        </MainScreen>
      </Container>
    </div>
  );
};

export default UploadArt;
