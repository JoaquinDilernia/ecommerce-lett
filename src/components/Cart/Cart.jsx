import React from 'react'
import Brief from '../Brief/Brief'
import './Cart.css'


const Cart = ({isOpen, closeModal }) => {

  const handleModalClick = (e) => {
    e.stopPropagation()
  }
  return (
    <div className={`modal ${isOpen && 'modal-open' }`} onClick={closeModal}>
      <div className='modal-full' onClick={handleModalClick}>
        <div className='close-modal'>
          <button className='btn-cerrar' onClick={closeModal}>X</button>
        </div>
     <Brief />

     <div className='footer-modal'>
     <button className='btn-cerrar' onClick={closeModal}> Ver Carrito</button>
     </div>
    </div>
    </div>
  )
}

export default Cart