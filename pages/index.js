import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Badge, Col, Row, Container, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { getDealsData } from '../lib/deals'
import About from '../components/About';


export async function getStaticProps() {
	const allDealsData = await getDealsData();
	return {
		props: {
			allDealsData
		}
	}
}

export default function Index({ allDealsData }) {
	const [deals, setDeals] = useState([]);
	const [freeGames, setFreeGames] = useState([]);
	const [paginatedFreeGames, setPaginatedFreeGames] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// (async () => {
		// 	setLoading(true)

		// 	const response = await api.get('/r/gamedeals/new.json?limit=50');
		// 	const { data } = response.data
		// 	// console.log(data.children)

		// 	extractFreeGames(data.children)
		// 	extractStore(data.children)

		// 	// console.log(readyData)
		// 	// setData(readyData);
		// 	setLoading(false);
		// })();
		setLoading(true)

		extractStore()
		extractFreeGames()

		setLoading(false)

	}, []);


	function extractStore() {
		let data = [...allDealsData]

		data.map(deal => {
			let matches = deal.data.title.match(/\[(.*?)\]/);

			if (matches) {
				var submatch = matches[1];
				deal.data.store = submatch;
			}
		})

		setDeals(data)
	}

	function extractFreeGames() {
		let data = [...allDealsData]

		let pattern = new RegExp('([a-z0-9]*' + 'Free' + '[a-z0-9]*)', 'gi')
		let freeGames = [];

		data.map(deal => {
			let matches = deal.data.title.match(pattern);

			if (matches) {
				freeGames = [...freeGames, deal]
			}
		})

		// setPaginatedFreeGames(paginate(freeGames, 3))
		setFreeGames(freeGames);
	}

	if (loading) {
		return (
			<>
				<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
					<Spinner animation="border" role="status">
						<span className="sr-only"></span>
					</Spinner>
				</div>
				<Container>
					<Row className="justify-content-center">
						{allDealsData.map(deal => {
							let matches = deal.data.title.match(/\[(.*?)\]/);

							if (matches) {
								var submatch = matches[1];
								deal.data.store = submatch;
							}

							return (
								< Col lg={4} key={deal.data.id} className="d-flex" >
									<div className="card-post d-flex flex-column justify-content-between">

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
			</>
		)
	}

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section>
				<Container>


					{/* <CarouselTeste data={data} /> */}

					{/* <CarouselItems data={paginatedFreeGames} /> */}


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

									<a href={deal.data.url}>
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
					<Row className="justify-content-center" id="free">
						<h1 className="my-4">Free</h1>
					</Row>
					<Row className="justify-content-center">

						{freeGames.map(deal => (

							<Col lg={4} key={deal.data.id} className="d-flex">
								<div className="card-post d-flex flex-column justify-content-between">

									<h6><Badge variant="secondary">#{deal.data.store}</Badge></h6>

									<a className="deal-link" href={deal.data.url}>
										<h5 className="post-title">{deal.data.title}</h5>

										{/* <p>
							{deal.data.url}
						</p> */}
									</a>

									<small className="meta"><p>Posted {moment.unix(deal.data.created).format('lll')} via <a href={`https://reddit.com/${deal.data.permalink}`} target="_blank" rel="noopener noreferrer">reddit</a></p></small>
								</div>

							</Col>
						))}
					</Row>

				</Container >

			</section>
			<section>
				<About />
			</section>
		</Layout >
	)
}