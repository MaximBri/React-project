import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllFields,
  setAllFields,
  setQuestionnaire,
} from '../../RTK/slices/AuthSlice'

const Person = () => {
  const dispatch = useDispatch()
  const userData = useSelector<any, UserDataInterface>(getAllFields)
  let questionnaire = useSelector<any, boolean | null>(
    (state) => state.auth.questionnaire
  )
  const convertData = (dateString: Date | string): Date | string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  const [canChangeInput, setCanChangeInput] = React.useState(false)
  const [name, setName] = React.useState<string>(userData.name)
  const [birthday, setBirthday] = React.useState<Date | string>(
    convertData(userData.birthday)
  )
  const [hobby, setHobby] = React.useState<string>(userData.hobby)
  const [season, setSeason] = React.useState<string>(userData.season)
  const [flower, setFlower] = React.useState<string>(userData.flower)
  const [dish, setDish] = React.useState<string>(userData.dish)
  const [freeTime, setFreeTime] = React.useState<string>(userData.chillTime)
  const [film, setFilm] = React.useState<string>(userData.film)
  const [singer, setSinger] = React.useState<string>(userData.singer)
  const [color, setColor] = React.useState<string>(userData.color)
  const [characters, setCharacters] = React.useState<string>(
    userData.positiveTraits
  )
  const [dream, setDream] = React.useState<string>(userData.dream)
  const changeInput = (
    value: string,
    funct: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (canChangeInput) funct(value)
  }
  React.useEffect(() => {
    if (questionnaire === null) setLoading(true)
    else {
      setLoading(false)
      if (questionnaire) {
        setCanChangeInput(false)
      } else setCanChangeInput(true)
    }
  }, [questionnaire])
  const saveUserData = () => {
    setCanChangeInput(false)
    const data = {
      userId: 0,
      name,
      birthday,
      hobby,
      season,
      flower,
      dish,
      chillTime: freeTime,
      film,
      singer,
      color,
      positiveTraits: characters,
      dream,
    }
    JSON.stringify(data)
    dispatch(setAllFields(data))
    dispatch(setQuestionnaire(true))
    const fetchData = async () => {
      const token = Cookies.get('token')
      if (token) {
        try {
          const response = await axios.post(
            'https://catsandpies.ru/api/Questionnaire',
            { ...data },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
        } catch (error: any) {
          if(error.response.data.description === 'Анкета не добавлена. Анкета уже создана') {
            try{
              const response = await axios.put(
                'https://catsandpies.ru/api/Questionnaire',
                { ...data },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
            }catch(error){
              console.log(error)
            }
          }
          console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }
  return (
    <section className='person-wrapper'>
      <h2 className='person__top_name'>
        {canChangeInput ? 'Заполните анкету' : 'Ваши данные'}
      </h2>
      {!loading ? (
        <>
          <div className='person__main'>
            <h3>Основные</h3>
            <div className='person__about'>
              <span className='person_name'>
                Имя
                <input
                  value={name}
                  onChange={(e) => changeInput(e.target.value, setName)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span className='person_birthday'>
                Дата рождения:
                <input
                  value={birthday.toString()}
                  onChange={(e) => setBirthday(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='date'
                  readOnly={!canChangeInput}
                />
              </span>
            </div>
          </div>
          <div className='person__other'>
            <h3>Дополнительные</h3>
            <div className='person__other_inputs'>
              <span>
                Хобби:
                <input
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимый сезон:
                <input
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимый цветок:
                <input
                  value={flower}
                  onChange={(e) => setFlower(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимое блюдо:
                <input
                  value={dish}
                  onChange={(e) => setDish(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Время отдыха:
                <input
                  value={freeTime}
                  onChange={(e) => setFreeTime(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимый фильм:
                <input
                  value={film}
                  onChange={(e) => setFilm(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимый певец:
                <input
                  value={singer}
                  onChange={(e) => setSinger(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Любимый цвет:
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Позитивные черты:
                <input
                  value={characters}
                  onChange={(e) => setCharacters(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
              <span>
                Мечтаю о ...
                <input
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item'
                      : 'person__about_item blocked'
                  }
                  type='text'
                  readOnly={!canChangeInput}
                />
              </span>
            </div>
          </div>
          {canChangeInput ? (
            <div className='person_btn'>
              <div onClick={() => saveUserData()} className='button'>
                Сохранить
              </div>
            </div>
          ) : (
            <div className='person_btn'>
              <div onClick={() => setCanChangeInput(true)} className='button'>
                Изменить
              </div>
            </div>
          )}
        </>
      ) : (
        <h2 className='person__loading'>Загрузка данных...</h2>
      )}
    </section>
  )
}

export default Person
