import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { appointmentsApiSlice } from '../appointments/appointmentsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const appointments = store.dispatch(appointmentsApiSlice.endpoints.getAppointments.initiate())

        return () => {
            console.log('unsubscribing')
            users.unsubscribe()
            appointments.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch