import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let roles = ["User"]

    if (token) {
        const decoded = jwtDecode(token)
        const { uid, isReception } = decoded.UserInfo

        isAdmin = isReception

        if (isAdmin) roles = ["Admin"]

        return { uid, roles, isAdmin }
    }

    return { uid: '', roles, isAdmin }
}
export default useAuth