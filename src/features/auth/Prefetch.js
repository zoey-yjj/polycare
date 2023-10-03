import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice'
import { appointmentsApiSlice } from '../appointments/appointmentsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(appointmentsApiSlice.util.prefetch('getAppointments', 'appointmentsList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch