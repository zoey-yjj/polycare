import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import AppointmentsList from './features/appointments/AppointmentsList'
import EditAppointment from './features/appointments/EditAppointment'
import NewAppointment from './features/appointments/NewAppointment'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="appointment">
              <Route index element={<AppointmentsList />} />
              <Route path=":id" element={<EditAppointment />} />
              <Route path="new" element={<NewAppointment />} />
            </Route>
          
          </Route> {/* End Dash */}
        </Route> {/* End Prefetch */}

      </Route>
    </Routes>
  );
}

export default App;