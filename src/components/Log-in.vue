<template>
  <div class="login-container">
    <img src="src/assets/LOGOCOMPLETO.png" class="login-logo" @click="goToHome" alt="Logo" />

    <div class="input-container">
      <input v-model="email" type="text" placeholder="Correo electrónico" class="login-input" />
    </div>

    <div class="input-container">
      <input v-model="password" type="password" placeholder="Contraseña" class="login-input" />
    </div>

    <q-btn color="white" text-color="blue" class="login-button" :class="{ hovered: isButtonHovered }" label="LOG IN"
      @click="login"></q-btn>

    <q-btn color="white" text-color="red" class="logout-button" label="Salir" @click="logout"></q-btn>

    <button @click="goRegistrationPostulante" class="register-button">
      ¿Busca trabajo? ¡Regístrese como postulante!
    </button>
    <button @click="goRegistrationEmpresa" class="register-button">
      ¿Busca talento? ¡Regístrese como empresa!
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      isButtonHovered: false,
    };
  },
  methods: {
    goRegistrationEmpresa() {
      this.$router.push("/registroEmpresa");
    },
    goRegistrationPostulante() {
      this.$router.push("/registroPostulante");
    },
    goToHome() {
      // Redireccionar a la página Home
      this.$router.push("/home");
    },
    login() {
      if (localStorage.getItem("postulanteAutenticado")) {
        localStorage.removeItem("postulanteAutenticado");
      }
      if (localStorage.getItem("empresaAutenticada")) {
        localStorage.removeItem("empresaAutenticada");
      }
      if (localStorage.getItem("adminAutenticado")) {
        localStorage.removeItem("adminAutenticado");
      }
      axios
        .post("http://localhost:5158/api/Usuario/SignIn", {
          correo: this.email,
          password: this.password,
        })
        .then((response) => {
          const usuario = response.data;
          console.log(usuario);
          if (
            usuario &&
            usuario.usuario &&
            usuario.usuario.tipo === "postulante"
          ) {
            localStorage.setItem(
              "postulanteAutenticado",
              JSON.stringify(usuario)
            );
            this.$router.push(`/perfilPostulante/${usuario.idPostulante}`);
          } else if (
            usuario &&
            usuario.usuario &&
            usuario.usuario.tipo === "empresa"
          ) {
            localStorage.setItem("empresaAutenticada", JSON.stringify(usuario));
            this.$router.push(`/perfilEmpresa/${usuario.idEmpresa}`);
          } else if (usuario && usuario.tipo === "admin") {
            localStorage.setItem("adminAutenticado", JSON.stringify(usuario));
            this.$router.push("/admin");
          };
          this.$q.notify({
            message: "Inicio de sesión exitoso",
            color: "positive",
            position: "bottom",
            timeout: 3000,
          })
        })
        .catch((error) => {
          console.error("Error de inicio de sesión:", error);
          this.$q.notify({
            message: "Correo y/o contraseña incorrectos",
            color: "negative",
            position: "bottom",
            timeout: 3000,
          })
        });
    },
    logout() {
      // Eliminar datos de autenticación almacenados en localStorage
      localStorage.removeItem("postulanteAutenticado");
      localStorage.removeItem("empresaAutenticada");
      localStorage.removeItem("adminAutenticado");

      // Redireccionar a la página Home
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.logout-button {
  margin-top: 25px;
  margin-bottom: 100px;
  background-color: white;
  color: red;
  transition: background-color 0.3s, color 0.3s;
}

.logout-button.hovered {
  background-color: red;
  color: white;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('src/assets/FONDOOK.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.login-logo {
  width: 274px;
  height: 92px;
  margin-bottom: 30px;
  cursor: pointer;
}

.input-container {
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 300px;
}

.login-input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: none;
  outline: none;
}

.login-button {
  margin-top: 25px;
  background-color: white;
  color: blue;
  transition: background-color 0.3s, color 0.3s;
}

.login-button.hovered {
  background-color: rgb(13, 234, 13);
  color: white;
}

.register-button {
  margin-top: 40px;
  background: none;
  border: none;
  color: white;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  margin-top: 0rem;
}
</style>

