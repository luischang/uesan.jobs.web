<template>
  <div class="create-offer-page">
    <div class="create-offer-form">
      <img src="src/assets/txtlogo.png" class="logo" @click="redirectToHome" alt="Logo">
      <div class="form-content">
        <h2 class="form-title">Crear Oferta</h2>

        <q-input outlined v-model="oferta.puesto" label="Puesto" class="form-input"></q-input>
        <q-input outlined v-model="oferta.descripcion" label="Descripción" class="form-input"></q-input>
        <q-input outlined v-model="oferta.requisitos" label="Requisitos" class="form-input"></q-input>
        <q-input outlined v-model="oferta.certificados" label="Certificados" class="form-input"></q-input>
        <q-input outlined v-model="oferta.funciones" label="Funciones" class="form-input"></q-input>
        <q-input outlined v-model="oferta.ubicacion" label="Ubicación" class="form-input"></q-input>
        <q-select outlined v-model="oferta.modalidad" label="Modalidad" :options="modalidades"
          class="form-input"></q-select>

        <div class="form-actions">
          <q-btn color="primary" label="Crear" @click="createOffer" :disable="disableCreateButton"
            class="form-btn"></q-btn>
          <q-btn color="negative" label="Cancelar" @click="cancel" class="form-btn"></q-btn>
        </div>
      </div>
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
      modalidades: ["Virtual", "Presencial"],
      disableCreateButton: false,
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
      const empresaAutenticada = JSON.parse(
        localStorage.getItem("empresaAutenticada")
      );

      if (empresaAutenticada) {
        const idEmpresa = empresaAutenticada.idEmpresa;
        const empresa = this.listaEmpresas.find(
          (e) => e.idEmpresa === idEmpresa
        );

        if (empresa) {
          return empresa.idEmpresa;
        }
      }

      return 0;
    },

    createOffer() {
      if (this.checkEmptyFields()) {
        this.$q.notify({
          message: "Por favor, complete todos los campos.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
        return;
      }

      if (localStorage.getItem("ofertaCreada")) {
        localStorage.removeItem("ofertaCreada");
      }
      const url = "http://localhost:5158/api/Oferta/CreateOferta";

      this.disableCreateButton = true; // Disable the create button while the request is being made

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
        })
        .finally(() => {
          this.disableCreateButton = false; // Re-enable the create button after the request is completed
        });
    },
    cancel() {
      this.resetForm();
      this.$router.push("/home");
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
    checkEmptyFields() {
      const {
        puesto,
        descripcion,
        requisitos,
        certificados,
        funciones,
        ubicacion,
        modalidad,
      } = this.oferta;
      return (
        puesto === "" ||
        descripcion === "" ||
        requisitos === "" ||
        certificados === "" ||
        funciones === "" ||
        ubicacion === "" ||
        modalidad === ""
      );
    },
  },
};
</script>

<style scoped>
.create-offer-page {
  background-image: url('src/assets/FONDOOK.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.create-offer-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-image: url('src/assets/fondoformsss.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0px 2px 4px #ffffff1a;
  text-align: center;
  height: 90vh;
  /* Ajusta la altura según tus necesidades */
  width: 500px;
  overflow-y: auto;
}

.logo {
  width: 287px;
  height: 58.1px;
  margin: 10px auto;
  margin-top: 10px;
  cursor: pointer;
}

.form-content {
  margin-top: 20px;
}

.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #b9d5ff;
  margin-bottom: 20px;
}


.form-input {
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #e7e7e7;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.form-btn {
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 10px;
}
</style>
