import React, { useEffect, useState } from 'react';
import { Image } from '../interfaces/Image';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useCart } from '../contexts/CartContext';
import '../scss/CartPage.scss';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
    const { totalItems, updateTotalItems } = useCart();

    const storedData = localStorage.getItem('cartData');
    const parsedData: Image[] = JSON.parse(storedData || '[]');
    const [data, setData] = useState(parsedData);

    useEffect(() => {
        localStorage.setItem('cartData', JSON.stringify(data));
        updateTotalItems(parsedData.length);
    }, [data, updateTotalItems]);

    const handleDelete = (item: any) => {
        setData(data.filter((d) => d.id !== item.id));
        toast.success('Item deleted successfully');
    };

    return (
        <div className="all">
            <NavBar />
            <div className="total">
                <p>Total Items in Cart: {totalItems}</p>
            </div>
            <div className="cart-cards">
                {data.map((item) => (
                    <Card
                        key={item.id}
                        text="Delete"
                        handleAddToCart={() => handleDelete(item)}
                        image={item.image}
                        price={item.price}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
    );
};

export default CartPage;
