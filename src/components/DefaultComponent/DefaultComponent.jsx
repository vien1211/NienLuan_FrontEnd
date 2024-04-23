import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import NavComponent  from "../NavCompoent/NavComponent";

const DefaultComponent = ({children}) => {
  return (
    <div>
        <HeaderComponent />
        <NavComponent />
        {children}
    </div>
  )
}

export default DefaultComponent