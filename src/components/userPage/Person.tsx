import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'

import Field from './Field'
import {
  getAllFields,
  setAllFields,
  setQuestionnaire,
} from '../../RTK/slices/AuthSlice'
import FieldWithSelects from './FieldWithSelects'

const Person = () => {
  const dispatch = useDispatch()
  const userData = useSelector<any, UserDataInterface>(getAllFields)
  let questionnaire = useSelector<any, boolean | null>(
    (state) => state.auth.questionnaire
  )
  const convertData = (dateString: Date | string): string => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }
  const convertDataToAPI = (dateString: string | Date): Date | string => {
    dateString = dateString.toString()
    let date = dateString.split('.')[2]
    date += '-'
    date += dateString.split('.')[1]
    date += '-'
    date += dateString.split('.')[0]
    return date
  }
  const changeBirthday = (text: string) => {
    text = text.replace(/\D/g, '')
    if (text.length > 8) text = text.slice(0, 8)
    if (text.length > 2) {
      if (Number(text.slice(0, 2)) > 31) text = ''
      text = text.slice(0, 2) + '.' + text.slice(2)
    }
    if (text.length > 5) {
      if (Number(text.slice(3, 5)) > 12) text = text.slice(0, 3)
      text = text.slice(0, 5) + '.' + text.slice(5)
    }
    if (text.length === 10) {
      if (Number(text.slice(6, 10)) > Number(new Date().getFullYear()))
        text = text.slice(0, 6)
    }
    setBirthday(text)
  }
  const [loading, setLoading] = React.useState<boolean>(false)
  const [canChangeInput, setCanChangeInput] = React.useState(false)
  const [name, setName] = React.useState<string>(userData.name)
  const [birthday, setBirthday] = React.useState<string>(
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
  let key = 0
  const mainFields: React.ReactElement<FieldEtranceData>[] = [
    <Field
      title='Имя'
      value={name}
      setValue={setName}
      canChangeInput={canChangeInput}
      main={true}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Дата рождения'
      value={birthday}
      setValue={changeBirthday}
      canChangeInput={canChangeInput}
      main={true}
      placeholder='ДД.ММ.ГГГГ'
      key={key++}
    />,
  ]
  const fields: React.ReactElement<FieldEtranceData>[] = [
    <Field
      title='Хобби'
      value={hobby}
      setValue={setHobby}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Любимый цветок'
      value={flower}
      setValue={setFlower}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Любимое блюдо'
      value={dish}
      setValue={setDish}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Время отдыха'
      value={freeTime}
      setValue={setFreeTime}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Любимый фильм'
      value={film}
      setValue={setFilm}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Любимый певец'
      value={singer}
      setValue={setSinger}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Любимый цвет'
      value={color}
      setValue={setColor}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
    <Field
      title='Позитивные черты'
      value={characters}
      setValue={setCharacters}
      canChangeInput={canChangeInput}
      main={false}
      placeholder=''
      key={key++}
    />,
  ]
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
      birthday: convertDataToAPI(birthday),
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
          if (
            error.response.data.description ===
            'Анкета не добавлена. Анкета уже создана'
          ) {
            try {
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
            } catch (error) {
              console.log(error)
            }
          }
          console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }
  const deleteUserData = async () => {
    const token = Cookies.get('token')
    dispatch(setAllFields({
      name: '',
      birthday: convertDataToAPI(birthday),
      hobby: '',
      season: '',
      flower: '',
      dish: '',
      chillTime: '',
      film: '',
      singer: '',
      color: '',
      positiveTraits: '',
      dream: '',
    }))
    setName('')
    setHobby('')
    setFilm('')
    setFlower('')
    setSinger('')
    setDish('')
    setBirthday('01.01.2000')
    setDream('')
    setCharacters('')
    setColor('')
    setSeason('')
    setFreeTime('')
    if (token) {
      try {
        const response = await axios.delete(
          'https://catsandpies.ru/api/Questionnaire',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response)
      } catch (error: any) {
        console.error('Error fetching data:', error)
      }
    }
  }
  return (
    <section className='person-wrapper'>
      <h2 className='person__top_name'>
        {canChangeInput ? 'Заполните анкету' : 'Ваши данные'}
      </h2>
      {!loading ? (
        <>
          <section className='person__main'>
            <h3>Основные</h3>
            <div className='person__about'>
              {mainFields.map((item) => {
                return React.cloneElement(item, { key: item.props.title })
              })}
            </div>
          </section>
          <section className='person__other'>
            <h3>Дополнительные</h3>
            <div className='person__other_inputs'>
              {fields.map((item) => {
                return React.cloneElement(item, { key: item.props.title })
              })}
              <FieldWithSelects
                title='Любимый сезон'
                value={season}
                setValue={setSeason}
                canChangeInput={canChangeInput}
                placeholder=''
                variants={['Зима', 'Весна', 'Лето', 'Осень']}
              />
              <span>
                Мечтаю о ...
                <textarea
                  value={dream}
                  onChange={(e) => setDream(e.target.value)}
                  className={
                    canChangeInput
                      ? 'person__about_item-textarea'
                      : 'person__about_item-textarea blocked'
                  }
                  readOnly={!canChangeInput}
                />
              </span>
            </div>
          </section>
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
              <div
                onClick={() => deleteUserData()}
                className='person_btn-delete'
              >
                Удалить анкету
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
