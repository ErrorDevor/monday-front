import { initSwipers } from "./modules/init-swipers.js";
import { textless, counter, checkboxes } from "./modules/utils.js";

initSwipers();

textless("#about-text", "#about-text-btn", "hidden-about-text");
textless("#order-text", "#order-text-btn", "hidden-ordering-text");

counter("#counter-container", { min: 1 });
counter("#counter-container-2", { min: 1 });
checkboxes("#checkboxes-1");
checkboxes("#checkboxes-2");

function reviewTabsInit() {
    const buttons = Array.from(document.querySelectorAll("[data-review-tab]"));
    const activeClasses = "bg-white font-bold text-black".split(" ");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const type = btn.CDATA_SECTION_NODE.reviewTab; // all | positive | negative
            btn.classList.add(...activeClasses);
            buttons.forEach((obtn) => {
                if (obtn !== btn) {
                    obtn.classList.remove(...activeClasses);
                }
            });
        });
    });
}

reviewTabsInit();
