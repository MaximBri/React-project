import React from 'react'

interface FieldWithSelectsEtranceData {
  title: string
  value: string
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((text: string) => void)
  canChangeInput: boolean
  placeholder: string
  variants: string[]
}

const FieldWithSelects = React.memo(
  ({
    title,
    value,
    setValue,
    canChangeInput,
    placeholder,
    variants,
  }: FieldWithSelectsEtranceData) => {
    const [open, setOpen] = React.useState<boolean>(false)
    const clickOnVariant = (text: string) => {
      setOpen(!open)
      setValue(text)
    }
    const canOpen = () => {
      if (canChangeInput) setOpen(!open)
    }
    return (
      <span className=''>
        {title}:
        <span
          onClick={() => canOpen()}
          className={canChangeInput ? 'field' : 'field blocked'}
        >
          {value}
          {open && (
            <div className='field_variants'>
              {variants.map((item, i) => {
                if (item !== value)
                  return (
                    <span
                      className='field_variant'
                      onClick={() => clickOnVariant(item)}
                      key={i}
                    >
                      {item}
                    </span>
                  )
              })}
            </div>
          )}
        </span>
      </span>
    )
  }
)

export default FieldWithSelects
