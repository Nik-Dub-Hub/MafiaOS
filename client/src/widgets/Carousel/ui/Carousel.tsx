import { useCarousel } from "../lib/useCarousel";
import styles from "./Carousel.module.css";
import { CarouselProps } from "../model";

export const Carousel = ({
  images,
  interval = 5000,
  className,
}: CarouselProps) => {
  const { activeIndex} = useCarousel(images, interval);

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div
        className={styles.slides}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
