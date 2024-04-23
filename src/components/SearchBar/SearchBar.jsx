
import React from 'react'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const SearchBar = (props) => {
  const {
    size, placeholder, textbutton,
    bordered, variant,
    //backgroundColorButton = 'rgb(13, 92, 182)',
    colorButton = '#fff'
  } = props

  return (
    <div style={{ display: 'flex', justifyContent: "center" }}>
      <div>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        
        {...props}
      />
      </div>

      <div style={{ marginLeft: "8px" }}>
      <ButtonComponent
        size={size}
        //styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
        variant={variant}
        textbutton={textbutton}
        bordered={false}
        styleTextButton={{ color: colorButton }}
        
      />
      </div>
    </div>
  )
}

// // export default ButttonInputSearch

// import React from "react";

// import InputComponent from "../InputComponent/InputComponent";
// import ButtonComponent from "../ButtonComponent/ButtonComponent";

// function SearchBar(props) {
//   const { size, placeholder, ariaLabel, variant, textButton } = props;

//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div>
//         <InputComponent
//           type="search"
//           placeholder={placeholder}
//           aria-label={ariaLabel}
//           size={size}
//         />
//       </div>

//       <div style={{ marginLeft: "8px" }}>
//         <ButtonComponent
//           size={size}
//           variant={variant}
//           textButton={textButton}
//         />
//       </div>
//     </div>
//   );
// }

export default SearchBar;
