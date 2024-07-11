import data from "./data/faq.js";
import { createElement } from "./utils/createElement.js";

const content = document.getElementById("content");
const categories = document.getElementById("categories");
const categoryButtons = Array.from(
    categories.querySelectorAll('[data-faq-button=""]')
);

let activeId = null;

/* getItemById */
const getItemById = (id) => data.data.find((item) => item.id === id);

/* Create breadcrums */
const createBreadcrums = (categoryName, faqName) => {
    const root = createElement({
        tag: "div",
        className: "flex items-center gap-1",
    });

    const help = createElement({
        tag: "button",
        className:
            "font-Satoshi font-bold text-sm leading-tight text-gray-c9ca5b3",
        innerHTML: "Help >",
        clickEvent: function (ev) {
            activeId = null;
            content.innerHTML = "";
            content.appendChild(categories);
        },
    });

    const category = createElement({
        tag: faqName ? "button" : "p",
        className: [
            "font-Satoshi font-bold text-sm leading-tight ",
            faqName ? "text-gray-c9ca5b3" : "text-black",
        ],
        innerHTML: faqName ? `${categoryName} >` : categoryName,
        clickEvent: function() {
            if(activeId) {
                const category = getItemById(activeId);
                if(category) {
                    const faqs = createFaqs(category.list);
                    content.innerHTML = "";
                    content.append(createBreadcrums(category.name), faqs);
                } 
            }
        }
    });

    root.append(help, category);

    if(faqName) {
        const faq = createElement({
            tag: 'p',
            innerHTML: faqName,
            className: "font-Satoshi font-bold text-sm leading-tight text-black"
        });

        root.appendChild(faq);
    }

    return root;
};

/* Create content */
const createContent = (faq) => {
    return createElement({
        tag: 'div',
        innerHTML: `
            <div class="md:rounded-[24px] mt-[10px] rounded-2xl border-[1px] border-solid border-black/10">
                <div class="md:px-10 md:py-5 md:pb-[14px] flex items-center justify-between gap-2 p-[15px] pb-[10px] border-b-[1px] border-solid border-b-black/10">
                    <p class="md:text-[24px] font-Satoshi font-bold text-base leading-tight text-black">
                        ${faq.title}
                    </p>

                    <svg class="ml-auto size-6 stroke-gray-cb7c3d6"><use href="/img/sprite.svg#info-circle"></svg>
                </div>

                <div class="faq-content p-[10px_15px_15px] md:p-[24px_40px_44px]">
                    ${faq.content}
                </div>
            </div>
        `.trim()
    })
}

/* Create faqs */
const createFaqs = (data) => {
    const root = createElement({
        tag: "div",
        className:
            "md:mt-5 md:grid-cols-2 md:gap-[10px] mt-[10px] grid grid-col-1 gap-[5px]",
        children: data.map((faq) =>
            createElement({
                tag: "button",
                innerHTML: `${faq.title} <svg class="ml-auto size-3 stroke-black"><use href="/img/sprite.svg#arrow-right"></svg>`,
                className:
                    "md:text-base md:leading-tight md:p-6 p-[18px_15px] rounded-xl border-[1px] border-solid border-black/10 font-Satoshi font-bold text-sm leading-tight text-black text-left flex items-center gap-2",
                clickEvent: () => {
                    const category = getItemById(activeId);
                    if(category) {
                        content.innerHTML = "";
                        content.append(
                            createBreadcrums(category.name, faq.title),
                            createContent(faq)
                        );
                    }   
                }
            })
        ),
    });

    return root;
};

// Init
categoryButtons.forEach((button) => {
    button.addEventListener("click", (ev) => {
        const item = getItemById(button.id);
        if (item) {
            activeId = button.id;
            const faqs = createFaqs(item.list);
            content.innerHTML = "";
            content.append(createBreadcrums(item.name), faqs);
        }
    });
});
