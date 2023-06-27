<template>
  <div class="create-offer-form">
    <h2 class="form-title">Crear Oferta</h2>

    <q-input
      outlined
      v-model="oferta.puesto"
      label="Puesto"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="oferta.descripcion"
      label="Descripción"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="oferta.requisitos"
      label="Requisitos"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="oferta.certificados"
      label="Certificados"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="oferta.funciones"
      label="Funciones"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="oferta.ubicacion"
      label="Ubicación"
      class="form-input"
    ></q-input>
    <q-select
      outlined
      v-model="oferta.modalidad"
      label="Modalidad"
      :options="modalidades"
      class="form-input"
    ></q-select>

    <div class="form-actions">
      <q-btn
        color="primary"
        label="Crear"
        @click="createOffer"
        class="form-btn"
      ></q-btn>
      <q-btn
        color="negative"
        label="Cancelar"
        @click="cancel"
        class="form-btn"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listaEmpresas: [],
      oferta: {
        puesto: "",
        descripcion: "",
        requisitos: "",
        certificados: "",
        funciones: "",
        ubicacion: "",
        modalidad: "",
        empresa: {
          idEmpresa: 0,
        },
      },
      modalidades: ["Remoto", "Presencial", "Híbrido"],
    };
  },
  created() {
    this.obtenerEmpresas();
  },
  methods: {
    obtenerEmpresas() {
      const url = "http://localhost:5158/api/Empresa/GetAll";

      axios
        .get(url)
        .then((response) => {
          this.listaEmpresas = response.data;
          this.oferta.empresa.idEmpresa = this.getEmpresa();
        })
        .catch((error) => {
          console.error("Error al obtener las empresas:", error);
        });
    },
    getEmpresa() {
      const usuarioAutenticado = JSON.parse(
        localStorage.getItem("usuarioAutenticado")
      );

      if (usuarioAutenticado) {
        const idUsuario = usuarioAutenticado.idUsuario;
        const empresa = this.listaEmpresas.find(
          (e) => e.usuario.idUsuario === idUsuario
        );

        if (empresa) {
          return empresa.idEmpresa;
        }
      }

      return 0;
    },

    createOffer() {
      if (localStorage.getItem("ofertaCreada")) {
        localStorage.removeItem("ofertaCreada");
      }
      const url = "http://localhost:5158/api/Oferta/CreateOferta";

      axios
        .post(url, this.oferta)
        .then((response) => {
          const oferta = response.data;
          localStorage.setItem("ofertaCreada", response.data);
          const ofertaCreada = JSON.parse(localStorage.getItem("ofertaCreada"));
          if (ofertaCreada) {
            console.log(ofertaCreada);
          }
          console.log("Aquí va la respuesta " + JSON.stringify(response));
          this.resetForm();
          this.$router.push("/OfertaCompetencias");
        })
        .catch((error) => {
          console.log("Ocurrió un error " + error);
          this.$q.notify({
            message: "Ocurrió un error al crear la oferta",
            color: "negative",
            position: "top",
            timeout: 3000,
          });
        });
    },
    cancel() {
      this.resetForm();
    },
    resetForm() {
      this.oferta.puesto = "";
      this.oferta.descripcion = "";
      this.oferta.requisitos = "";
      this.oferta.certificados = "";
      this.oferta.funciones = "";
      this.oferta.ubicacion = "";
      this.oferta.modalidad = "";
      this.oferta.empresa.idEmpresa = this.getEmpresa();
    },
  },
};
</script>

<style scoped>
.create-offer-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #333333;
}

.form-input {
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-btn {
  margin-right: 10px;
}
</style>
