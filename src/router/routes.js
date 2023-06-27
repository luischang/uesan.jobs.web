const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/login",
    component: () => import("pages/Log-in.vue"),
  },
  {
    path: "/registroEmpresa",
    component: () => import("components/RegistrationForm.vue"),
  },
  {
    path: "/perfilEmpresa/:id",
    component: () => import("components/PerfilEmpresa.vue"),
  },
  {
    path: "/crearOferta",
    component: () => import("components/CrearOferta.vue"),
  },
  {
    path: "/OfertaCompetencias",
    component: () => import("components/OfertaCompetencias.vue"),
  },
  // Always leave this as the last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
