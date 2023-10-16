import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import "../scss/FeaturedProducts.scss";
import toast from "react-hot-toast";
import { useCart } from "../contexts/CartContext";

interface Image {
    id: number;
    price: number;
    image: string;
    title: string;
}

const FeaturedProducts: React.FC = () => {
    const fakeStoreApi = "https://fakestoreapi.com/products/";
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const fetchStoreImages = async () => {
            const { data } = await axios.get<Image[]>(fakeStoreApi);
            setImages(data);
        };

        fetchStoreImages();
    }, []);

    const { updateTotalItems } = useCart();

    // adding an image to the cart
    const handleAddToCart = (image: Image) => {
        const cartData = localStorage.getItem("cartData");
        const parsedData: Image[] = JSON.parse(cartData || "[]");

        // Checking if an image with the same id is already in the cart
        const isImageInCart = parsedData.some((item) => item.id === image.id);

        if (!isImageInCart) {
            const updatedData = [...parsedData, image];
            localStorage.setItem("cartData", JSON.stringify(updatedData));
            toast.success("Item added to cart");
            updateTotalItems(updatedData.length);
        } else {
            toast.error("Already in the cart");
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
                            handleAddToCart={() => handleAddToCart(image)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;
