import { Badge, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import { useEffect } from 'react';

export default function Deals({ deals }) {

    useEffect(() => {
        console.log("eeeeeeeeeeee", deals)
    }, [])
    return (
        <>
            <Row className="justify-content-center mt-5" id="deals">
                <Col lg={10}>
                    <h1 className="my-4">Deals</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">

                {(deals.map(deal => (
                    <Col lg={10} key={deal.data.id} className="post-preview">
                        <div>

                            <h6>  <Badge variant="secondary">#{deal.data.store}</Badge></h6>

                            <a href={deal.data.url} target="_blank" rel="noopener noreferrer">
                                <h5 className="post-title">{deal.data.title}</h5>

                                <p style={{ wordBreak: 'break-all' }}>
                                    {deal.data.url}
                                </p>
                            </a>
                            <small><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>

                        </div>
                        <hr />
                    </Col>
                ))
                )}
            </Row>
        </>
    )
}