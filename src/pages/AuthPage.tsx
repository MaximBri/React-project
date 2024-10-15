import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setAuth } from '../RTK/slices/AuthSlice'
import crossSvg from '../img/attention.svg'
import LoadGif from '../img/loader.gif'
import '../scss/Auth/form.scss'

const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [stateAuth, setStateAuth] = React.useState('unregistered')
  const [option, setOption] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>('')
  const [login, setLogin] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const setRegister = () => {
    setOption(false)
    setLogin('')
    setPass('')
    setStateAuth('')
  }
  const setLog = () => {
    setOption(true)
    setLogin('')
    setPass('')
    setStateAuth('')
  }
  const entrance = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const body = {
      login,
      password: pass,
    }
    try {
      setStateAuth('Loading')
      const response = await axios.post(
        'https://catsandpies.ru/api/Auth/Login',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      setStateAuth('Authorized')
      dispatch(setAuth(true))
      localStorage.setItem('token', response.data.data.token.token)
      navigate('/React-project')
    } catch (error: any) {
      setStateAuth('Error')
    }
  }
  const sendForm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (pass.length < 4) {
      alert('Пароль должен быть длиннее 4 символов')
    } else {
      const body = {
        name,
        login,
        password: pass,
      }
      try {
        setStateAuth('Loading')
        const response = await axios.post(
          'https://catsandpies.ru/api/Auth/Registration',
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        console.log(response)
        dispatch(setAuth(true))
        localStorage.setItem('token', response.data.data.token.token)
        setStateAuth('Authorized')
        navigate('/React-project')
      } catch (error: any) {
        console.log(error)
        if (!error.response.data.data) setStateAuth('Registered')
        else setStateAuth('Error')
      }
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
        {stateAuth === 'Loading' && (
          <>
            <div className='auth_loading'>
              <img src={LoadGif} alt='Загрузка'></img>
              <h2 className='auth_success_text'>Идёт отправка данных...</h2>
            </div>
          </>
        )}
        {stateAuth === 'Authorized' && (
          <div className='auth_success'>
            <h2 className='auth_success_text'>Регистрация прошла успешно</h2>
            <Link to='../' className='button'>
              На главную
            </Link>
          </div>
        )}
        {stateAuth === 'Error' && (
          <div className='auth_error'>
            <img src={crossSvg} alt='Ошибка' />
            <h2 className='auth_success_text'>
              Произошла ошибка. Повторите попытку позже
            </h2>
          </div>
        )}
        {stateAuth === 'Registered' && (
          <div className='auth_error'>
            <img src={crossSvg} alt='Ошибка' />
            <h2 className='auth_success_text'>
              Пользователь с таким логином уже существует
            </h2>
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
