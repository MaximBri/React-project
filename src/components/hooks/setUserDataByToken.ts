import axios from 'axios'
import Cookies from 'js-cookie'

import {
  setAllFields,
  setAuth,
  setLoading,
  setQuestionnaire,
} from '../../RTK/slices/AuthSlice'

const setUserDataByToken = async (
  token: string | undefined,
  dispatch: any,
  navigate: any
) => {
  if (token) {
    dispatch(setAuth(true))
    dispatch(setLoading(true))
    try {
      const response = await axios.get(
        'https://catsandpies.ru/api/Questionnaire/GetMyQuestionnaire',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch(setAllFields(response.data.data))
      dispatch(setQuestionnaire(true))
    } catch (error: any) {
      console.error('Error fetching data:', error.response)
      if (error.response.data.description === 'Анкета не найдена')
        dispatch(setQuestionnaire(false))
      if (error.response.status === 401) {
        dispatch(setAuth(false))
        Cookies.set('token', '')
        navigate('/React-project/Authorization')
      }
    }
    dispatch(setLoading(false))
  }
  else{
    dispatch(setLoading(false))
  }
}

export default setUserDataByToken
