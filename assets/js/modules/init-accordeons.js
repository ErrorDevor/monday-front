import { Accordeon } from "../utils/accordeon.js";

export const initAccordeons = () => {
    const roots = document.querySelectorAll('[data-accordeon=""]');

    roots.forEach(
        (el) => new Accordeon(el, {
            smooth: true,
            closeOnClickOutside: true,
            initState: true,
            onOpen: ({ arrow }) => {
                if(arrow) {
                    arrow.style.transform = 'scaleY(-1)'
                }
            },
            onClose: ({ arrow }) => {
                if(arrow) {
                    arrow.style.transform = ''
                }
            },
        })
    )
}