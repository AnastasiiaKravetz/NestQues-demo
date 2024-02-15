import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Offer({ offer }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/housingoffers/${offer._id}`}>
                <Card.Img src={offer.image} />
            </Link>

            <Card.Body>
                <Link to={`/housingoffers/${offer._id}`}>
                    <Card.Title as="div">
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
