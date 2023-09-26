import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CLINICS } from "../../config/clinics"
import { useAddNewAppointmentMutation } from "./appointmentsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewAppointmentForm = ({ users }) => {

    const [addNewAppointment, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewAppointmentMutation()

    const navigate = useNavigate()

    const [clinic, setClinic] = useState('')
    const [time, setTime] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setClinic('')
            setTime('')
            setUserId('')
            navigate('/dash/appointment')
        }
    }, [isSuccess, navigate])

    const onClinicChanged = e => setClinic(e.target.value)
    const onTimeChanged = e => setTime(e.target.value)
    const onUserIDChanged = e => setUserId(e.target.value)

    const canSave = [clinic, time].every(Boolean) && !isLoading

    const onSaveAppointmentClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewAppointment({ user: userId, clinic, timeStr: time })
        }
    }

    const user_options = users.map(u => {
        return (
            <option key={u.uid} value={u.username} > {u.uid} </option >
        )
    })

    const options = CLINICS.map(opt => {
        return (
            <option key={opt.id} value={opt.name} > {opt.name} </option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTimeClass = !time ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveAppointmentClicked}>
                <div className="form__clinic-row">
                    <h2>New Appointment</h2>
                </div>
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="appointment-userid">
                            Select UserID:</label>
                        <select
                            id="appointment-userid"
                            name="usersid"
                            className="form__select"
                            value={userId}
                            onChange={onUserIDChanged}
                        >
                            {user_options}
                        </select>
                    </div>
                </div>

                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="appointment-clinic">
                            Choose clinic:</label>
                        <select
                            id="appointment-clinic"
                            name="clinic"
                            className="form__select"
                            value={clinic}
                            onChange={onClinicChanged}
                        >
                            {options}
                        </select>
                    </div>
                </div>

                <label className="form__label" htmlFor="appointment-time">
                    Time:</label>
                <input
                    className={`form__input ${validTimeClass}`}
                    id="assignment-time"
                    name="time"
                    type="text"
                    autoComplete="off"
                    value={time}
                    onChange={onTimeChanged}
                />

                <div className="form__divider">
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            username="Save"
                            onClick={onSaveAppointmentClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div> 
                </div>

            </form>
        </>
    )

    return content
}

export default NewAppointmentForm