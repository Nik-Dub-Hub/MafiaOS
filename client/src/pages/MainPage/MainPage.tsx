import { useState } from 'react';
import { Carousel } from "@/widgets/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayModal from '@/features/modal/PlayModal';
import style from "./MainPage.module.css";

export function MainPage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);

  const handlePlayClick = () => {
    setIsPlayModalOpen(true);
  };

  const handleClosePlayModal = () => {
    setIsPlayModalOpen(false);
  };

  const images = [
    "/cards/Врач.jpg",
    "/cards/Мафия.jpg",
    "/cards/Танцовщица.jpg",
    "/cards/Шериф.jpg",
  ];

  return (
    <div className={style.container}>
      <h4>Инновационное веб-приложение для захватывающей игры с друзьями</h4>
      <div className={style.buttonContainer}>
        <button className={style.button} onClick={handlePlayClick}>Поиграем ?</button>
      </div>
      <div className={style.carouselContainer}>
        <Carousel 
          images={images} 
          interval={5000} 
          className={style.customCarousel}
        />
      </div>
      <PlayModal isOpen={isPlayModalOpen} onClose={handleClosePlayModal} />
    </div>
  );
}