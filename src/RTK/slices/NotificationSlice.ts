import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


const initialState: {message: string, statusCode: number } = {
  message: '',
  statusCode: 0,
}

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<NotificationIntreface>) {
      state.message = action.payload.message
      state.statusCode = action.payload.statusCode
    },
    clearMessage(state) {
      state.message = ''
      state.statusCode = 0
    },
  },
})
export const getMessage = (state :RootState) => state.notification.message
export const getStatusCode = (state :RootState) => state.notification.statusCode
export const { pushMessage, clearMessage } = NotificationSlice.actions
export default NotificationSlice.reducer
