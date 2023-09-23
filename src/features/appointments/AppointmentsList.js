import { useGetAppointmentsQuery } from "./appointmentsApiSlice"
import Appointment from "./Appointment"

const appointmentsList = () => {
    const {
        data: appointments,
        isLoading,
        isSuccess,
        isError,
        error
    } = UseGetAppointmentsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = appointments

        const tableContent = ids?.length
            ? ids.map(appointmentId => <Appointment key={appointmentId} appointmentId={appointmentId} />)
            : null

        content = (
            <table className="table table--appointments">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th appointment__username">Username</th>
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
export default appointmentsList