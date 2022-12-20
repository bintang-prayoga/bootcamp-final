// import AppComp from './components/AppComp.vue';
import Open from "./components/pages/Open.vue";
import Completed from "./components/pages/Completed.vue";
import Login from "./components/pages/Login.vue";
import LoginPass from "./components/pages/LoginPass.vue";
import Details from "./components/pages/Details.vue";
import Edit from "./components/pages/Edit.vue";
import Create from "./components/pages/Create.vue";

export const routes = [
    {
        path: "/",
        name: "Open",
        component: Open,
    },
    {
        path: "/instructions/create",
        name: "Create",
        component: Create,
    },
    {
        path: "/completed",
        name: "Completed",
        component: Completed,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/login-pass",
        name: "LoginPass",
        component: LoginPass,
    },
    {
        path: "/instructions/:id",
        name: "Details",
        component: Details,
        props: true,
    },
    {
        path: "/instructions/:id/edit",
        name: "Edit",
        component: Edit,
    },
    {
        path: "*",
        redirect: "/",
    },
];
