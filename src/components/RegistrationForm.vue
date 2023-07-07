<template>
  <div class="registration-page">
    <div class="registration-form">
      <img src="src/assets/txtlogo.png" class="logo" @click="redirectToHome" alt="Logo">
      <div class="form-content">
        <h2 class="form-title">-REGISTRO DE EMPRESA-</h2>

        <h3 class="form-subtitle blue-text">Datos de Usuario</h3>
        <q-input outlined v-model="empresa.usuarioInsert.correo" label="Email" class="form-input"></q-input>
        <q-input outlined v-model="empresa.usuarioInsert.password" label="Contraseña" type="password"
          class="form-input"></q-input>

        <h3 class="form-subtitle blue-text">Datos de Empresa</h3>
        <q-input outlined v-model="empresa.nombre" label="Nombre" class="form-input"></q-input>
        <q-input outlined v-model="empresa.direccion" label="Dirección" class="form-input"></q-input>
        <q-input outlined v-model="empresa.ruc" label="RUC" class="form-input"></q-input>
        <q-input outlined v-model="empresa.telefono" label="Teléfono" class="form-input"></q-input>

        <div class="form-actions">
          <q-btn color="primary" label="Registrar" @click="register" :disable="disableRegisterButton"
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
      empresa: {
        usuarioInsert: {
          tipo: "empresa",
          correo: "",
          password: "",
        },
        nombre: "",
        direccion: "",
        ruc: "",
        telefono: "",
      },
      disableRegisterButton: false,
    };
  },
  methods: {
    register() {

      if (this.checkEmptyFields()) {
        this.$q.notify({
          message: "Por favor, complete todos los campos.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
        return;
      }


      if (this.empresa.ruc.length !== 11) {
        this.$q.notify({
          message: "El RUC debe tener 11 números.",
          color: "negative",
          position: "top",
          timeout: 3000,
        });
        return;
      }

      var url = "http://localhost:5158/api/Empresa/CreateEmpresa";

      axios
        .post(url, this.empresa)
        .then((response) => {
          console.log("Aquí va la respuesta " + JSON.stringify(response));
          this.$router.push("/home");
          this.$q.notify({
            message: "Registro exitoso",
            color: "positive",
            position: "bottom",
            timeout: 3000,
          });
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
      this.$router.push("/home");
    },

    checkEmptyFields() {
      const { correo, password, nombre, direccion, ruc, telefono } = this.empresa.usuarioInsert;
      return correo === "" || password === "" || nombre === "" || direccion === "" || ruc === "" || telefono === "";
    },
    redirectToHome() {
      // Redirecciona a la página principal (home)
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.registration-page {
  background-image: url('src/assets/FONDOOK.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-form {
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
  /* Añade scroll vertical si el contenido excede la altura */
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

.form-subtitle {
  margin-top: 20px;
  font-size: 18px;
  color: #ffffff;
}

.form-subtitle.blue-text {
  color: #e5eefd;
  text-align: left;
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
  border-radius: 10px;
}
</style>

