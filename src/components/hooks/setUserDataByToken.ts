import axios from 'axios'
import Cookies from 'js-cookie'

import {
  setAllFields,
  setAuth,
  setLoading,
  setQuestionnaire,
} from '../../RTK/slices/AuthSlice'
import { setCatData } from '../../RTK/slices/CatSlice'

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
      console.log(error)
      if (error.response?.status === 404)
        dispatch(setQuestionnaire(false))
      if (error.response.status === 401) {
        dispatch(setAuth(false))
        Cookies.set('token', '')
        navigate('/')
      }
    }
    dispatch(setLoading(false))
  }
  else{
    dispatch(setLoading(false))
  }
  const catData = Cookies.get('cat')
  if (catData) {
    dispatch(setCatData(JSON.parse(catData)))
  }
}

export default setUserDataByToken
