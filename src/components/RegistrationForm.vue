<template>
  <div class="registration-form">
    <h2 class="form-title">Registro de Empresa</h2>

    <h3 class="form-subtitle">Datos de Usuario</h3>
    <q-input outlined v-model="empresa.usuarioInsert.correo" label="Email" class="form-input"></q-input>
    <q-input outlined v-model="empresa.usuarioInsert.password" label="Contraseña" type="password"
      class="form-input"></q-input>

    <h3 class="form-subtitle">Datos de Empresa</h3>
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
    checkEmptyFields() {
      const { correo, password, nombre, direccion, ruc, telefono } = this.empresa.usuarioInsert;
      return correo === "" || password === "" || nombre === "" || direccion === "" || ruc === "" || telefono === "";
    },
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
