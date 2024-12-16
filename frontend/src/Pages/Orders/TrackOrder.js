import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerOrders } from "../../Fetures/OrderSlice";
import Loading from "../../Components/Loading";
import Error from "../../Components/Error";
import { Card, ListGroup, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TrackOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.order);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    // Redirect to login if customer is not logged in
    if (!customer?.token) {
      navigate("/customer-login");
    } else {
      dispatch(fetchCustomerOrders());
    }
  }, [dispatch, navigate, customer?.token]);

  return (
    <Container style={{ marginTop: "50px", maxWidth: "800px" }}>
      <h2>Your Orders</h2>
      {loading && <Loading />}
      {error && <Error variant="danger">{error}</Error>}
      {!loading && !error && orders?.length === 0 && (
        <p>No orders found. Place your first order to track it here!</p>
      )}
      {!loading && orders?.length > 0 && (
        <ListGroup>
          {orders.map((order) => (
            <Card key={order._id} className="mb-3">
              <Card.Body>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  <strong>Art Category:</strong> {order.artId?.category}
                  <br />
                  <strong>Price:</strong> ₹{order.artId?.price}
                  <br />
                  <strong>Status:</strong> {order.status}
                  <br />
                  <strong>Customer Name:</strong> {order.customerName}
                  <br />
                  <strong>Phone:</strong> {order.customerPhone}
                  <br />
                  <strong>Address:</strong> {order.customerAddress}
                </Card.Text>
                <Button variant="primary" disabled>
                  {order.status}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default TrackOrder;
