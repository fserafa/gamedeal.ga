import { Badge, Col, Row } from 'react-bootstrap';
import moment from 'moment';

export default function FreeGames({ freeGames }) {
    return (
        <>
            <Row className="justify-content-center" id="freeGames">
                <h1 className="my-5">Free</h1>
            </Row>
            <Row className="justify-content-center">

                {freeGames.map(deal => (

                    <Col lg={4} sm={12} key={deal.data.id} className="d-flex">
                        <div className="card-post d-flex flex-column justify-content-between">

                            <h6><Badge variant="secondary">#{deal.data.store}</Badge></h6>

                            <a className="deal-link" href={deal.data.url} target="_blank" rel="noopener noreferrer">
                                <h5 className="post-title">{deal.data.title}</h5>
                            </a>

                            <small className="meta"><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>
                        </div>

                    </Col>
                ))}
            </Row>
        </>
    )
}