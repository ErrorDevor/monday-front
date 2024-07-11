import { Modal } from './utils/modal.js'
const modals = ["top-up-balance"];

modals.forEach((modal) => { 
    new Modal(modal, {
        closeOnClickOutside: true,
    });
});
