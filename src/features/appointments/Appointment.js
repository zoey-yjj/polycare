import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAppointmentById } from './appointmentsApiSlice'

const Appointment = ({ appointmentId }) => {

    const appointment = useSelector(state => selectAppointmentById(state, appointmentId))

    const navigate = useNavigate()

    if (appointment) {
        const time = new Date(appointment.time).toLocaleString('en-US')

        const handleEdit = () => navigate(`/dash/appointments/${appointmentId}`)

        return (
            <tr className="table__row">
                <td className="table__cell appointment__username">{appointment.username}</td>
                <td className="table__cell appointment__title">{appointment.clinic}</td>
                <td className="table__cell appointment__title">{time}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Appointment