<template>
  <div class="home-page">
    <header class="header">
      <div class="logo">
        <img src="src/assets/jobsitelogo.png" alt="Logo" />
      </div>
      <div class="buttons">
        <button class="enter-button">Ingresar</button>
        <div class="dropdown">
          <button class="register-button">Registro</button>
          <div class="dropdown-content">
            <a href="#">Usuario</a>
            <a href="#">Empresa</a>
          </div>
        </div>
        <input type="text" class="search-bar" placeholder="Buscar" />
      </div>
    </header>
    <div v-if="ofertas.length > 0" class="ofertas-section">
      <h2 class="ofertas-title">Ofertas disponibles</h2>
      <ul>
        <li v-for="oferta in ofertas" :key="oferta.idOferta">
          <div class="oferta-details">
            <div class="oferta-puesto">
              <strong>Puesto:</strong> {{ oferta.puesto }}
            </div>
            <div class="oferta-empresa">
              <strong>Empresa:</strong> {{ oferta.empresa.nombre }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <footer class="footer">
      <div class="footer-content">
        <p class="rights">Jobsite Todos los Derechos Reservados</p>
        <div class="footer-buttons">
          <button class="contact-button">CONTACTO</button>
          <button class="support-button">SOPORTE</button>
          <button class="privacy-button">Condiciones de Privacidad</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      ofertas: [], // Almacenar las ofertas recibidas del API
    };
  },
  mounted() {
    this.fetchOfertas(); // Llamar al método para obtener las ofertas al cargar el componente
  },
  methods: {
    fetchOfertas() {
      axios
        .get("http://localhost:5158/api/Oferta/GetAll")
        .then((response) => {
          this.ofertas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas:", error);
        });
    },
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #004aad;
  padding: 20px;
  color: white;
}

.logo img {
  width: 50px;
  height: 50px;
}

.buttons {
  display: flex;
  align-items: center;
}

.enter-button {
  background-color: white;
  border: 1px solid #0079c2;
  color: #0079c2;
  padding: 10px 20px;
  margin-right: 10px;
}

.register-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.search-bar {
  border: none;
  padding: 8px;
  background-color: #f9f9f9;
  margin-left: 10px;
}


.ofertas-section {
  width: 100%;
  height: 300px;
  overflow-y: auto;
  background-color: #004aad;
  color: white;
  padding: 20px;
}

.ofertas-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.oferta-details {
  margin-bottom: 15px;
}

.oferta-puesto,
.oferta-empresa {
  font-size: 16px;
}

.footer {
  background-color: #004aad;
  padding: 20px;
  color: white;
  margin-top: 50px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-buttons button {
  background-color: transparent;
  border: none;
  color: white;
  padding: 0 10px;
  margin-right: 10px;
}
</style>
