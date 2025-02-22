import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // Handle empty cart scenario
  if (!data || data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.ok) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Failed to place order. Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred during checkout:", error);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
      <table className='table  text-white'>
        <thead className='text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Option</th>
            <th scope='col'>Amount</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button type="button" className="btn p-0 text-danger">
                  <Delete onClick={() => dispatch({ type: "REMOVE", index })} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1>
      </div>
      <div>
        <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
