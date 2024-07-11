import { Modal } from './utils/modal.js';

new Swiper('#trendings', {
    navigation: { 
        prevEl: "#trending-prev", 
        nextEl: "#trending-next" 
    },
    pagination: {
        type: 'fraction',
        el: '#trending-fraction',
        formatFractionCurrent: (number) => `${number}` 
    }
});

const modals = ["blog-post"];

modals.forEach((modal) => new Modal(modal, { 
    closeOnClickOutside: true,
}))