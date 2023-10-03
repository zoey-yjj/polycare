import { useParams } from 'react-router-dom'
import { useGetAppointmentsQuery } from './appointmentsApiSlice'
import EditAppointmentForm from './EditAppointmentForm'

const EditAppointment = () => {
    const { id } = useParams()

    const { appointment } = useGetAppointmentsQuery("appointmentsList", {
        selectFromResult: ({ data }) => ({
            appointment: data?.entities[id]
        }),
    })

    const content = appointment ? <EditAppointmentForm appointment={appointment} /> : <p>Loading...</p>

    return content
}
export default EditAppointment