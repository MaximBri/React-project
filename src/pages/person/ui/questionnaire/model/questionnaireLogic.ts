// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { getAllFields, getQuestionnaire, setQuestionnaire } from '@/app/store/slices/AuthSlice';
// import { deleteUserData } from '@/entities/user/data-management/deleteUserData';
// import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
// import { saveUserData } from '@/entities/user/data-management/saveUserData';
// import {
//   convertData,
//   convertDataToAPI,
// } from '@/entities/user/data-management/convertData';

// export const questionnaireLogic = ({
//   dispatch,
// }: {
//   dispatch: Dispatch<UnknownAction>;
// }) => {
//   const userData = useSelector(getAllFields);
//   let questionnaire = useSelector(getQuestionnaire);
//   const changeBirthday = (text: string) => {
//     text = text.replace(/\D/g, '');
//     if (text.length > 8) text = text.slice(0, 8);
//     if (text.length > 2) {
//       if (Number(text.slice(0, 2)) > 31) text = '';
//       text = text.slice(0, 2) + '.' + text.slice(2);
//     }
//     if (text.length > 5) {
//       if (Number(text.slice(3, 5)) > 12) text = text.slice(0, 3);
//       text = text.slice(0, 5) + '.' + text.slice(5);
//     }
//     if (text.length === 10) {
//       if (Number(text.slice(6, 10)) > Number(new Date().getFullYear()))
//         text = text.slice(0, 6);
//     }
//     setBirthday(text);
//   };
//   const [loading, setLoading] = useState<boolean>(false);
//   const [canChangeInput, setCanChangeInput] = useState(false);
//   const [name, setName] = useState<string>(userData.name);
//   const [birthday, setBirthday] = useState<string>(
//     convertData(userData.birthday)
//   );
//   const [hobby, setHobby] = useState<string>(userData.hobby);
//   const [season, setSeason] = useState<string>(userData.season);
//   const [flower, setFlower] = useState<string>(userData.flower);
//   const [dish, setDish] = useState<string>(userData.dish);
//   const [freeTime, setFreeTime] = useState<string>(userData.chillTime);
//   const [film, setFilm] = useState<string>(userData.film);
//   const [singer, setSinger] = useState<string>(userData.singer);
//   const [color, setColor] = useState<string>(userData.color);
//   const [characters, setCharacters] = useState<string>(userData.positiveTraits);
//   const [dream, setDream] = useState<string>(userData.dream);

//   useEffect(() => {
//     if (questionnaire === null) setLoading(true);
//     else {
//       setLoading(false);
//       if (questionnaire) {
//         setCanChangeInput(false);
//       } else setCanChangeInput(true);
//     }
//   }, [questionnaire]);
//   const saveUserDataProvider = () => {
//     saveUserData({
//       setCanChangeInput,
//       questionnaire,
//       name,
//       birthday: convertDataToAPI(birthday),
//       hobby,
//       season,
//       flower,
//       dish,
//       chillTime: freeTime,
//       film,
//       singer,
//       color,
//       positiveTraits: characters,
//       dream,
//       dispatch,
//     });
//   };
//   const clearUserData = async () => {
//     deleteUserData(dispatch);
//     dispatch(setQuestionnaire(false))
//     setName('');
//     setHobby('');
//     setFilm('');
//     setFlower('');
//     setSinger('');
//     setDish('');
//     setBirthday('01.01.2000');
//     setDream('');
//     setCharacters('');
//     setColor('');
//     setSeason('Зима');
//     setFreeTime('');
//   };
//   return {
//     canChangeInput,
//     loading,
//     saveUserDataProvider,
//     season,
//     setSeason,
//     dream,
//     setDream,
//     setCanChangeInput,
//     clearUserData,
//     other: {
//       name,
//       setName,
//       birthday,
//       changeBirthday,
//       hobby,
//       setHobby,
//       flower,
//       setFlower,
//       dish,
//       setDish,
//       freeTime,
//       setFreeTime,
//       film,
//       setFilm,
//       singer,
//       setSinger,
//       color,
//       setColor,
//       characters,
//       setCharacters,
//     },
//   };
// };
