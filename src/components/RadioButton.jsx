import React from 'react'

const RadioButton = ({id, text, name, onChange, checked, value}) => {
  return (
    <label htmlFor={id} className='flex items-center gap-1 text-sm'>
        <input
            type='radio'
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            checked={checked}
        />
        <span className='custom-radio-btn'></span>
        {text}
    </label>
  )
}

export default RadioButton