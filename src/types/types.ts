interface UserDataInterface {
  name: string
  email?: string | null
  birthday: Date | string
  hobby: string
  season: string
  flower: string
  dish: string
  chillTime: string
  film: string
  singer: string
  color: string
  positiveTraits: string
  dream: string
}

interface FieldEtranceData {
  title: string
  value: string
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((text: string) => void)
  canChangeInput: boolean
  main: boolean
  placeholder: string
}

interface AuthProps {
  data: {
    auth: React.Dispatch<React.SetStateAction<boolean>>
    reg: React.Dispatch<React.SetStateAction<boolean>>
  }
}

interface catInterface {
  existed: boolean 
  data: catDataInterface
}

interface catDataInterface {
  name: string | null
  description: string | null
  role: string | null
  phrase: string | null
  color: string | null
}

interface NotificationIntreface{
  message: string,
  statusCode: number
}

interface messageInterface {
  dispatch: any
  message: string
  statusCode: number
}