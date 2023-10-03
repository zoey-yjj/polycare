import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetAppointmentsQuery } from './appointmentsApiSlice'
import { memo } from 'react'

const Appointment = ({ appointmentId }) => {

    const { appointment } = useGetAppointmentsQuery("appointmentsList", {
        selectFromResult: ({ data }) => ({
            appointment: data?.entities[appointmentId]
        }),
    })

    const navigate = useNavigate()

    if (appointment) {
        const time = new Date(appointment.time).toLocaleString('en-US')

        const handleEdit = () => navigate(`/dash/appointment/${appointmentId}`)

        return (
            <tr className="table__row">
                <td className="table__cell appointment__username">{appointment.username}</td>
                <td className="table__cell appointment__clinic">{appointment.clinic}</td>
                <td className="table__cell appointment__time">{time}</td>

                <td className="table__cell appointment__edit">
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

const memoizedAppointment = memo(Appointment)

export default memoizedAppointment