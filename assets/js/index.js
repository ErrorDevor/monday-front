
import { resizer } from '/assets/js/utils/resizer.js';

const initProjects = () => {
    let swiper;

    const destroySwiper = () => {
        if (swiper) {
            swiper.destroy();
            swiper = null;
        }
    };

    const enableSwiper = () => {
        destroySwiper();

        swiper = new Swiper("#projects-swiper", {
            slidesPerView: "auto",
            grabCursor: true,
        });
    };

    resizer("(min-width: 769px)", (match) => {
        if (match) enableSwiper();
        else destroySwiper();
    });
};

const initNews = () => {
    let swiper;

    swiper = new Swiper("#news-swiper", {
        slidesPerView: "auto",
        grabCursor: true,
    });
};

const replacer = () => {
    document.querySelectorAll("[data-replace]").forEach((el) => {
        console.log(el.innerHTML);
        el.innerHTML = el.innerHTML
            .replace(/(&lt;)/gi, "<")
            .replace(/&gt;/gi, ">");
    });
};

replacer();
initProjects();
initNews();