import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Offer({ offer }) {
    return (
        <Col sm={12} md={6} lg={12} xl={4}>
            <Card className="my-3 p-3 rounded h-100">
                <Link to={`/housingoffer/${offer._id}`}>
                    <div style={{ height: '250px', overflow: 'hidden' }}>
                        <Card.Img src={offer.image} className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%' }} alt={offer.title} />
                    </div>
                </Link>

                <Card.Body>
                    {offer.title && (
                        <Link to={`/housingoffer/${offer._id}`}>
                            <Card.Title as="div">
                                <strong>{offer.title}</strong>
                            </Card.Title>
                        </Link>
                    )}

                    <Card.Text as="h3">
                        ${offer.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Offer;
