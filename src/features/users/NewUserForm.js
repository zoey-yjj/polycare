import { useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useAddNewUserMutation } from "./usersApiSlice"

const USER_REGEX = /^[A-z]{3,20}$/
const UID_REGEX = /^[A-Z][0-9]{6}[A-Z]$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [uid, setUid] = useState('')
    const [validUid, setValidUid] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(false)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidUid(UID_REGEX.test(uid))
    }, [uid])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setUid('')
            setPassword('')
            setRoles(false)
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onUidChanged = e => setUid(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onRolesChanged = e => setRoles(prev => !prev)

    const canSave = [validUsername, validUid, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, uid, password, isReception: roles })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validUidClass = !validUid ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''

    const content = (
        <section className="public">
            <header>
                <h1>
                    <Link to="/">New User</Link>
                </h1>
            </header>
            <p className={errClass}>{error?.data?.message}</p>

            <main className="login">
                <form className="form" onSubmit={onSaveUserClicked}>
                    <label className="form__label" htmlFor="username">
                        Username: <span className="nowrap">[3-20 letters]</span></label>
                    <input
                        className={`form__input ${validUserClass}`}
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={onUsernameChanged}
                    />

                    <label className="form__label" htmlFor="uid">
                        UserID: <span className="nowrap">[In Form of A123456Z]</span></label>
                    <input
                        className={`form__input ${validUidClass}`}
                        id="uid"
                        name="uid"
                        type="text"
                        autoComplete="off"
                        value={uid}
                        onChange={onUidChanged}
                    />

                    <label className="form__label" htmlFor="password">
                        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                    <input
                        className={`form__input ${validPwdClass}`}
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}
                    />

                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="is-reception">
                            Is Reception:
                            <input
                                className="form__checkbox"
                                id="is-reception"
                                name="isReception"
                                type="checkbox"
                                checked={roles}
                                onChange={onRolesChanged}
                            />
                        </label>
                    </div>

                    <div className="form__divider">
                        <button className="form__submit-button">Register</button>
                    </div>

                </form>
            </main>

            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default NewUserForm