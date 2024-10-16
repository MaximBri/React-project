import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setAuth } from '../RTK/slices/AuthSlice'
import crossSvg from '../img/attention.svg'
import LoadGif from '../img/loader.gif'
import '../scss/Auth/form.scss'

const AuthPage: React.FC = () => {
  const messages: string[] = [
    'Авторизация прошла успешно',
    'Отправка данных...',
    'Неверный логин или пароль',
    'Пользователь с таким логином уже существует',
    'Произошла ошибка. Повторите попытку позже :(',
    'Пароль должен быть длиннее 4 символов',
    'Пароли не совпадают!',
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [stateAuthErr, setStateAuthErr] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [authMess, setAuthMess] = React.useState<string>('')
  const [option, setOption] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const [repeatPass, setRepeatPass] = React.useState<string>('')
  const setRegister = () => {
    setOption(false)
    setLogin('')
    setPass('')
    setStateAuthErr('')
  }
  const setLog = () => {
    setOption(true)
    setLogin('')
    setPass('')
    setStateAuthErr('')
  }
  const entrance = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const body = {
      login,
      password: pass,
    }
    try {
      setLoading(true)
      setStateAuthErr('')
      const response = await axios.post(
        'https://catsandpies.ru/api/Auth/Login',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      // console.log(response)
      setAuthMess(messages[0])
      dispatch(setAuth(true))
      localStorage.setItem('token', response.data.data.token.token)
      navigate('/React-project')
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 404) setStateAuthErr(messages[4])
      else setStateAuthErr(messages[2])
    }
    setLoading(false)
  }
  const sendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (pass.length < 4) {
      setStateAuthErr(messages[5])
    } else if (pass !== repeatPass) {
      setStateAuthErr(messages[6])
    } else {
      const body = {
        name,
        login,
        password: pass,
      }
      try {
        setStateAuthErr('')
        setLoading(true)
        const response = await axios.post(
          'https://catsandpies.ru/api/Auth/Registration',
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        // console.log(response)
        dispatch(setAuth(true))
        localStorage.setItem('token', response.data.data.token.token)
        setAuthMess(messages[0])
        navigate('/React-project')
      } catch (error: any) {
        console.log(error)
        if (error.response.status === 409) setStateAuthErr(messages[3])
        else setStateAuthErr(messages[4])
      }
      setLoading(false)
    }
  }
  return (
    <>
      <div className='auth'>
        <div className='auth_switch'>
          <div
            onClick={() => setRegister()}
            className={!option ? 'auth_authoriz active-right' : 'auth_authoriz'}
          >
            Зарегистрироваться
          </div>
          <div
            onClick={() => setLog()}
            className={option ? 'auth_login active-left' : 'auth_login'}
          >
            Войти
          </div>
        </div>
        {loading && (
          <div className='auth_loading'>
            <img src={LoadGif} alt='loading...' />
            <h2 className='auth_success_text'>{messages[1]}</h2>
          </div>
        )}
        {authMess && (
          <div className='auth_success'>
            <h2 className='auth_success_text'>{authMess}</h2>
          </div>
        )}
        {stateAuthErr && (
          <div className='auth_error'>
            <img src={crossSvg} alt='Ошибка' />
            <h2 className='auth_success_text'>{stateAuthErr}</h2>
          </div>
        )}
        <form action='#' className='auth__body'>
          {!option && (
            <>
              <h2 className='auth_title'>Заполните все поля для регистрации</h2>
              <div className='auth__container'>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type='text'
                  className='auth_input'
                  placeholder='Имя'
                  required
                />
                <input
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  type='text'
                  className='auth_input'
                  placeholder='Логин'
                  required
                />
                <input
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  type='password'
                  className='auth_input'
                  placeholder='Пароль'
                  autoComplete='current-password'
                  required
                />
                <input
                  onChange={(e) => setRepeatPass(e.target.value)}
                  value={repeatPass}
                  type='password'
                  className='auth_input'
                  placeholder='Повторите пароль'
                  autoComplete='current-password'
                  required
                />
              </div>
              <button onClick={(e) => sendForm(e)} className='form_btn'>
                Зарегистрироваться
              </button>
            </>
          )}
          {option && (
            <>
              <h2 className='auth_title'>Введите логин и пароль для входа</h2>
              <div className='auth__container'>
                <input
                  onChange={(e) => setLogin(e.target.value)}
                  value={login}
                  type='text'
                  className='auth_input'
                  placeholder='Логин'
                  required
                />
                <input
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  type='password'
                  className='auth_input'
                  placeholder='Пароль'
                  autoComplete='current-password'
                  required
                />
              </div>
              <button onClick={(e) => entrance(e)} className='form_btn'>
                Войти
              </button>
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default AuthPage
