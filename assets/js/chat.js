import { SwiperMedia } from "./utils/swiperMedia.js";
import { Modal } from "./utils/modal.js";
import { resizer } from "./utils/resizer.js";

const modals = [];

modals.forEach(
    (name) =>
        new Modal(name, {
            closeOnClickOutside: true,
        })
);

SwiperMedia("#chat", {
    allowTouchMove: false,
});

/* Page */

const msgBack = document.getElementById("msg-back");
const msgChat = document.getElementById("msg-chat");
const chats = Array.from(document.querySelectorAll(".chat"));

const classNames = {
    activeChat: "bg-gray-cf1f3f9",
};

/* Chat */
function changeChat(chat) {
    chats.forEach((e) => e.classList.remove(classNames.activeChat));

    if (!chat) {
        gsap.to(".wrapper", { x: 0, duration: 0.3 });
    } else {
        msgChat.scrollTop = msgChat.scrollHeight;
        chat.classList.add(classNames.activeChat);

        if (window.innerWidth <= 991) {
            gsap.to(".wrapper", { x: "-100%", duration: 0.3 });
        }
    }
}

chats.forEach((chat) => chat.addEventListener("click", () => changeChat(chat)));

if (msgBack) {
    msgBack.addEventListener("click", () => changeChat(null));
}

resizer("(min-width: 991px)", () => changeChat(null));
