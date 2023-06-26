const routes = [
  {
    path: "/",
<<<<<<< HEAD
    //component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    children: [{ path: "", component: () => import("pages/Log-in.vue") }],
=======
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/registroEmpresa",
    component: () => import("components/RegistrationForm.vue"),
>>>>>>> 95942cfc1c30f43d10179f147740d6f5190383c1
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
