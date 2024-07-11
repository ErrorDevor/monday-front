import { initSelect } from "./modules/init-select.js";
import { initContainers } from "./modules/init-containers.js";
import { initAccordeons } from "./modules/init-accordeons.js";
import { Modal } from "./utils/modal.js";
import './modules/init-auth.js'

new Modal("auth", { 
    closeOnClickOutside: true,
});

initSelect();
initContainers();
initAccordeons();