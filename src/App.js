import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import AppointmentsList from './features/appointments/AppointmentsList'
import EditAppointment from './features/appointments/EditAppointment'
import NewAppointment from './features/appointments/NewAppointment'
import AppointmentsListAll from './features/appointments/AppointmentsListAll'
import NewAppointmentAll from './features/appointments/NewAppointmentAll'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import NewUserForm from './features/users/NewUserForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<NewUserForm />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>

            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                  <Route path="appointment">
                    <Route index element={<AppointmentsList />} />
                    <Route path=":id" element={<EditAppointment />} />
                    <Route path="new" element={<NewAppointment />} />
                  </Route>
                    
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="appointment-all">
                    <Route index element={<AppointmentsListAll />} />
                    <Route path="new" element={<NewAppointmentAll />} />
                  </Route>
                </Route>
              
              </Route> {/* End Dash */}
            </Route> {/* End Prefetch */}

          </Route> {/* End RequireAuth */}
        </Route> {/* End PersistLogin */}

      </Route>
    </Routes>
  );
}

export default App;