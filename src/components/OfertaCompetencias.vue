<template>
  <div class="oferta-competencias">
    <h2>Inserte las competencias necesarias para la oferta</h2>

    <q-input outlined v-model="buscarCompetencia" label="Buscar competencia" class="form-input"></q-input>

    <div v-for="competencia in competenciasFiltradas" :key="competencia.idCompetencia">
      <q-checkbox v-model="competenciaSeleccionada[competencia.idCompetencia]"
        :label="competencia.descripcion"></q-checkbox>
    </div>

    <q-btn label="Registrar competencias" color="primary" @click="registrarCompetencias"></q-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      buscarCompetencia: "",
      competencias: [],
      competenciaSeleccionada: {},
      idOferta: null,
    };
  },
  created() {
    this.obtenerCompetencias();
    this.idOferta = this.getOferta();
  },
  computed: {
    competenciasFiltradas() {
      const buscar = this.buscarCompetencia.toLowerCase();
      return this.competencias.filter((competencia) =>
        competencia.descripcion.toLowerCase().includes(buscar)
      );
    },
  },
  methods: {
    getOferta() {
      const ofertaCreada = JSON.parse(localStorage.getItem("ofertaCreada"));
      if (ofertaCreada) {
        console.log(ofertaCreada);
      }
      return ofertaCreada;
    },
    obtenerCompetencias() {
      const url = "http://localhost:5158/api/Competencias/GetAll";

      axios
        .get(url)
        .then((response) => {
          this.competencias = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las competencias:", error);
        });
    },
    registrarCompetencias() {
      const url = "http://localhost:5158/api/CompetenciasOferta/Create";
      console.log(this.getOferta());
      const competenciasSeleccionadas = Object.entries(
        this.competenciaSeleccionada
      )
        .filter(([_, seleccionada]) => seleccionada)
        .map(([idCompetencia, _]) => ({
          idCompetencia: parseInt(idCompetencia),
          idOferta: this.idOferta,
        }));

      if (competenciasSeleccionadas.length === 0) {
        // No hay competencias seleccionadas, no se realiza ningún registro
        this.$router.push("/home");
        this.$q.notify({
          message: "No hay competencias seleccionadas",
          color: "warning",
          position: "bottom",
          timeout: 3000,
        });
        return; // Salir del método
      }


      competenciasSeleccionadas.forEach((competencia) => {
        axios
          .post(url, competencia)
          .then((response) => {
            console.log("Competencia registrada:", response.data);
            this.$router.push("/home");
            this.$q.notify({
              message: "Oferta registrada con éxito",
              color: "positive",
              position: "bottom",
              timeout: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al registrar la competencia:", error);
            console.log(competencia.idCompetencia, competencia.idOferta);
          });
      });
    },
  },
};
</script>

<style scoped>
.oferta-competencias {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-input {
  margin-bottom: 15px;
}
</style>
