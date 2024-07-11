import { createElement } from "./utils/createElement.js";

function initPassword() {
    const passwords = Array.from(
        document.querySelectorAll('[data-type="button-password"]')
    );

    let type = "password";

    const handlers = [];

    passwords.forEach((el) => {
        const main = el.parentElement;
        const input = main.querySelector("input");
        const img = el.querySelector("img");

        handlers.push(() => {
            input.type = type;
            img.src =
                "/img/icons/" +
                (type === "password" ? "eye.svg" : "eye-slash.svg");
        });

        if (main && input) {
            el.addEventListener("click", () => {
                type = type === "password" ? "text" : "password";
                handlers.forEach((fn) => fn());
            });
        }
    });
}

function initTextareas() {
    const textareas = Array.from(document.querySelectorAll("[data-max-chars]"));

    textareas.forEach((el) => {
        const maxChars = +el.dataset.maxChars || 99999;
        const parent = el.parentElement;
        const counter = parent.querySelector("[data-textarea-count] > span");

        el.addEventListener("input", (ev) => {
            let target = ev.target;
            let value = target.value.slice(0, maxChars);
            el.value = value;

            console.log(value, value.length, maxChars);

            if (counter) {
                counter.innerHTML = el.value.length.toString();
            }
        });
    });
}

function initMultiSelect() {
    const multiSelects = Array.from(document.querySelectorAll("[data-ms='']"));

    multiSelects.forEach((el) => {
        const input = el.querySelector('[data-ms="input"]');
        const list = el.querySelector('[data-ms="list"]');
        const button = el.querySelector('[data-ms="button"]');

        let data = [];

        const update = () => {
            list.innerHTML = "";
            data.forEach((name) => {
                list.appendChild(
                    createElement({
                        tag: "button",
                        innerHTML: `${name}<img class='size-[14px]' src="/img/icons/cross.svg" alt=""/>`,
                        className:
                            "p-[6px_10px] flex items-center gap-1 bg-blue-cedf4ff rounded-[100px] font-Satoshi font-bold text-sm leading-tight text-black",
                        clickEvent: () => {
                            data = data.filter((item) => item !== name);
                            update();
                        },
                    })
                );
            });
            list.appendChild(input);
        };

        button.addEventListener("click", () => {
            let value = input.value.trim();
            data.push(value);
            input.value = "";
            update();
        });
    });
}

function initTabs() {
    const tabs = Array.from(document.querySelectorAll("[data-id]")).map(
        (item) => ({
            button: item,
            container: document.getElementById(item.dataset.id),
        })
    );

    const clear = () => {
        tabs.forEach((item) => {
            item.button.classList.remove("active");
            item.container.classList.add("hidden");
        });
    };

    tabs.forEach((item) => {
        item.button.addEventListener("click", () => {
            clear();
            item.button.classList.add("active");
            item.container.classList.remove("hidden");
        });
    });
}

initTabs();
initMultiSelect();
initPassword();
initTextareas();
