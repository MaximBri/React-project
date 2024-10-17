import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

const Person = () => {
  const [name, setName] = React.useState<string>('')

  const nameRef = React.useRef<HTMLInputElement>(null)
  const birthdayRef = React.useRef<HTMLInputElement>(null)
  const hobbyRef = React.useRef<HTMLInputElement>(null)
  const seasonRef = React.useRef<HTMLInputElement>(null)
  const flowerRef = React.useRef<HTMLInputElement>(null)
  const dishRef = React.useRef<HTMLInputElement>(null)
  const freeTimeRef = React.useRef<HTMLInputElement>(null)
  const filmRef = React.useRef<HTMLInputElement>(null)
  const singerRef = React.useRef<HTMLInputElement>(null)
  const colorRef = React.useRef<HTMLInputElement>(null)
  const charactersRef = React.useRef<HTMLInputElement>(null)
  const dreamsRef = React.useRef<HTMLInputElement>(null)
  const saveUserData = () => {
    const data = {
      userId: 0,
      name,
      // birthday: new Date(),
      birthday: birthdayRef.current?.value,
      hobby: hobbyRef.current?.value,
      season: seasonRef.current?.value,
      flower: flowerRef.current?.value,
      dish: dishRef.current?.value,
      chillTime: freeTimeRef.current?.value,
      film: filmRef.current?.value,
      singer: singerRef.current?.value,
      color: colorRef.current?.value,
      positiveTraits: charactersRef.current?.value,
      dream: dreamsRef.current?.value,
    }
    JSON.stringify(data)
    console.log({ ...data })
    const fetchData = async () => {
      const token = Cookies.get('token')
      console.log(token)
      if (token) {
        try {
          // отправка анкеты (1 раз на акк)
          // const response = await axios.post(
          //   'https://catsandpies.ru/api/Questionnaire',
          //   { ...data },
          //   {
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // )

          // const response = await axios.get(
          //   'https://catsandpies.ru/api/Questionnaire/GetUserQuestionnaire',
          //   {
          //     headers: {
          //       'Content-Type': 'application/json',
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // )

          //  получение анкеты
          const response = await axios.get(
            'https://catsandpies.ru/api/Questionnaire/GetMyQuestionnaire',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )
          console.log(response)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }
    fetchData()
  }
  return (
    <section className='person-wrapper'>
      <h2 className='person__top_name'>Заполнить анкету можно только один раз</h2>
      <div className='person__main'>
        <h3>Основные</h3>
        <div className='person__about'>
          <span className='person_name'>
            Имя
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='person__about_item'
              type='text'
            />
          </span>
          <span className='person_birthday'>
            Дата рождения:
            <input
              ref={birthdayRef}
              className='person__about_item'
              type='date'
            />
          </span>
        </div>
      </div>
      <div className='person__other'>
        <h3>Дополнительные</h3>
        <div className='person__other_inputs'>
          <span>
            Хобби:
            <input ref={hobbyRef} className='person__about_item' type='text' />
          </span>
          <span>
            Любимый сезон:
            <input ref={seasonRef} className='person__about_item' type='text' />
          </span>
          <span>
            Любимый цветок:
            <input ref={flowerRef} className='person__about_item' type='text' />
          </span>
          <span>
            Любимое блюдо:
            <input ref={dishRef} className='person__about_item' type='text' />
          </span>
          <span>
            Время отдыха:
            <input
              ref={freeTimeRef}
              className='person__about_item'
              type='text'
            />
          </span>
          <span>
            Любимый фильм:
            <input ref={filmRef} className='person__about_item' type='text' />
          </span>
          <span>
            Любимый певец:
            <input ref={singerRef} className='person__about_item' type='text' />
          </span>
          <span>
            Любимый цвет:
            <input ref={colorRef} className='person__about_item' type='text' />
          </span>
          <span>
            Позитивные черты:
            <input
              ref={charactersRef}
              className='person__about_item'
              type='text'
            />
          </span>
          <span>
            Мечтаю о ...
            <input ref={dreamsRef} className='person__about_item' type='text' />
          </span>
        </div>
      </div>
      <div className='person_btn'>
        <div onClick={() => saveUserData()} className='button'>
          Сохранить
        </div>
      </div>
    </section>
  )
}

export default Person
