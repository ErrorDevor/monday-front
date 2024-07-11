import { initSwipers } from "./modules/init-swipers.js";
import { HorizontalScroll } from "./utils/horizontal-scroll.js";

document
    .querySelectorAll('[data-hs=""]')
    .forEach((el) => new HorizontalScroll(el));

initSwipers();

const tabs = Array.from(document.querySelectorAll(".tab-item-button")).map(
    (el) => ({
        el,
        info: document.querySelector(
            `[data-content="${el.dataset.tabContent}"]`
        ),
    })
);

if (tabs.length > 0) {
    let activeEl = null;

    const update = () => {
        tabs.forEach((tab) => {
            if (tab === activeEl) {
                tab.el.classList.add("accordeon-active");
                tab.info?.classList.add("active");
            } else {
                tab.el.classList.remove("accordeon-active");
                tab.info?.classList.remove("active");
            }
        });
    };

    update();

    tabs.forEach((tab) =>
        tab.el.addEventListener("click", () => {
            if (window.innerWidth >= 768) {
                activeEl = tab;
                update();
            }
        })
    );
}
