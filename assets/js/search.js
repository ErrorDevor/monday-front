import { Modal } from './utils/modal.js';

const modals = ["filters"];

modals.forEach(
    (modal) => new Modal(modal, { closeOnClickOutside: true })
);