import React from 'react'
import cx from 'classnames'

const InputStar = ({
  className,
  name,
  label,
  value,
  onChange,
}) => (
  <div className={cx('InputStar', className)}>
    <label className="Input__label" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="number"
      min="1"
      max="5"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </div>
)


export default InputStar

