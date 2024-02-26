import React from 'react'
import { Card, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Offer({ offer }) {
    console.log("Offer:", offer); 
    console.log("Images:", offer.images);
    
    return (
        <Card className="my-3 p-3 rounded" style={{ width: '300px' }}> 
            <Link to={`/housingoffer/${offer._id}`}>
                {offer.images && offer.images.length > 0 ? (
                    <Carousel>
                        {offer.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image}
                                    alt={`Slide ${index}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <div>No Image Available</div>
                )}
            </Link>

            <Card.Body>
                <Link to={`/housingoffer/${offer._id}`}>
                    <Card.Title as="div" style={{ fontSize: '24px' }}>
                        <strong>{offer.title}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="h3">
                    ${offer.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Offer
