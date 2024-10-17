import React from 'react'

import useRegisterLogic from '../components/hooks/registerLogic'
import useAuthLogic from '../components/hooks/authLogic'
import { messages } from '../components/hooks/authLogic'
import crossSvg from '../img/attention.svg'
import LoadGif from '../img/loader.gif'
import '../scss/Auth/form.scss'

const AuthPage: React.FC = () => {
  const [stateAuthErr, setStateAuthErr] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [authMess, setAuthMess] = React.useState<string>('')
  const [option, setOption] = React.useState<boolean>(false)
  const [login, setLogin] = React.useState<string>('')
  const [pass, setPass] = React.useState<string>('')
  const { entance } = useAuthLogic({
    login,
    pass,
    setLoading,
    setAuthMess,
    setStateAuthErr,
  })
  const { register, name, setName, repeatPass, setRepeatPass } =
    useRegisterLogic({ login, pass, setLoading, setAuthMess, setStateAuthErr })
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
        <form className='auth__body'>
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
              <button onClick={(e) => register(e)} className='form_btn'>
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
              <button onClick={(e) => entance(e)} className='form_btn'>
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
