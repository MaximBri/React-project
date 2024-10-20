import React from 'react'

const Field = React.memo(
  ({
    title,
    value,
    setValue,
    canChangeInput,
    main,
    placeholder,
  }: FieldEtranceData) => {
    return (
      <span className={main ? 'person_name' : ''}>
        {title}:
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={
            canChangeInput ? 'person__about_item' : 'person__about_item blocked'
          }
          type='text'
          placeholder={placeholder}
          readOnly={!canChangeInput}
        />
      </span>
    )
  }
)

export default Field
