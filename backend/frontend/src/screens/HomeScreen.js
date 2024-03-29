import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import Offer from '../components/Offer';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate'
import Message from '../components/Message';
import { listOffers } from '../actions/offerActions';

function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const offerList = useSelector(state => state.offerList);
    const { loading, error, offers, page, pages } = offerList;
    let keyword = useLocation().search;

    useEffect(() => {
      dispatch(listOffers(keyword));
    }, [dispatch, keyword]);
    

    return (
      <div>
        <h1>Latest Offers</h1>
        {loading ? <Loader />
                  : error ? <Message variant='danger'>{error}</Message>
                      :
                      <div>
                          <Row>
                              {offers.map(offer => (
                                  <Col key={offer._id} sm={12} md={6} lg={4} xl={3}>
                                      <Offer offer={offer} />
                                  </Col>
                              ))}
                          </Row>
                          <Paginate page={page} pages={pages} keyword={keyword} />
                      </div>
              }
      </div>
    );
}

export default HomeScreen;
