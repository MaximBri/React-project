import { clearMessage, pushMessage } from '../../RTK/slices/NotificationSlice'

export const setMessage = ({ message, dispatch, statusCode }: messageInterface) => {

  dispatch(
    pushMessage({
      message,
      statusCode: statusCode,
    })
  )
  setTimeout(() => {
    dispatch(clearMessage())
  }, 3000)
}
