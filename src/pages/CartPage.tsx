import React, { useEffect, useState } from 'react';
import { Image } from '../interfaces/Image';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useCart } from '../contexts/CartContext';
import '../scss/CartPage.scss';
import toast from 'react-hot-toast';
import { useTotalPrice } from '../contexts/TotalPriceContext';

const CartPage: React.FC = () => {
    const { totalItems, updateTotalItems } = useCart();
    const { totalPrice, updateTotalPrice } = useTotalPrice();
    const storedData = localStorage.getItem('cartData');
    const parsedData: Image[] = JSON.parse(storedData || '[]');
    const [data, setData] = useState(parsedData);
    const price = data.reduce((accumulator, product) => accumulator + product.price, 0);
    useEffect(() => {
        localStorage.setItem("price", JSON.stringify(price))
        updateTotalPrice(price)
        console.log(price);
    }, [data])

    const handleDelete = (item: any) => {
        localStorage.setItem('cartData', JSON.stringify(data.filter((d) => d.id !== item.id)));
        updateTotalItems(parsedData.length);
        setData(data.filter((d) => d.id !== item.id));
        toast.success('Item deleted successfully');
        updateTotalItems(data.length - 1)
    };

    return (
        <div className="all">
            <NavBar />
            <div className="total">
                <p>Total Items: {totalItems}</p>
                <p>Total price: {totalPrice.toFixed(2)}</p>
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
