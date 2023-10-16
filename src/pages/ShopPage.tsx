import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image } from '../interfaces/Image';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import { useCart } from '../contexts/CartContext'; 
import '../scss/ShopPage.scss';
import toast from 'react-hot-toast';

const ShopPage: React.FC = () => {
    const { updateTotalItems } = useCart();
    const [images, setImages] = useState<Image[]>([]);

    const fetchProductsByCategory = async (category: string) => {
        try {
            let response;
            if (category === 'all') {
                // Fetch all products
                response = await axios.get<Image[]>('https://fakestoreapi.com/products/');
            } else {
                // Fetch products by category
                response = await axios.get<Image[]>(`https://fakestoreapi.com/products/category/${category}`);
            }

            setImages(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        // Fetch all products by default
        fetchProductsByCategory('all');
    }, []);

    const handleAddToCart = (item: Image) => {
        const cartData = localStorage.getItem('cartData');
        const parsedData: Image[] = JSON.parse(cartData || '[]');

        //checking if the item is already in or not
        const isImageInCart = parsedData.some((newItem) => newItem.id === item.id)
        if (!isImageInCart) {
            const updatedData = [...parsedData, item];
            localStorage.setItem('cartData', JSON.stringify(updatedData));
            updateTotalItems(updatedData.length);
            toast.success('Item added to cart');
        } else {
            toast.error("Already in the cart")
        }
    };

    return (
        <div>
            <NavBar />
            <div className='all'>
                <div className='filter'>
                    <h1>Products</h1>
                    <div className='buttons'>
                        <button onClick={() => fetchProductsByCategory('all')}>All Products</button>
                        <button onClick={() => fetchProductsByCategory('electronics')}>Electronics</button>
                        <button onClick={() => fetchProductsByCategory('jewelery')}>Jewelery</button>
                        <button onClick={() => fetchProductsByCategory("men's clothing")}>Men's clothing</button>
                        <button onClick={() => fetchProductsByCategory("women's clothing")}>Women's clothing</button>
                    </div>
                </div>
                <div className='cards'>
                    {images.map((product) => (
                        <Card
                            key={product.id}
                            handleAddToCart={() => handleAddToCart(product)}
                            image={product.image}
                            price={product.price}
                            text='Add to cart'
                            title={product.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
