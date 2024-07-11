import { resizer } from "./resizer.js";

export const SwiperMedia = (el, options) => {
    if (typeof el === "string") {
        el = document.querySelector(el);
    }
    if (!el) return;

    let swiper;
    let media = el.dataset.swiperMedia || "(min-width: 1px)";

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
};
