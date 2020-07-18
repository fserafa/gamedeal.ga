import { Container, Row, Col, Badge } from 'react-bootstrap';
import moment from 'moment';


export default function StaticContent({ allDealsData }) {
    return (
        <Container>
            <Row className="justify-content-center">
                {allDealsData.map(deal => {
                    let matches = deal.data.title.match(/\[(.*?)\]/);

                    if (matches) {
                        var submatch = matches[1];
                        deal.data.store = submatch;
                    }

                    return (
                        < Col lg={10} key={deal.data.id} >
                            <div>
                                <h6><Badge variant="secondary">#{deal.data.store}</Badge></h6>

                                <a className="deal-link" href={deal.data.url}>
                                    <h5 className="post-title">{deal.data.title}</h5>
                                </a>
                                <h5 className="post-title">{deal.data.selftext}</h5>
                                <small className="meta"><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </Container >
    )
}
