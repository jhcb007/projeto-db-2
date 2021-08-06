import {createApp} from "vue";
import {createWebHistory, createRouter} from "vue-router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";

import Admin from "@/views/Index";

const routes = [
    {
        path: "/",
        component: Admin,
    },
    {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
