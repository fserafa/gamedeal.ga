import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Nav, Container } from 'react-bootstrap';

export const siteTitle = 'gamedeal.ga'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Web site created using create-react-app to show game deals"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />

            </Head>
            <header>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="fixed-nav">
                    <Container>

                        <Navbar.Brand href="#home" >gamedeal.ga</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="#deals">Deals</Nav.Link>
                                <Nav.Link href="#free">Free</Nav.Link>
                                <Nav.Link href="#about">About</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>
            </header>
            <main>{children}</main>


        </>

    )
}
