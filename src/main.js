import {createApp} from "vue";
import {createWebHistory, createRouter} from "vue-router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

import App from "@/App.vue";

import Adiada from "@/views/Adiada";
import ImediataUndoNoRedo from "@/views/Imediata_undo_no_redo";

const routes = [
    {
        path: "/",
        component: Adiada,
    },
    {
        path: "/adiada",
        name: 'adiada',
        component: Adiada,
    },
    {
        path: "/imediata_undo_no_redo",
        name: 'imediata_undo_no_redo',
        component: ImediataUndoNoRedo,
    },
    {path: "/:pathMatch(.*)*", redirect: "/"},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
