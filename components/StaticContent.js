import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import moment from 'moment';
import About from './About';


export default function StaticContent({ allDealsData }) {
    return (
        <div>
            {allDealsData.map(deal => {
                let matches = deal.data.title.match(/\[(.*?)\]/);

                if (matches) {
                    var submatch = matches[1];
                    deal.data.store = submatch;
                }
                return (
                    < div key={deal.data.id} >

                        <div>
                            <a className="deal-link" href={deal.data.url}>
                                <h5 className="post-title">{deal.data.title}</h5>
                            </a>
                            <h5 className="post-title">{deal.data.selftext}</h5>
                            <small className="meta"><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>
                        </div>
                    </div>
                )
            })}
            <About />
        </div>
    )
}
