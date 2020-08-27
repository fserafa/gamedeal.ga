import { Carousel, Col, Badge, Row, Container } from 'react-bootstrap';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const array = [
    [1, 2, 3],
    [0, 2, 3]
]

export default function CustomCarousel({ data }) {

    return (
        <>
            <Row className="justify-content-center mt-5" id="free">
                <h1 className="my-4">Free Games</h1>
            </Row>
            <Carousel
                style={{ overflow: "visible" }}
                nextIcon={<FontAwesomeIcon icon={faArrowRight} size="lg" color="#0085a1" />}
                prevIcon={<FontAwesomeIcon icon={faArrowLeft} size="lg" color="#0085a1" />}
                indicators={false}

            >
                {data.map((d, index) => (
                    <Carousel.Item key={index.toString()}>
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={10} md={12} sm={12} xs={12}>
                                    <Row>
                                        {d.map(deal => (
                                            <Col lg={4} md={12} sm={12} xs={12} key={deal.data.id} className="d-flex">
                                                <div className="card-post d-flex flex-column justify-content-between">

                                                    <h6><Badge variant="secondary">#{deal.data.store}</Badge></h6>

                                                    <a className="deal-link" href={deal.data.url}>
                                                        <h5 className="post-title">{deal.data.title}</h5>
                                                    </a>

                                                    <small className="meta"><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row >
                        </Container>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}
