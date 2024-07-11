let chooseType = null;
let swiper = null;

/* Els */

const chooseButtons = Array.from(document.querySelectorAll(".auth-choose"));
const chooseCards = Array.from(document.querySelectorAll(".auth-card"));
const createButton = document.getElementById("auth-create");

const initSwiper = () => {
    swiper = new Swiper("#auth-swiper", {
        autoHeight: true,
        allowTouchMove: false,
        initialSlide: 0,
    });
};

const cardsUpdate = () => {
    chooseCards.forEach((card) => {
        const type = card.dataset.type;

        if (type === chooseType) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
};

const initInnerSwiper = (id) => {
    const client = document.getElementById(id);
    const prevButtons = Array.from(
        client.querySelectorAll('[data-type="prev"]')
    );
    const nextButtons = Array.from(
        client.querySelectorAll('[data-type="next"]')
    );

    const clientSwiper = new Swiper(client, {
        autoHeight: true,
        allowTouchMove: false,
    });

    prevButtons.forEach((prev, id) =>
        prev.addEventListener("click", () => {
            if (id === 0) {
                swiper.slidePrev();
            } else {
                clientSwiper.slidePrev();
            }
        })
    );

    nextButtons.forEach((next, id, arr) =>
        next.addEventListener("click", () => {
            if (id === arr.length - 1) {
                swiper.slideNext();
            } else {
                clientSwiper.slideNext();
            }
        })
    );
};

const initChoose = () => {
    cardsUpdate();

    chooseButtons.forEach((button) => {
        button.addEventListener("click", (ev) => {
            const target = ev.currentTarget;
            const type = target.dataset.type;

            chooseButtons.forEach((btn) => btn.classList.remove("active"));

            chooseType = type;
            target.classList.add("active");
            createButton.classList.add("active");

            cardsUpdate();
        });
    });

    createButton.addEventListener("click", () => {
        if (chooseType !== null) {
            swiper?.slideNext();
        }
    });
};

const initPasswords = () => {
    document
        .querySelectorAll('[data-type="password-btn"]')
        .forEach((button) => {
            const root = button.parentElement;
            const input = root.querySelector("input");
            const img = button.querySelector("img");

            if (!input || !img) return;

            button.type = "button";

            let type = input.type;

            const update = () => {
                input.type = type;
                img.src =
                    type === "password"
                        ? "/img/icons/eye.svg"
                        : "/img/icons/eye-slash.svg";
            };

            update();

            button.addEventListener("click", () => {
                type = type === "password" ? "text" : "password";
                update();
            });
        });
};

const initSignup = () => {
    const form = document.getElementById("signup-form");
    if (!form) return;

    form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        let data = {};

        Array.from(form.elements).forEach((el) => {
            if (el.tagName === "INPUT") {
                data[el.name] = el.value;
            }
        });

        console.log(data);
    });
};

initSwiper();
initChoose();
initInnerSwiper("client-swiper");
initInnerSwiper("seller-swiper");
initPasswords();
initSignup();
