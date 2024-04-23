import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

export const StyledCarousel = styled(Carousel)`
  margin: auto; 
  margin-bottom: 10px;
  margin-top: 8px;
`;

export const StyledCarouselItem = styled(Carousel.Item)`
  img {
    border-radius: 30px; 
    // max-width: 600px; 
    margin: auto; 
    height: 260px;
    object-fit: cover;
  }
`;

export const StyledCarouselControl = styled.div`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    /* Thay đổi màu của các biểu tượng điều hướng trước và sau */
    fill: #000;
  }

  .carousel-control-prev,
  .carousel-control-next {
    /* Thay đổi kích thước của các biểu tượng điều hướng */
    width: 40px;
    height: 40px;
  }

  .carousel-control-prev:hover,
  .carousel-control-next:hover {
    /* Hiển thị hiệu ứng hover khi di chuột qua các biểu tượng điều hướng */
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
