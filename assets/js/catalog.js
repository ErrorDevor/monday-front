import { createAnchors } from "./utils/div-anchors.js";
import { Modal } from "./utils/modal.js";

createAnchors();

const modals = ["filters"];

modals.forEach(
    (name) =>
        new Modal(name, {
            closeOnClickOutside: true,
        })
);
