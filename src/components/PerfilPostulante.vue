<template>
  <div class="perfil-postulante-container">
    <div v-if="postulante">
      <h1 class="titulo">{{ postulante.nombre }}</h1>
      <div class="postulante-info">
        <p><strong>DNI:</strong> {{ postulante.dni }}</p>
        <p><strong>Dirección:</strong> {{ postulante.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ postulante.telefono }}</p>
        <p><strong>Competencias:</strong></p>
        <ul v-if="competenciasPostulante.length > 0" class="competencias-list">
          <li v-for="competencia in competenciasPostulante" :key="competencia">{{ competencia }}</li>
        </ul>
        <p v-else>No tiene</p>
      </div>
    </div>
    <div class="botones-container">
      <q-btn color="primary" label="Regresar a inicio" class="regresar-btn" @click="regresar"></q-btn>
    </div>
    <div v-if="esPostulanteAutenticado" class="postulaciones-container">
      <h3 class="titulo-ofertas">Postulaciones realizadas:</h3>
      <div class="postulaciones-list" v-if="postulaciones.length > 0">
        <div class="postulacion-item" v-for="postulacion in postulaciones" :key="postulacion.idOfertaPostular">
          <h4>{{ postulacion.oferta.puesto }}</h4>
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
      competenciasPostulante: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosPostulante(id);
    this.obtenerCompetenciasPostulante(id);
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

    obtenerCompetenciasPostulante(idPostulante) {
      axios
        .get(`http://localhost:5158/api/CompetenciasPostulante/${idPostulante}`)
        .then((response) => {
          this.competenciasPostulante = response.data.map((competencia) => competencia.competencias.descripcion);
        })
        .catch((error) => {
          console.error("Error al obtener las competencias del postulante:", error);
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
  background-color: #004add;
  text-align: center;
}


.titulo {
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

.postulante-info {
  margin-top: 20px;
  font-size: 24px;
  color: white;
}

.regresar-btn {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.botones-container {
  display: flex;
  justify-content: center;
}

.postulaciones-container {
  background-color: #004add;
  margin-top: 40px;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  border-radius: 10px;
}

.titulo-ofertas {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
}

.postulaciones-list {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.postulacion-item {
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.h4 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #004add;
}

.p {
  margin: 0;
  font-size: 20px;
  color: #004add;
}

.ver-mas-btn {
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}

.competencias-list {
  list-style: none;
  padding-left: 0;
}

/* Estilos de fuente atractivos */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

h1,
h2,
h3,
h4,
p,
button,
li {
  font-family: "Poppins", sans-serif;
}
</style>
