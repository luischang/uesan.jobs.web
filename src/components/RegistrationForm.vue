<template>
  <div class="registration-page">
    <header class="header">
      <div class="logo">
        <a href="http://localhost:9000/#/Home">
          <img src="src/assets/textlogo.png" alt="Logo" class="logo-image" />
        </a>
      </div>
      <div class="header-buttons">
        <button class="button">Login</button>
        <div class="search-bar">
          <input type="text" class="search-input" placeholder="Buscar" />
          <i class="search-icon"></i>
        </div>
      </div>
    </header>
    <div class="registration-form">

      <h2 class="form-title">REGISTRO DE EMPRESA</h2>

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
        <button type="submit" class="button">Registrar</button>
        <button type="button" class="button button-cancel">Cancelar</button>
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
    };
  },
  methods: {
    register() {
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
      this.resetForm();
    },
    resetForm() {
      this.empresa.usuarioInsert.correo = "";
      this.empresa.usuarioInsert.password = "";
      this.empresa.nombre = "";
      this.empresa.direccion = "";
      this.empresa.ruc = "";
      this.empresa.telefono = "";
    },
  },
};
</script>

<style scoped>
.registration-page {
  background-color: #004aad;
  padding: 40px;
  color: white;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  background-color: #004aad;
  height: 60px;
}

.logo {
  display: flex;
  align-items: left;
}

.logo-image {
  width: 110px;
  height: 60px;
  margin-right: 50px;

}

.logo-text {
  font-size: 24px;
  font-weight: bold;
}

.header-buttons {
  display: flex;
  align-items: center;
  padding-left: 400px;
}

.button {}

.search-bar {
  position: relative;
  padding: 20px;
}

.search-input {
  width: 200px;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  outline: none;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-image: url(src/assets/search_icon.png);
  background-repeat: no-repeat;
  background-position: center;
}

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

.button-cancel {
  background-color: transparent;
  color: #8e0000;
  margin-left: 10px;
}

.form-btn {
  margin-right: 10px;
}
</style>
