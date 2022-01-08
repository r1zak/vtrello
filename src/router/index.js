import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";

const routes = [
  {
    path: "/auth",
    name: "auth",
    component: Auth,
  },
  {
    path: "/",
    name: "board",
    component: () => import("../views/Board.vue"),
    children: [
      {
        path: "/task/:id",
        name: "task",
        component: () => import("../views/Task.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
