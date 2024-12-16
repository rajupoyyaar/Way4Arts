import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchArtistOrders, updateOrderStatus } from "../Fetures/OrderSlice";
import { Dropdown, DropdownButton, Spinner, Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);
    const { artist } = useSelector((state) => state.artist);
    const navigate = useNavigate();

    useEffect(() => {
        if (!artist?.token) {
            navigate('/artist-login');
        }
        dispatch(fetchArtistOrders());
    }, [artist?.token, dispatch, navigate]);

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    if (loading) return <Spinner animation="border" variant="primary" className="d-block mx-auto" />;
    if (error) return <p className="text-danger">Error: {error}</p>;

    return (
        <Container className="mt-4">
            <h3 className="mb-4 text-center">Artist Orders</h3>
            {orders.length > 0 ? (
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {orders.map((order) => (
                        <Col key={order._id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={order.artId.art} 
                                    alt={order.artId.category} 
                                    style={{ height: "150px", objectFit: "cover" }} 
                                />
                                <Card.Body>
                                    <Card.Title>Order from: {order.customerName}</Card.Title>
                                    <Card.Text>
                                        <strong>Phone:</strong> {order.customerPhone} <br />
                                        <strong>Status:</strong> {order.status} <br />
                                        <strong>Category:</strong> {order.artId.category} <br />
                                        <strong>Price:</strong> ₹{order.artId.price}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <DropdownButton 
                                        id="dropdown-status" 
                                        title="Update Status" 
                                        variant="outline-primary"
                                        size="sm"
                                    >
                                        <Dropdown.Item onClick={() => handleStatusChange(order._id, 'Pending')}>Pending</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange(order._id, 'Shipped')}>Shipped</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange(order._id, 'Delivered')}>Delivered</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleStatusChange(order._id, 'Cancelled')}>Cancelled</Dropdown.Item>
                                    </DropdownButton>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">No orders found.</p>
            )}
        </Container>
    );
};

export default ManageOrders;
