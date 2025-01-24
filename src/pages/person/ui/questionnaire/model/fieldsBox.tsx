import { ReactElement } from 'react';

import { FieldEtranceData } from '@/shared/types';
import { Field } from '@/features/questionnaire';

export const fieldsBox = (fieldsProps: any, canChangeInput: boolean) => {
  let key = 0;

  const {
    name,
    setName,
    birthday,
    changeBirthday,
    hobby,
    setHobby,
    flower,
    setFlower,
    dish,
    setDish,
    freeTime,
    setFreeTime,
    film,
    setFilm,
    singer,
    setSinger,
    color,
    setColor,
    characters,
    setCharacters,
  } = { ...fieldsProps };

  const mainFields: ReactElement<FieldEtranceData>[] = [
    <Field
      title="Имя"
      value={name}
      setValue={setName}
      canChangeInput={canChangeInput}
      main={true}
      key={key++}
    />,
    <Field
      title="Дата рождения"
      value={birthday}
      setValue={changeBirthday}
      canChangeInput={canChangeInput}
      main={true}
      placeholder="ДД.ММ.ГГГГ"
      key={key++}
    />,
  ];
  const fields: ReactElement<FieldEtranceData>[] = [
    <Field
      title="Хобби"
      value={hobby}
      setValue={setHobby}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Любимый цветок"
      value={flower}
      setValue={setFlower}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Любимое блюдо"
      value={dish}
      setValue={setDish}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Время отдыха"
      value={freeTime}
      setValue={setFreeTime}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Любимый фильм"
      value={film}
      setValue={setFilm}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Любимый певец"
      value={singer}
      setValue={setSinger}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Любимый цвет"
      value={color}
      setValue={setColor}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
    <Field
      title="Позитивные черты"
      value={characters}
      setValue={setCharacters}
      canChangeInput={canChangeInput}
      main={false}
      key={key++}
    />,
  ];
  return { mainFields, fields };
};
