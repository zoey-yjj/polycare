import { useGetUsersQuery } from '../users/usersApiSlice'
import NewAppointmentForm from './NewAppointmentForm'
import useAuth from "../../hooks/useAuth"

const NewAppointment = () => {
    const { uid } = useAuth()

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const currUser = users.filter(u => u.id === uid)

    if (!currUser?.length) return <p>Not Currently Available</p>

    const content = <NewAppointmentForm users={currUser} />

    return content
}
export default NewAppointment