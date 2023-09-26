import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewAppointmentForm from './NewAppointmentForm'

const NewAppointmentAll = () => {
    const users = useSelector(selectAllUsers)

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewAppointmentForm users={users} />

    return content
}
export default NewAppointmentAll