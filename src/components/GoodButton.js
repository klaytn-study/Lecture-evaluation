import React from 'react'
import cx from 'classnames'

import './GoodButton.scss'

const GoodButton = ({
  className,
  title,
  onClick,
  icon,
}) => {
  const iconStyle = {
    paddingLeft: '18px',
    background: `left / 12px no-repeat url('/images/${icon}')`,
  }

  return (
    <button
      className={cx('GoodButton', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={icon && iconStyle}>
        {title}
      </span>
    </button>
  )
}


export default GoodButton
