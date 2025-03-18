import { useState } from "react";
import { Carousel } from "@/widgets/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PlayModal from "@/features/modal/PlayModal/PlayModal";
import style from "./MainPage.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { showAlert } from "@/features/alerts";
import { Counter } from "@/widgets/Counter/Counter";

export function MainPage() {
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch()
  


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
        <Counter/>
        {user && (
          <button className={style.button} onClick={handlePlayClick}>
            Поиграем ?
          </button>
        )}
        {!user && (
          <button
            className={style.button}
            onClick={() =>
              dispatch(
                showAlert({
                  message: "Кнопка входа внизу😉",
                  status: "message",
                })
              )
            }
          >
            Поиграем ?
          </button>
        )}
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
