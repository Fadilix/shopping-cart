import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Image } from '../interfaces/Image';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import '../scss/ShopPage.scss';

const ShopPage: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);

    const fetchProductsByCategory = async (category: string) => {
        if (category === 'all') {
            // Fetch all products
            const { data } = await axios.get<Image[]>('https://fakestoreapi.com/products/');
            setImages(data);
        } else {
            // Fetch products by category
            const { data } = await axios.get<Image[]>(`https://fakestoreapi.com/products/category/${category}`);
            setImages(data);
        }
    };

    useEffect(() => {
        // Fetch all products by default
        fetchProductsByCategory('all');
    }, []);

    const handleAddToCart = () => {
        // Implement your add to cart logic here
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
                            handleAddToCart={handleAddToCart}
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
