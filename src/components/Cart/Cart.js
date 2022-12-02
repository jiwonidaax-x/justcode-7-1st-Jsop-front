import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Cart.module.scss';
import EmptyCart from './EmptyCart';
import ExistCart from './ExistCart';

const Cart = ({ closeCartModal }) => {
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/cart`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => setCartItem(data.data));
  }, [cartItem]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  const totalPrice = cartItem.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  const handleQuantity = (id, quantity) => {
    setCartItem(items => {
      return items.map(item => {
        if (item.id === id) item.quantity = quantity;
        return item;
      });
    });
  };

  const goToCheckOut = () => {
    navigate('/checkout');
  };

  return (
    <div className={css.cartComponent}>
      {cartItem.length > 0 ? (
        <ExistCart
          totalPrice={totalPrice}
          handleQuantity={handleQuantity}
          cartItem={cartItem}
          setCartItem={setCartItem}
          goToCheckOut={goToCheckOut}
          closeCartModal={closeCartModal}
        />
      ) : (
        <EmptyCart closeCartModal={closeCartModal} />
      )}
    </div>
  );
};

export default Cart;
