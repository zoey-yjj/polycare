import { useGetAppointmentsQuery } from "./appointmentsApiSlice"
import Appointment from "./Appointment"
import useAuth from "../../hooks/useAuth"

const AppointmentsList = () => {

    const { uid } = useAuth()

    const {
        data: appointments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAppointmentsQuery('appointmentsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = appointments

        const filteredIds = ids.filter(appointmentId => entities[appointmentId].user === uid)

        const tableContent = ids?.length
            ? filteredIds.map(appointmentId => <Appointment key={appointmentId} appointmentId={appointmentId} />)
            : null

        content = (
            <table className="table table--appointments">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th appointment__userid">UserID</th>
                        <th scope="col" className="table__th appointment__clinic">Clinic</th>
                        <th scope="col" className="table__th appointment__time">Time</th>
                        <th scope="col" className="table__th appointment__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default AppointmentsList