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
        <p>
          <strong>Fecha de Creación:</strong>
          {{ formatoFecha(oferta.fechaCreacion) }}
        </p>
        <p><strong>Empresa:</strong> {{ oferta.empresa.nombre }}</p>
      </div>
    </div>
    <div class="botones-container">
      <q-btn
        color="primary"
        label="Regresar a inicio"
        class="regresar-btn"
        @click="regresar"
      ></q-btn>

      <q-btn
        v-if="esPostulanteAutenticado"
        color="primary"
        label="Postular a oferta"
        class="postular-btn"
        @click="postularOferta"
      ></q-btn>
    </div>
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
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosOferta(id);
    this.idPostulante = this.getPostulante();
  },
  computed: {
    esPostulanteAutenticado() {
      const postulanteAutenticado = JSON.parse(
        localStorage.getItem("postulanteAutenticado")
      );
      return postulanteAutenticado !== null;
    },
  },
  methods: {
    getPostulante() {
      const postulanteAutenticado = JSON.parse(
        localStorage.getItem("postulanteAutenticado")
      );
      if (postulanteAutenticado) {
        console.log(postulanteAutenticado);
        const idPostulante = postulanteAutenticado.idPostulante;
        return idPostulante;
      }
      return null;
    },
    obtenerDatosOferta(id) {
      axios
        .get(`http://localhost:5158/api/Oferta/${id}`)
        .then((response) => {
          this.oferta = response.data;
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
        .post(
          "http://localhost:5158/api/OfertaPostular/CreateOfertaPostular",
          ofertaPostulacion
        )
        .then((response) => {
          console.log("Postulación exitosa:", response.data);
          this.$q.notify({
            message: "¡Postulación realizada con éxito!",
            color: "positive",
            position: "bottom",
            timeout: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al postular a la oferta:", error);
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

/* Estilos de fuente atractivos */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

h1,
h2,
p,
button {
  font-family: "Poppins", sans-serif;
}
</style>
