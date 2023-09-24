import { store } from '../../app/store'
import { appointmentsApiSlice } from '../appointments/appointmentsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const appointments = store.dispatch(appointmentsApiSlice.endpoints.getAppointments.initiate())

        return () => {
            console.log('unsubscribing')
            appointments.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch