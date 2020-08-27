import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { useEffect, useState, useRef } from 'react';
import { Container, Spinner, Pagination, Row } from 'react-bootstrap';
import { getDealsData } from '../lib/deals'
import About from '../components/About';
import FreeGames from '../components/FreeGames';
import Deals from '../components/Deals';
import StaticContent from '../components/StaticContent';
import CustomCarousel from '../components/CustomCarousel'

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
	const [paginatedDeals, setPaginatedDeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dealsActiveIndex, setDealsActiveIndex] = useState(0);

	const dealsRef = useRef(null);

	useEffect(() => {
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

		setPaginatedDeals(paginate(data, 10))
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

		setPaginatedFreeGames(paginate(freeGames, 3))
		setFreeGames(freeGames);
	}

	function paginate(array, page_size) {
		let pages;
		let paginatedArray = [];

		if (array.length % page_size !== 0) {
			console.log(parseInt(array.length / page_size))
			console.log(array.length % page_size)
			pages = parseInt(array.length / page_size) + 1;
		}
		else {
			console.log(array.length / page_size);
			pages = array.length / page_size;
		}

		console.log("cade", pages, array, page_size)

		for (let i = 1; i <= pages; i++) {
			const _array = [...array];
			console.log(_array.slice(i * page_size, i * page_size))
			paginatedArray = [...paginatedArray, array.slice((i - 1) * page_size, i * page_size)]
		}

		console.log("coe", paginatedArray)

		return paginatedArray;
		// console.log("array length", array.length, page_number)

		// array.slice((page_number - 1) * page_size, page_number * page_size);

		// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
		// return array.slice((page_number - 1) * page_size, page_number * page_size);
	}

	function setPage(key, index) {
		const activeIndex = dealsActiveIndex;
		console.log("dealsActiveIndex", dealsActiveIndex)

		console.log("activeIndex", activeIndex)
		console.log("index", index)
		const page = {
			'next': () => {
				if (dealsActiveIndex != paginatedDeals.length - 1) {
					return activeIndex + 1
				}
			},
			'prev': () => {
				if (dealsActiveIndex != 0) {
					return activeIndex - 1
				}
			},
			'index': () => {
				return index;
			}
		}

		setDealsActiveIndex(page[key]());
		dealsRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}

	if (loading) {
		return <StaticContent allDealsData={allDealsData} />;
	}

	return (
		<Layout>
			<Head>
				<title>{siteTitle}</title>
			</Head>

			<section>

				<Container>
					{loading ?
						<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
							<Spinner animation="border" role="status">
								<span className="sr-only"></span>
							</Spinner>
						</div> : null}

					<CustomCarousel data={paginatedFreeGames} />

					<div ref={dealsRef} />
					<Deals deals={paginatedDeals[dealsActiveIndex]} />
					<Row className="d-flex justify-content-center">
						<Pagination>
							{dealsActiveIndex != 0 ? <Pagination.Prev onClick={() => setPage('prev')} /> : null}
							{paginatedDeals.map((d, index) => (
								<Pagination.Item key={index.toString()} active={index === dealsActiveIndex} onClick={() => setPage('index', index)}>
									{index + 1}
								</Pagination.Item>
							))}
							{/* <Pagination.Next onClick={nextPage} /> */}
							{dealsActiveIndex != paginatedDeals.length - 1 ? <Pagination.Next onClick={() => setPage('next')} /> : null}
						</Pagination>
					</Row>

					{/* <FreeGames freeGames={freeGames} /> */}
				</Container>
			</section>
			<About />
		</Layout >
	)
}