import store from "./store";
import VueRouter from "vue-router";
import { routes } from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBell,
    faTruck,
    faInfoCircle,
    faPlus,
    faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

require("./bootstrap");

window.Vue = require("vue").default;
library.add(faBell, faTruck, faInfoCircle, faPlus, faPaperclip);

let token = localStorage.getItem("token");
if (token) {
    window.axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

Vue.component("app-comp", require("./components/AppComp.vue").default);
Vue.component("Navbar", require("./components/Layout/Navbar.vue").default);
Vue.component("Tabs", require("./components/Layout/Tabs.vue").default);
Vue.component(
    "CreateButton",
    require("./components/Layout/CreateButton.vue").default
);
Vue.component("Layout", require("./components/Layout/Layout.vue").default);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component(
    "ModalInvoice",
    require("./components/partials/ModalInvoice.vue").default
);
Vue.component(
    "Dropdown",
    require("./components/partials/Dropdown.vue").default
);
Vue.component(
    "TextInput",
    require("./components/partials/TextInput.vue").default
);
Vue.component(
    "TableComp",
    require("./components/partials/TableComp.vue").default
);

Vue.use(VueRouter);
const router = new VueRouter({
    mode: "history",
    routes,
});

// router.beforeEach((to, from, next) => {
//     // you could define your own authentication logic with token
//     let isAuthenticated = store.getters.isAuthenticated;

//     // check route meta if it requires auth or not
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (!isAuthenticated) {
//             next({
//                 path: "/login",
//                 params: { nextUrl: to.fullPath },
//             });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

const app = new Vue({
    el: "#app",
    store,
    router,
});
