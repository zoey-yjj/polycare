import { useGetUsersQuery } from '../users/usersApiSlice'
import NewAppointmentForm from './NewAppointmentForm'

const NewAppointmentAll = () => {
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <p>Not Currently Available</p>

    const content = <NewAppointmentForm users={users} />

    return content
}
export default NewAppointmentAll