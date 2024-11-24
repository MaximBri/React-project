import Cookies from 'js-cookie'

import { setCatData } from '../../RTK/slices/CatSlice'

export const CatLogic = (catInfo: any, dispatch: any) => {
  if (catInfo) {
    const catData: catInterface = {
      existed: true,
      data: {
        name: catInfo.name,
        description: catInfo.personality.description,
        role: catInfo.personality.name,
        phrase: catInfo.phrase,
        color: catInfo.color.name,
      },
    }
    dispatch(setCatData(catData))
    Cookies.set('cat', JSON.stringify(catData))
  } else {
    dispatch(
      setCatData({
        existed: false,
        data: {
          phrase: '',
          name: '',
          role: '',
          color: '',
          description: '',
        },
      })
    )
    Cookies.set('cat', '')
  }
}
