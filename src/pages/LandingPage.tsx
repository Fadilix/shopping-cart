import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import FeaturedProducts from '../components/FeaturedProducts';
import lp2 from "../assets/lp2.jpg";
import "../scss/LandingPage.scss";
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const parallaxOffset = scrollPosition * 0.5;
    const zoomScale = 1 + scrollPosition * 0.001;

    return (
        <div>
            <NavBar />
            <section
                id='home'
                className='landing-image'
            >
                <img
                    className='random-image'
                    src={lp2}
                    alt="Landing Page Image"
                    style={{ transform: `scale(${zoomScale})` }}
                />
                <div className='text'
                    style={{
                        transform: `translateY(-${parallaxOffset}px)`,
                    }}
                >
                    <h1>
                        Warm Styles, Cool prices.
                    </h1>
                    <p>Step into a world of timeless elegance and curated treasures. In this emporium of dreams, each item has a story to tell, a whisper of craftsmanship and a touch of history. Let your journey through our shop be a delightful adventure, where every purchase is a chapter added to your own story</p>
                    <button><Link to="/shop"> Shop Now</Link></button>
                </div>
            </section>
            <div>
                {/* @ts-ignore */}
                <marquee scrollamount="20" direction="left">Let's make it happen</marquee>
            </div>

            <FeaturedProducts />
            <Footer />
        </div>
    );
}

export default LandingPage;
