import { useState, useEffect } from "react"
import { useUpdateAppointmentMutation, useDeleteAppointmentMutation } from "./appointmentsApiSlice"
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

    const [deleteAppointment, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAppointmentMutation()

    const navigate = useNavigate()

    const [clinic, setClinic] = useState(appointment.clinic)
    const [time, setTime] = useState(appointment.time)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setClinic('')
            setTime('')
            navigate('/dash/appointment')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onClinicChanged = e => setClinic(e.target.value)
    const onTimeChanged = e => setTime(e.target.value)

    const canSave = [clinic, time].every(Boolean) && !isLoading

    const onSaveAppointmentClicked = async (e) => {
        if (canSave) {
            await updateAppointment({ id: appointment.id, user: appointment.user, clinic, timeStr: time })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteAppointment({ id: appointment.id })
    }

    const options = CLINICS.map(opt => {
        return (
            <option key={opt.id} value={opt.name} > {opt.name} </option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTimeClass = !time ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

        const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__username-row">
                    <h2>Edit Appointment</h2>
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
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteNoteClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div> 
                </div>

            </form>
        </>
    )

    return content
}

export default EditAppointmentForm