import { useState, useEffect } from "react"
import { useUpdateAppointmentMutation } from "./appointmentsApiSlice"
// import { useUpdateAppointmentMutation, useDeleteAppointmentMutation } from "./appointmentsApiSlice"
import { CLINICS } from "../../config/clinics"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditAppointmentForm = ({ appointment }) => {

    const [updateAppointment, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAppointmentMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(appointment.username)
    const [clinic, setClinic] = useState(appointment.clinic)
    const [time, setTime] = useState(appointment.time)

    useEffect(() => {

        if (isSuccess) {
            setUsername('')
            setClinic('')
            setTime('')
            navigate('/dash/appointment')
        }

    }, [isSuccess, navigate])

    const onClinicChanged = e => setClinic(e.target.value)
    const onTimeChanged = e => setTime(e.target.value)

    const canSave = [username, clinic, time].every(Boolean) && !isLoading

    const onSaveAppointmentClicked = async (e) => {
        if (canSave) {
            await updateAppointment({ id: appointment.id, clinic, time })
        }
    }

    const options = CLINICS.map(opt => {
        return (
            <option key={opt.id} value={opt.name} > {opt.name} </option >
        )
    })

    const errClass = (isError) ? "errmsg" : "offscreen"
    const validTimeClass = !time ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message) ?? ''

        const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__username-row">
                    <h2>Edit Appointment for {username}</h2>
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

                <label className="form__label" htmlFor="note-title">
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

export default EditAppointmentForm