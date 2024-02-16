import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOfferDetails } from '../actions/offerActions'
import { useParams } from "react-router-dom"

function OfferScreen({ match }) {
    

    const dispatch = useDispatch();
	const offerDetails = useSelector((state) => state.offerDetails)
	const { loading, error, offer } = offerDetails

	const params = useParams()
	console.log(params.id)
	useEffect(() => {
		dispatch(listOfferDetails(params.id))
	}, [dispatch, params])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={offer.image} alt={offer.name} fluid />
                                </Col>


                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{offer.titel}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ${offer.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Rooms: {offer.number_of_rooms}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {offer.description}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='btn btn-light my-2'>
                                            Furnished: {offer.is_furnished ? "Yes" : "No"}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='btn btn-light my-2'>
                                            Pet friendly: {offer.is_pet_friendly ? "Yes" : "No"}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Location: {offer.location}
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>
                    )

            }


        </div >
    )
}

export default OfferScreen