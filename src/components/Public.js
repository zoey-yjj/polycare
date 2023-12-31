import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegistered, faPencilAlt } from "@fortawesome/free-solid-svg-icons"

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">PolyCare!</span></h1>
                <nav className="dash-header__nav">
                    <FontAwesomeIcon icon={faPencilAlt} />
                    <Link to="/login"> User Login </Link>
                    
                    <FontAwesomeIcon icon={faRegistered} />
                    <Link to="/register"> Register </Link>
                </nav>
            </header>
            <main className="public__main">
                <p>Make appointment with our clinics.</p>
            </main>
            <footer>
                <p>If you require any assistance, please feel free to reach out to us at +65 1234-5678.</p>
            </footer>
        </section>

    )
    return content
}
export default Public