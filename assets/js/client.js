import { initSwipers } from "./modules/init-swipers.js";

initSwipers();

new Swiper('#blog-swiper', {
    grabCursor: true,
    spaceBetween: 20,
    slidesPerView: "auto",
    breakpoints: {
        991: {
            spaceBetween: 50
        }
    }
})