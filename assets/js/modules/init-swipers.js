import { resizer } from "../utils/resizer.js";

export const initSwipers = () => {
    document.querySelectorAll("[data-swiper]").forEach((el) => {
        let swiper;
        let media = el.dataset.swiperMedia || "(min-width: 768px)";
        let options;

        try {
            options = JSON.parse(el.dataset.swiperOptions);
        } catch (error) {
            options = {
                slidesPerView: "auto",
                grabCursor: true,
            };
        }

        const destroySwiper = () => {
            if (swiper) {
                swiper.destroy();
                swiper = null;
            }
        };

        const enableSwiper = () => {
            destroySwiper();
            swiper = new Swiper(el, options);
        };

        resizer(media, (match) => {
            if (match) enableSwiper();
            else destroySwiper();
        });
    });
};
