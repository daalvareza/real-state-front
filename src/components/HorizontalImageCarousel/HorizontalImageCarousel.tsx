import { useState, useEffect, useRef } from 'react';
import house1 from '../../assets/images/house1.jpg';
import house2 from '../../assets/images/house2.jpeg';
import house3 from '../../assets/images/house3.png';
import interior1 from '../../assets/images/interior1.jpeg';
import interior2 from '../../assets/images/interior2.jpg';
import interior3 from '../../assets/images/interior3.jpg';
import { Slide, SlideImage, SlideshowContainer, SlideshowWrapper } from './HorizontalImageCarousel.styled';

const HorizontalImageCarousel = () => {
  const images = [house1, interior1, house2, interior2, house3, interior3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Automatic slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Translate slideshow wrapper
  useEffect(() => {
    if (slideshowRef.current) {
      slideshowRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <SlideshowContainer>
      <SlideshowWrapper ref={slideshowRef} data-testid="slideshow-wrapper">
        {images.map((src, index) => (
          <Slide key={index}>
            <SlideImage
              src={src}
              loading="lazy"
              alt={`slide ${index + 1}`}
            />
          </Slide>
        ))}
      </SlideshowWrapper>
    </SlideshowContainer>
  );
};

export default HorizontalImageCarousel;
