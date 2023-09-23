import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import AppointmentsList from './features/appointments/AppointmentsList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="appointment">
            <Route index element={<AppointmentsList />} />
          </Route>
        
        </Route> {/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;