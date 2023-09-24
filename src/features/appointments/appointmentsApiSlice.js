import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const appointmentsAdapter = createEntityAdapter()

const initialState = appointmentsAdapter.getInitialState()

export const appointmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAppointments: builder.query({
            query: () => ({
                url: '/appointments',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedAppointments = responseData.map(appointment => {
                    appointment.id = appointment._id
                    return appointment
                });
                return appointmentsAdapter.setAll(initialState, loadedAppointments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Appoinment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Appoinment', id }))
                    ]
                } else return [{ type: 'Appoinment', id: 'LIST' }]
            }
        }),
        addNewAppointment: builder.mutation({
            query: initialAppointment => ({
                url: '/appointments',
                method: 'POST',
                body: {
                    ...initialAppointment,
                }
            }),
            invalidatesTags: [
                { type: 'Appointment', id: "LIST" }
            ]
        }),
        updateAppointment: builder.mutation({
            query: initialAppointment => ({
                url: '/appointments',
                method: 'PATCH',
                body: {
                    ...initialAppointment,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Appointment', id: arg.id }
            ]
        }),
        deleteAppointment: builder.mutation({
            query: ({ id }) => ({
                url: `/appointments`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Appointment', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetAppointmentsQuery,
    useAddNewAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentsApiSlice

// returns the query result object
export const selectAppointmentsResult = appointmentsApiSlice.endpoints.getAppointments.select()

// creates memoized selector
const selectAppointmentsData = createSelector(
    selectAppointmentsResult,
    appointmentsResult => appointmentsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAppointments,
    selectById: selectAppointmentById,
    selectIds: selectAppointmentIds
    // Pass in a selector that returns the appointments slice of state
} = appointmentsAdapter.getSelectors(state => selectAppointmentsData(state) ?? initialState)
