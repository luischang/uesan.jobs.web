<template>
  <div class="registration-form">
    <h2 class="form-title">Registro de Postulante</h2>

    <h3 class="form-subtitle">Datos de Usuario</h3>
    <q-input
      outlined
      v-model="postulante.usuarioInsert.correo"
      label="Email"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="postulante.usuarioInsert.password"
      label="Contraseña"
      type="password"
      class="form-input"
    ></q-input>

    <h3 class="form-subtitle">Datos de Postulante</h3>
    <q-input
      outlined
      v-model="postulante.nombre"
      label="Nombre"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="postulante.dni"
      label="DNI"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="postulante.telefono"
      label="Teléfono"
      class="form-input"
    ></q-input>
    <q-input
      outlined
      v-model="postulante.direccion"
      label="Dirección"
      class="form-input"
    ></q-input>

    <div class="form-actions">
      <q-btn
        color="primary"
        label="Registrar"
        @click="register"
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
      postulante: {
        usuarioInsert: {
          tipo: "postulante",
          correo: "",
          password: "",
        },
        nombre: "",
        dni: "",
        telefono: "",
        direccion: "",
      },
    };
  },
  methods: {
    register() {
      if (localStorage.getItem("postulanteCreado")) {
        localStorage.removeItem("postulanteCreado");
      }
      const url = "http://localhost:5158/api/Postulante/CreatePostulante";

      axios
        .post(url, this.postulante)
        .then((response) => {
          console.log("Aquí va la respuesta " + JSON.stringify(response));
          localStorage.setItem("postulanteCreado", response.data);
          console.log(response.data);
          this.$router.push("/PostulanteCompetencias");
        })
        .catch((error) => {
          console.log("Ocurrió un error " + error);
          this.$q.notify({
            message: "Ocurrió un error",
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
      this.postulante.usuarioInsert.correo = "";
      this.postulante.usuarioInsert.password = "";
      this.postulante.nombre = "";
      this.postulante.direccion = "";
      this.postulante.dni = "";
      this.postulante.telefono = "";
    },
  },
};
</script>

<style scoped>
.registration-form {
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

.form-subtitle {
  margin-top: 20px;
  font-size: 18px;
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
