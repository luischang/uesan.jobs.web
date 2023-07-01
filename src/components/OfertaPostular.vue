<template>
  <div class="oferta-postulacion-container">
    <h2 class="pre-titulo">Oferta de Empleo</h2>
    <div v-if="oferta">
      <h1 class="titulo">{{ oferta.puesto }}</h1>
      <div class="oferta-info">
        <p><strong>Descripción:</strong> {{ oferta.descripcion }}</p>
        <p><strong>Requisitos:</strong> {{ oferta.requisitos }}</p>
        <p><strong>Certificados:</strong> {{ oferta.certificados }}</p>
        <p><strong>Funciones:</strong> {{ oferta.funciones }}</p>
        <p><strong>Ubicación:</strong> {{ oferta.ubicacion }}</p>
        <p><strong>Modalidad:</strong> {{ oferta.modalidad }}</p>
        <p><strong>Fecha de Creación:</strong> {{ formatoFecha(oferta.fechaCreacion) }}</p>
        <p><strong>Empresa:</strong> {{ oferta.empresa.nombre }}</p>
      </div>
    </div>
    <div class="botones-container">
      <q-btn color="primary" label="Regresar a inicio" class="regresar-btn" @click="regresar"></q-btn>
      <q-btn v-if="esPostulanteAutenticado" color="primary" label="Postular a oferta" class="postular-btn"
        @click="postularOferta"></q-btn>
    </div>
  </div>
  <div v-if="esEmpresaAutenticada" class="postulaciones-container">
    <h3>Postulaciones realizadas:</h3>
    <div class="postulaciones-list" v-if="postulaciones.length > 0">
      <div class="postulacion-item" v-for="postulacion in postulaciones" :key="postulacion.idOfertaPostular">
        <h4>{{ postulacion.postulante.nombre }}</h4>
        <p><strong>Telefono: </strong>{{ postulacion.postulante.telefono }}</p>
        <q-btn color="primary" label="Ver más" class="ver-mas-btn"
          @click="verPerfil(postulacion.postulante.idPostulante)"></q-btn>
      </div>
    </div>
    <p v-else>No se encontraron postulaciones.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OfertaPostulacion",
  data() {
    return {
      oferta: null,
      idPostulante: null,
      postulaciones: [],
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosOferta(id);
    this.idPostulante = this.getPostulante();
  },
  computed: {
    esPostulanteAutenticado() {
      const postulanteAutenticado = JSON.parse(localStorage.getItem("postulanteAutenticado"));
      return postulanteAutenticado !== null;
    },
    esEmpresaAutenticada() {
      const empresaAutenticada = JSON.parse(localStorage.getItem("empresaAutenticada"));
      const empresaAutenticadaId = empresaAutenticada ? empresaAutenticada.idEmpresa.toString() : null;
      return this.oferta && empresaAutenticadaId === this.oferta.empresa?.idEmpresa.toString();
    },
  },
  methods: {
    verPerfil(idPostulante) {
      this.$router.push(`/PerfilPostulante/${idPostulante}`);
    },
    getPostulante() {
      const postulanteAutenticado = JSON.parse(localStorage.getItem("postulanteAutenticado"));
      if (postulanteAutenticado) {
        const idPostulante = postulanteAutenticado.idPostulante;
        return idPostulante;
      }
      return null;
    },
    obtenerPostulaciones(idOferta) {
      axios
        .get(`http://localhost:5158/api/OfertaPostular/${idOferta}/GetPostulantesByIdOferta`)
        .then((response) => {
          const postulaciones = response.data;
          const idPostulantes = postulaciones.map((postulacion) => postulacion.postulanteDescripcion.idPostulante);

          axios
            .get("http://localhost:5158/api/Postulante/GetAll")
            .then((response) => {
              const postulantes = response.data;

              this.postulaciones = postulaciones.map((postulacion) => {
                const postulante = postulantes.find((postulante) => postulante.idPostulante === postulacion.postulanteDescripcion.idPostulante);
                return { ...postulacion, postulante };
              });
            })
            .catch((error) => {
              console.error("Error al obtener los datos del postulante:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener las postulaciones a la oferta:", error);
        });
    },
    obtenerDatosOferta(id) {
      axios
        .get(`http://localhost:5158/api/Oferta/${id}`)
        .then((response) => {
          this.oferta = response.data;
          this.obtenerPostulaciones(id);
        })
        .catch((error) => {
          console.error("Error al obtener los datos de la oferta:", error);
        })
        .finally(() => {
          this.mostrarOferta = true;
        });
    },
    regresar() {
      this.$router.push("/home");
    },
    postularOferta() {
      console.log(this.$route.params.id, this.idPostulante);
      const ofertaPostulacion = {
        oferta: {
          idOferta: this.$route.params.id,
        },
        postulante: {
          idPostulante: this.idPostulante,
        },
        fecha: new Date(),
      };
      axios
        .post("http://localhost:5158/api/OfertaPostular/CreateOfertaPostular", ofertaPostulacion)
        .then((response) => {
          console.log("Postulación exitosa:", response.data);
          this.$router.push("/home");
          this.$q.notify({
            message: "¡Postulación realizada con éxito!",
            color: "positive",
            position: "bottom",
            timeout: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al postular a la oferta:", error);
          this.$q.notify({
            message: "Usted ya postuló a esta oferta",
            color: "negative",
            position: "bottom",
            timeout: 3000,
          });
        });
    },
    formatoFecha(fecha) {
      return new Date(fecha).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.oferta-postulacion-container {
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

.oferta-info {
  margin-top: 20px;
  font-size: 18px;
}

.regresar-btn {
  margin-top: 20px;
}

.postular-btn {
  margin-top: 20px;
  margin-left: 10px;
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
