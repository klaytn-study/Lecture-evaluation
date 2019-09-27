import React from 'react';

const Emoji = ({ label, symbol }) => {
  <sapn
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </sapn>
};

export default Emoji;
