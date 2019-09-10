import React from 'react'
import cx from 'classnames'

const DropdownBtn = ({
  className,
  name,
  label,
  value,
  item,
  onChange,
}) => (
  <div className={cx('DropdownBtn', className)}>
    <label className="Input__label" htmlFor={name}>
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
    >
      {
        item.map(({ optValue, optLabel }) => (
          <option key={optValue} value={optValue}>{optLabel}</option>
        ))
      }
    </select>
  </div>
)


export default DropdownBtn

