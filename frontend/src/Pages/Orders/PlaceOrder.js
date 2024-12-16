import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../../Fetures/OrderSlice';
import { Form, Button, Container } from 'react-bootstrap';
import Loading from '../../Components/Loading';
import Error from '../../Components/Error';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.order);
  const { customer } = useSelector((state) => state.customer);

  const artId = location.state?.artId; // Get artId from navigation state
  const [customerName, setCustomerName] = useState(customer?.name || '');
  const [customerPhone, setCustomerPhone] = useState(customer?.phone || '');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!artId) return;

    dispatch(
      placeOrder({
        artId,
        customerName,
        customerPhone,
        customerAddress,
      })
    )
      .unwrap()
      .then(() => {
        navigate('/'); // Redirect to home page after successful order
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '50px' }}>
      <h2>Place Your Order</h2>
      {loading && <Loading />}
      {error && <Error variant="danger">{error}</Error>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your address"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default PlaceOrder;
