import React from 'react'

//INTERNAL IMPORT
import Style from './Swap.module.css'
const Swap = ({label}) => {
  return (
    <div className={Style.Swap}>
      <div className={Style.Swap_change_wrap}>
        <input type='checkbox' className={Style.Swap_checkbox} name={label} id={label}/>
        <label className={Style.Swap_label} htmlFor={label}>
          <span className={Style.Swap_inner}/>
          <span className={Style.Swap_change}/>
        </label>
      </div>
    </div>
  )
}

export default Swap