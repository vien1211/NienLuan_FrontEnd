import { Button } from 'antd'
import React from 'react'

const ButtonComponent = ({ size, styleButton, styleTextButton, textbutton, disabled, hoverStyle, ...rests }) => {
  const handleMouseEnter = (e) => {
    if (hoverStyle) {
      e.target.style.background = hoverStyle.background;
    }
  };

  const handleMouseLeave = (e) => {
    if (styleButton) {
      e.target.style.background = styleButton.background;
    }
  };

  return (
    <Button
      style={{
        marginLeft: "10px",
        borderRadius: "10px",
        ...styleButton,
      }}
      size={size}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  )
}

export default ButtonComponent
