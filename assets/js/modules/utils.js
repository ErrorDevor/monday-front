export function textless(textSelector, buttonSelector, className) {
    const textEl = document.querySelector(textSelector);
    const buttonEl = document.querySelector(buttonSelector);

    if (textEl && buttonEl) {
        buttonEl.addEventListener("click", () => {
            textEl.classList.remove(className);
            buttonEl.classList.add("hidden");
        });
    }
}

export function counter(container, props = {
    init: 0,
}) {
    let count =  props.init;

    const options = Object.assign({
        init: 1,
        min: 0,
    }, props);

    function getCounter() {
        return count;
    }

    const rootEl = document.querySelector(container);
    if(!rootEl) {
        return { getCounter };
    }
    const minus = rootEl.querySelector("[data-counter=\"minus\"");
    const label = rootEl.querySelector("[data-counter=\"label\"");
    const plus = rootEl.querySelector("[data-counter=\"plus\"");
    if(!minus || !label || !plus) {
        return { getCounter };
    }

    count = parseInt(label.textContent) || options.init;

    function draw() {
        label.textContent = count.toString()
    }

    minus.addEventListener("click", () => {
        count = Math.max(options.min, count - 1);
        draw();
    });

    plus.addEventListener("click", () => {
        count++;
        draw();
    })

    return {
        getCounter
    }
}

//  bg-black
export function checkboxes(container) {
    const containerEl = document.querySelector(container);
    let values = [];

    
    function draw(checkbox, container, active) {
        const svg = container.querySelector("svg");
        if(active) {
            checkbox.setAttribute("data-checkbox-checked", "");
            container.classList.add("bg-black", "border-black");
            container.classList.remove("border-gray-caeb5bf");
            if(svg) {
                svg.classList.remove("hidden");
            }
        } else {
            checkbox.removeAttribute("data-checkbox-checked");
            container.classList.remove("bg-black", "border-black");
            container.classList.add("border-gray-caeb5bf");
            if(svg) {
                svg.classList.add("hidden");
            }
        }
    }

    if(containerEl) {
        const checkboxes = containerEl.querySelectorAll("[data-checkbox]");

        for(const checkbox of checkboxes) {
            const container = checkbox.querySelector("[data-checkbox-container]");
            const value = checkbox.dataset.checkbox;
            const active = checkbox.hasAttribute("data-checkbox-checked");

            if(active) {
                values.push(value);
            }

            if(container) {
                container.addEventListener("click", () => {
                    if(values.includes(value)) {
                        values = values.filter((item) => item !== value);
                    } else {
                        values.push(value);
                    }
                    console.log(values)
                    draw(checkbox, container, values.includes(value))
                });
            } 
        }
    
        return {
            getActive() {
                return values;
            }
        };
    }

    return {
        getActive() {
            return values;
        }
    }
}