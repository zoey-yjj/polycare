import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let roles = ["User"]

    if (token) {
        const decoded = jwtDecode(token)
        const { uuid, uid, isReception } = decoded.UserInfo

        isAdmin = isReception

        if (isAdmin) roles = ["Admin"]

        return { uuid, uid, roles, isAdmin }
    }

    return { uuid: '', uid: '', roles, isAdmin }
}
export default useAuth