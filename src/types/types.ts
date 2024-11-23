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
