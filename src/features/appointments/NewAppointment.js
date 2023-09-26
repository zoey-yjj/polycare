import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewAppointmentForm from './NewAppointmentForm'
import useAuth from "../../hooks/useAuth"

const NewAppointment = () => {
    const { uid } = useAuth()
    const users = useSelector(selectAllUsers)
    const currUser = users.filter(u => u.id === uid)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewAppointmentForm users={currUser} />

    return content
}
export default NewAppointment