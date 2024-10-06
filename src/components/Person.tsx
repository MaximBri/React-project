import React from 'react'

const Person = () => {
  return (
    <div className='person-wrapper'>
      <h2 className='person_title'>Имя</h2>
      <div className='person__main'>Основные
        <span className='person_name'>Имя</span>
        <span className='person_birthday'>01.01.2005</span>
      </div>
      <div className='person_other'>Дополнительные
        <span>Хобби: </span>
        <span>Любимое блюдо: </span>
        <span>Время отдыха: </span>
        <span>Любимый фильм: </span>
        <span>Любимый певец: </span>
        <span>Любимый цвет: </span>
        <span>Позитивные черты: </span>
        <span>Мечтаю о ...</span>
      </div>
      <span className='button'>Сохранить</span>
    </div>
  )
}

export default Person
