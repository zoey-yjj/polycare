import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    const { isAdmin } = useAuth()

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/appointment">View Appointments</Link></p>

            <p><Link to="/dash/appointment/new">Add New Appointments</Link></p>

            {(isAdmin) && <p><Link to="/dash/appointment-all">View Users Appointments</Link></p>}

            {(isAdmin) && <p><Link to="/dash/appointment-all/new">Add New Appointments For Users</Link></p>}

        </section>
    )

    return content
}
export default Welcome