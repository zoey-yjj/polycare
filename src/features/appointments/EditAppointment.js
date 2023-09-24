import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAppointmentById } from './appointmentsApiSlice'
import EditAppointmentForm from './EditAppointmentForm'

const EditAppointment = () => {
    const { id } = useParams()

    console.log(id)

    const appointment = useSelector(state => selectAppointmentById(state, id))

    console.log(appointment)

    const content = appointment ? <EditAppointmentForm appointment={appointment} /> : <p>Loading...</p>

    return content
}
export default EditAppointment