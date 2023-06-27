<template>
  <div class="perfil-postulante-container">
    <h2 class="pre-titulo">Perfil Postulante</h2>
    <div v-if="postulante">
      <h1 class="titulo">{{ postulante.nombre }}</h1>
      <div class="postulante-info">
        <p><strong>DNI:</strong> {{ postulante.dni }}</p>
        <p><strong>Dirección:</strong> {{ postulante.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ postulante.telefono }}</p>
      </div>
    </div>
    <div class="botones-container">
      <q-btn
        color="primary"
        label="Regresar a inicio"
        class="regresar-btn"
        @click="regresar"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PerfilPostulante",
  data() {
    return {
      postulante: null,
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosPostulante(id);
  },
  methods: {
    obtenerDatosPostulante(id) {
      axios
        .get(`http://localhost:5158/api/Postulante/${id}`)
        .then((response) => {
          this.postulante = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos del postulante:", error);
        });
    },
    regresar() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.perfil-postulante-container {
  padding: 20px;
  background-color: #b3e5fc;
  text-align: center;
}

.pre-titulo {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
}

.titulo {
  font-size: 30px;
  font-weight: bold;
}

.postulante-info {
  margin-top: 20px;
  font-size: 18px;
}

.regresar-btn {
  margin-top: 20px;
}

.botones-container {
  display: flex;
  justify-content: center;
}

/* Estilos de fuente atractivos */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

h1,
h2,
p,
button {
  font-family: "Poppins", sans-serif;
}
</style>
