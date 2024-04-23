import { Input } from 'antd'
import React from 'react'

const InputComponent = ({ size, placeholder, bordered, style, ...rests }) => {
  const inputStyle = {
    ...style
  };

  return (
    <Input 
        size={size}
        placeholder={placeholder} 
        bordered={bordered} 
        style={inputStyle}
        {...rests} 
    />
  );
};

export default InputComponent;
