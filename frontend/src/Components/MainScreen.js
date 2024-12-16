import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './Mainscreen.css';

const MainScreen = ({ title, children }) => {
  return (
    <Container>
      <Row>
        {title && (
          <div className="my-3">
            <div className="heading-container">
              <h6 className="main-container-heading">{title}</h6>
              <hr className="heading-hr" />
            </div>
          </div>
        )}
        {children}
      </Row>
    </Container>
  );
};

export default MainScreen;
