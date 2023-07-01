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
      <h2 class="title">REGISTRO DE POSTULANTE</h2>

      <h3 class="subtitle">Datos de Usuario</h3>
      <div class="form-group">
        <label for="email" class="label">Correo electrónico:</label>
        <input type="email" id="email" v-model="postulante.usuarioInsert.correo" class="input" required>
      </div>
      <div class="form-group">
        <label for="password" class="label">Contraseña:</label>
        <input type="password" id="password" v-model="postulante.usuarioInsert.password" class="input" required>
      </div>

      <h3 class="subtitle">Datos de Postulante</h3>
      <div class="form-group">
        <label for="nombre" class="label">Nombre:</label>
        <input type="text" id="nombre" v-model="postulante.nombre" class="input" required>
      </div>
      <div class="form-group">
        <label for="dni" class="label">DNI:</label>
        <input type="text" id="dni" v-model="postulante.dni" class="input" required>
      </div>
      <div class="form-group">
        <label for="telefono" class="label">Teléfono:</label>
        <input type="text" id="telefono" v-model="postulante.telefono" class="input" required>
      </div>
      <div class="form-group">
        <label for="direccion" class="label">Dirección:</label>
        <input type="text" id="direccion" v-model="postulante.direccion" class="input" required>
      </div>

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

.button {
  background-color: white;
  color: #004aad;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

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

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #333333;
}

.subtitle {
  margin-top: 20px;
  font-size: 18px;
  color: #333333;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #004aad;
}

.input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
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
</style>
