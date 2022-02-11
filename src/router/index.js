import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { auth } from "../firebase/firebase";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "auth",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      layout: "auth",
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "board",
    component: () => import("../views/Board.vue"),
    meta: {
      layout: "main",
      requiresAuth: true,
    },
    children: [
      {
        path: "/task/:id",
        name: "task",
        component: () => import("../views/Task.vue"),
        meta: {
          layout: "main",
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/");
    return;
  }

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !auth.currentUser
  ) {
    next("/login");
    return;
  }

  next();
});

export default router;
