import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { fetchArt } from '../Fetures/ArtSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../Components/Error';
import Loading from '../Components/Loading';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, art } = useSelector((state) => state.art);
  const { customer } = useSelector((state) => state.customer);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchArt());
  }, [dispatch]);

  const filteredArt = art.filter((painting) =>
    painting.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyNow = (artId) => {
    if (customer) {
      // Navigate to place-order page with artId
      navigate('/place-order', { state: { artId } });
    } else {
      // Navigate to customer login page
      navigate('/customer-login');
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error variant="danger">{error}</Error>}
      
      <Container style={{ marginTop: '10px', marginBottom: '10px' }}>
        <Form className="m-auto mb-4" style={{ maxWidth: '400px' }}>
          <Form.Control
            type="search"
            placeholder="Search by category"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>

        {filteredArt && filteredArt.length > 0 ? (
          <Row className="gy-4">
            {filteredArt.map((painting) => (
              <Col key={painting._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={painting.art}
                    alt="Artwork"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">{painting.category}</Card.Title>
                    <Card.Text>Price: ₹{painting.price}</Card.Text>
                    <Card.Text>By: {painting.userName}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleBuyNow(painting._id)}
                    >
                      Place Order
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No paintings available for the selected category. Please try a different search!</p>
        )}
      </Container>
    </div>
  );
};

export default LandingPage;
