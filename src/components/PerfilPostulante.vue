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
      <q-btn color="primary" label="Regresar a inicio" class="regresar-btn" @click="regresar"></q-btn>
    </div>
    <div v-if="esPostulanteAutenticado" class="postulaciones-container">
      <h3>Postulaciones realizadas:</h3>
      <div class="postulaciones-list" v-if="postulaciones.length > 0">
        <div class="postulacion-item" v-for="postulacion in postulaciones" :key="postulacion.idOfertaPostular">
          <h4>{{ postulacion.oferta.puesto }}</h4>
          <p><strong>Descripción: </strong>{{ postulacion.oferta.descripcion }}</p>
          <q-btn color="primary" label="Ver más" class="ver-mas-btn"
            @click="verDetalles(postulacion.oferta.idOferta)"></q-btn>
        </div>
      </div>
      <p v-else>No se encontraron postulaciones.</p>
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
      postulaciones: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosPostulante(id);
  },
  computed: {
    esPostulanteAutenticado() {
      const postulanteAutenticado = JSON.parse(localStorage.getItem("postulanteAutenticado"));
      const postulanteAutenticadoId = postulanteAutenticado ? postulanteAutenticado.idPostulante.toString() : null;
      return postulanteAutenticadoId === this.$route.params.id;
    },
  },
  methods: {

    obtenerDatosPostulante(id) {
      axios
        .get(`http://localhost:5158/api/Postulante/${id}`)
        .then((response) => {
          this.postulante = response.data;
          this.obtenerPostulaciones(id);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del postulante:", error);
        });
    },
    regresar() {
      this.$router.push("/home");
    },

    verDetalles(idOferta) {
      this.$router.push(`/OfertaPostular/${idOferta}`);
    },
    obtenerPostulaciones(idPostulante) {
      axios
        .get(`http://localhost:5158/api/OfertaPostular/${idPostulante}/GetOfertasByIdPostulante`)
        .then((response) => {
          const postulaciones = response.data;
          const idOfertas = postulaciones.map((postulacion) => postulacion.oferta.idOferta);

          axios
            .get("http://localhost:5158/api/Oferta/GetAll")
            .then((response) => {
              const ofertas = response.data;

              // Asociar los datos de la oferta a cada postulación
              this.postulaciones = postulaciones.map((postulacion) => {
                const oferta = ofertas.find((oferta) => oferta.idOferta === postulacion.oferta.idOferta);
                return { ...postulacion, oferta };
              });
            })
            .catch((error) => {
              console.error("Error al obtener los datos de la oferta:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener las postulaciones del postulante:", error);
        });
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

.postulaciones-container {
  background-color: #a1c5db;
  margin-top: 40px;
  max-height: 400px;
  overflow-y: auto;
}

.postulaciones-list {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
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
