import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../scss/FeaturedProducts.scss";
import toast from "react-hot-toast";

interface Image {
    id: number;
    price: number;
    image: string;
    title: string;
}

const FeaturedProducts: React.FC = () => {
    const fakeStoreApi = "https://fakestoreapi.com/products/";
    const [images, setImages] = useState<Image[]>([]);
    const [selectedImages, setSelectedImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchStoreImages = async () => {
            const { data } = await axios.get<Image[]>(fakeStoreApi);
            setImages(data);
        };

        fetchStoreImages();
    }, []);

    // Initialize Local Storage if not already set
    useEffect(() => {
        const storedImages = localStorage.getItem("cartData");
        if (!storedImages) {
            localStorage.setItem("cartData", JSON.stringify([]));
        }
    }, []);

    // Update Local Storage after selectedImages state changes
    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(selectedImages));
    }, [selectedImages]);

    // adding an image to the cart
    const handleAddtoCart = (image: Image) => {
        if (!selectedImages.includes(image)) {
            toast.success("Item added")
            setSelectedImages(prevImages => [...prevImages, image]);
        } else{
            toast.error("Already in the cart")
        }
    };

    return (
        <div className="featured" id="products">
            <div className="more">
                <h2>Featured Products</h2>
            </div>
            <div className="cards">
                {images.slice(0, 8).map((image) => (
                    <div key={image.id}>
                        <Card
                            text="Add to cart"
                            price={image.price}
                            image={image.image}
                            title={image.title}
                            handleAddToCart={() => handleAddtoCart(image)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;