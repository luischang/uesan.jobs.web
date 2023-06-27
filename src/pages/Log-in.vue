<template>
  <div class="login-container">
    <img
      src="src/assets/jobsitelogo.png"
      class="login-logo"
      @click="goToHome"
      alt="Logo"
    />

    <div class="input-container">
      <input
        v-model="email"
        type="text"
        placeholder="Correo electrónico"
        class="login-input"
      />
    </div>

    <div class="input-container">
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        class="login-input"
      />
    </div>

    <q-btn
      color="white"
      text-color="blue"
      class="login-button"
      :class="{ hovered: isButtonHovered }"
      label="LOG IN"
      @click="login"
    ></q-btn>

    <button @click = "goRegistrationPostulante" class="register-button">¿Busca trabajo? ¡Regístrese como postulante!</button>
    <button @click = "goRegistrationEmpresa" class="register-button">¿Ofrece trabajo? ¡Regístrese como empresa!</button>
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
    goRegistrationEmpresa(){
      this.$router.push("/registroEmpresa");
    }, 
    goRegistrationPostulante(){
      this.$router.push("/registroPostulante")
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
          if (usuario.usuario.tipo === "postulante") {
            localStorage.setItem(
              "postulanteAutenticado",
              JSON.stringify(usuario)
            );
            this.$router.push(`/perfilPostulante/${usuario.idPostulante}`);
          } else if (usuario.usuario.tipo === "empresa") {
            localStorage.setItem("empresaAutenticada", JSON.stringify(usuario));
            this.$router.push(`/perfilEmpresa/${usuario.idEmpresa}`);
          } else if (usuario.usuario.tipo === "admin") {
            localStorage.setItem("adminAutenticado", JSON.stringify(usuario));
            this.$router.push("/admin");
          }
        })
        .catch((error) => {
          console.error("Error de inicio de sesión:", error);
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #004aad;
}

.login-logo {
  width: 250px;
  height: 150px;
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
  margin-top: 1rem;
}
</style>
