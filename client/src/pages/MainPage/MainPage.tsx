import { Carousel } from "@/widgets/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./MainPage.module.css"

export function MainPage() {

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
        <button className={style.button}>Поиграем ?</button>
      </div>
      <div className={style.carouselContainer}>
        <Carousel 
          images={images} 
          interval={5000} 
          className={style.customCarousel}
        />
      </div>
    </div>
  );
}