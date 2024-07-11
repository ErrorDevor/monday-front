import { Accordeon } from "../utils/accordeon.js";

export const initSelect = () => {
    const roots = document.querySelectorAll('[data-select=""]');

    roots.forEach(
        (el) => new Accordeon(el, {
            smooth: false,
            closeOnClickOutside: true,
            selectors: {
                element: '[data-select=""]',
                arrow: '[data-select="arrow"]',
                button: '[data-select="button"]',
                content: '[data-select="content"]'
            },
            onInit: ({ content }) => {
                content.style.display = "none";
            },
            onDestroy: ({ content }) => {
                content.style.display = "";
            },
            onOpen: ({ arrow, content }) => {
                if(arrow) {
                    arrow.style.transform = 'scaleY(-1)'
                }

                content.removeAttribute('style');
                
                console.log('open')
            },
            onClose: ({ arrow, content }) => {
                if(arrow) {
                    arrow.style.transform = ''
                }

                content.style.display = "none";

                console.log('close')
            }
        })
    )
}