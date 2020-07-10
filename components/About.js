import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function About() {
    return (
        <section className="p-3 bg-light" id="about">
            <Container>
                <h2 className="mb-3">GameDeals</h2> 
                <h3 className="mb-3"> What about gamedeal.ga?</h3>
                <p className="text-justify">
                    It’s a little project by a solo developer, the ideia is to show game deals (and free games!!!)
                    that are found accross the web and show them here as a hub for all to enjoy and save some money.
                    The posts come from gamedeals subreddit but reddit can sometimes be complicated to some people understand,
                    so a website without all the reddit distractions can be more attractive to everyone.
                </p>
    
                <h3 className="mb-3">                What about me?    </h3>
                <p className="text-justify">
                    I am an aspiring developer from Brazil learning frontend development. This Project itself is a study case,
                    it was build using React and it is a work in progress design-wise and code-wise as I pretend to extend the app functions
                    and transform this into an attractive product.
                     
    
        </p>
        <p>
            As I'm only starting my journey as a frontend developer my github is a bit messy right now, even so you can find me there
            in <a href="http://github.com/fserafa"><FontAwesomeIcon icon={faGithub}/> fserafa</a>.
        </p>
            </Container>
        </section>
    )
}
