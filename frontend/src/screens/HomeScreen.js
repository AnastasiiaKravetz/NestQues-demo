import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Offer from '../components/Offer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOffers } from '../actions/offerActions'


function HomeScreen() {
  const dispatch = useDispatch()
  const offerList = useSelector(state => state.offerList)
  const { loading, error, offers } = offerList
  
  useEffect(() => {
    dispatch(listOffers())
  }, [dispatch])
  

  return (
    <div>
      <h1>Latest Offers</h1>
      <Row>
  {loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : Array.isArray(offers) && offers.length > 0 ? (
    offers.map(offer => (
      <Col key={offer._id} sm={12} md={6} lg={4} xl={3}>
        <Offer offer={offer} />
      </Col>
    ))
  ) : (
    <Message variant='info'>No offers available</Message>
  )}
</Row>

    </div>
  )
}

export default HomeScreen
