import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">PolyCare!</span></h1>
            </header>
            <main className="public__main">
                <p>Make appointment for clinics.</p>
            </main>
            <footer>
            </footer>
        </section>

    )
    return content
}
export default Public