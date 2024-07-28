import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log("Data received from backend:", data);
            if (response.ok) {
                setOrderData(data.orderData.order_data || []);
            } else {
                console.error("Failed to fetch orders", data.error);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                {orderData.length > 0 ? (
                    orderData.map((orderGroup, index) => (
                        <div key={index} className='w-100'>
                            {orderGroup[0]?.Order_date && (
                                <div className='m-auto mt-5'>
                                    <h4>{orderGroup[0].Order_date}</h4>
                                    <hr />
                                </div>
                            )}
                            <div className="d-flex flex-wrap">
                                {orderGroup.slice(1).map((item, subIndex) => (
                                    <div key={`${index}-${subIndex}`} className='p-2'>
                                        <div className="card" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "200px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container p-0'>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <span>Qty: {item.qty}</span>
                                                        </div>
                                                        <div className='col'>
                                                            <span>Size: {item.size}</span>
                                                        </div>
                                                        <div className='col'>
                                                            <span>Price: ₹{item.price}/-</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-center'>No Orders Found</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
