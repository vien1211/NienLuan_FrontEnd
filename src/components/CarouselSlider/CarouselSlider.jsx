import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import {StyledCarousel, StyledCarouselItem, StyledCarouselControl} from "./style";
const CarouselSlider = ({ images }) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Container>
        <StyledCarousel activeIndex={index} onSelect={handleSelect}>
            {images.map((image, idx) => (
                <StyledCarouselItem key={idx}>
                    <img
                        className="d-block w-100"
                        src={image}
                        alt={`Slide ${idx}`}
                    />
                </StyledCarouselItem>
            ))}
        </StyledCarousel>
        <StyledCarouselControl />
        
        </Container>
    );
}

export default CarouselSlider;


