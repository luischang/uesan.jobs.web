const routes = [
  {
    path: "/",
    component: () => import("components/Home.vue"),
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
    path: "/perfilPostulante/:id",
    component: () => import("components/PerfilPostulante.vue"),
  },
  {
    path: "/crearOferta",
    component: () => import("components/CrearOferta.vue"),
  },
  {
    path: "/registroPostulante",
    component: () => import("components/RegistroPostulante.vue"),
  },
  {
    path: "/OfertaCompetencias",
    component: () => import("components/OfertaCompetencias.vue"),
  },
  {
    path: "/PostulanteCompetencias",
    component: () => import("components/PostulanteCompetencias.vue"),
  },
  {
    path: "/OfertaPostular/:id",
    component: () => import("components/OfertaPostular.vue"),
  },
  {
    path: "/home",
    component: () => import("components/Home.vue"),
  },
  // Always leave this as the last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
