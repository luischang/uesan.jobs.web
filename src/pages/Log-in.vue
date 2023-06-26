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

    <button class="register-button">¿Busca trabajo? Regístrese</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isButtonHovered: false,
    };
  },
  methods: {
    goToHome() {
      // Redireccionar a la página Home
      this.$router.push("/home");
    },
    login() {
      // Llamada a la API para validar las credenciales del usuario
      // Aquí debes reemplazar la URL y el método con los adecuados para tu API
      axios
        .post("https://api.example.com/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Si las credenciales son válidas, redirige a la página principal o realiza otras acciones necesarias
          this.$router.push("/home");
        })
        .catch((error) => {
          // Si las credenciales no son válidas, muestra un mensaje de error o realiza otras acciones necesarias
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
}
</style>
