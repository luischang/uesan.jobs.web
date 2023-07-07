<template>
  <div class="oferta-postulacion-container">
    <div class="oferta-postulacion">
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
          <h4><strong>Competencias:</strong></h4>
          <ul v-if="competenciasOferta.length > 0" class="competencias-list">
            <li v-for="competencia in competenciasOferta" :key="competencia">{{ competencia }}</li>
          </ul>
          <p v-else>No tiene</p>
        </div>
      </div>
      <div class="botones-container">
        <q-btn color="primary" label="Regresar a inicio" class="regresar-btn" @click="regresar"></q-btn>
        <q-btn v-if="esPostulanteAutenticado" color="primary" label="Postular a oferta" class="postular-btn"
          @click="postularOferta"></q-btn>
      </div>
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
      competenciasOferta: [],
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
          this.obtenerCompetenciasOferta(id);
          this.obtenerPostulaciones(id);
        })
        .catch((error) => {
          console.error("Error al obtener los datos de la oferta:", error);
        })
        .finally(() => {
          this.mostrarOferta = true;
        });
    },
    obtenerCompetenciasOferta(idOferta) {
      axios
        .get(`http://localhost:5158/api/CompetenciasOferta/${idOferta}`)
        .then((response) => {
          this.competenciasOferta = response.data.map((competencia) => competencia.competencias.descripcion);
        })
        .catch((error) => {
          console.error("Error al obtener las competencias de la oferta:", error);
        });
    },
    regresar() {
      this.$router.push("/home");
    },
    postularOferta() {
      const idOferta = this.$route.params.id;
      const idPostulante = this.idPostulante
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
        .get(`http://localhost:5158/api/CompetenciasOferta/${idOferta}`)
        .then((response) => {
          const competenciasOferta = response.data.map((competencia) => competencia.competencias.descripcion);

          axios
            .get(`http://localhost:5158/api/CompetenciasPostulante/${idPostulante}`)
            .then((response) => {
              const competenciasPostulante = response.data.map((competencia) => competencia.competencias.descripcion);

              const todasCoinciden = competenciasOferta.every((competenciaOferta) =>
                competenciasPostulante.includes(competenciaOferta)
              );

              if (todasCoinciden) {
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
              } else {
                const competenciasFaltantes = competenciasOferta.filter(
                  (competenciaOferta) => !competenciasPostulante.includes(competenciaOferta)
                );
                console.log(
                  "Le faltan las siguientes competencias para postular a la oferta:",
                  competenciasFaltantes
                );
                this.$q.notify({
                  message: "Usted no tiene las competencias necesarias para postular a esta oferta",
                  color: "warning",
                  position: "bottom",
                  timeout: 3000,
                });
                this.$q.notify({
                  message: "Competencias faltantes:" + competenciasFaltantes.join(", "),
                  color: "warning",
                  position: "bottom",
                  timeout: 3000,
                });
              }
            })
            .catch((error) => {
              console.error("Error al obtener las competencias del postulante:", error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener las competencias de la oferta:", error);
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
  background-image: url('src/assets/botonhome222.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  text-align: center;
  height: 100vh;
}

.oferta-postulacion {
  height: 90vh;
  background-color: rgba(0, 74, 173, 0.8);
  padding: 20px;
}

.titulo {
  font-size: 60px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
}

.oferta-info {
  margin-top: 20px;
  font-size: 24px;
  color: white;
}

.regresar-btn {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.postular-btn {
  margin-top: 20px;
  margin-left: 10px;
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

h3 {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
}

.postulaciones-list {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  text-align: center;

}

.postulacion-item {
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.postulacion-item p,
.postulacion-item h4 {
  color: black;
}

h4 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
}

p {
  margin: 0;
  font-size: 20px;
  color: white;
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

.competencias-list li {
  font-size: 20px;
  color: white;
}

.oferta-info p {
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 1.5;
}
</style>
