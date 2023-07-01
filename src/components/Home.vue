<template>
  <div>
    <header>
      <div class="header-content">
        <img class="logo" src="src/assets/logoblanco.png" alt="Logo" />
        <div class="buttons">
          <button>Iniciar Sesión</button>
          <div class="dropdown">
            <button>Registro</button>
            <div class="dropdown-content">
              <a href="#">Usuario</a>
              <a href="#">Empresa</a>
            </div>
          </div>
          <button>Mi perfil</button>
        </div>
      </div>
    </header>
    <div class="divider"></div>

    <div class="body">
      <section class="section section1">
        <div class="title">Jobsite, conectando talento</div>
        <div class="subtitle">¿Qué buscas?</div>
        <div class="buttons-wrapper">
          <button class="button left-button">Trabajo</button>
          <button class="button right-button">Talento</button>
        </div>
      </section>

      <section class="section section2">
        <button class="button button1">PRÁCTICAS</button>
        <button class="button button2">ANALISTAS & SENIORS</button>
        <button class="button button3">DIRECTIVOS</button>
      </section>
      <section class="section section3">
        <h1>Estas empresas buscan y consiguen talento en Jobsite</h1>
        <div class="carousel">
          <img src="src/assets/emp1.jpeg" alt="Empresa 1">
          <img src="src/assets/emp2.jpeg" alt="Empresa 2">
          <img src="src/assets/emp3.png" alt="Empresa 3">
          <img src="src/assets/emp4.png" alt="Empresa 4">
        </div>
      </section>
    </div>

    <footer class="footer">
      <button class="footer-button">Política de Privacidad</button>
      <button class="footer-button">Desarrollado por Grupo3 Esan Company</button>
      <button class="footer-button">Las fijas del final</button>
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
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
}

.logo {
  margin-left: 10px;
  height: 50px;
  width: 120px;
}

.buttons {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.buttons button {
  background-color: #fff;
  color: #004aad;
  border: 2px solid #004aad;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.buttons button:hover {
  background-color: #004aad;
  color: #fff;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  display: none;
  background-color: #fff;
  border: 2px solid #004aad;
  padding: 10px;
}

.dropdown-content a {
  display: block;
  padding: 5px 10px;
  color: #004aad;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.divider {
  height: 1px;
  background-color: #004aad;
}

.body {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.section1 {
  background-image: url('src/assets/logohome1.png');
  background-size: cover;
  padding: 20px;
  color: #004aad;
  height: 300px;
}


.title {
  font-size: 40px;
  font-weight: bold;
  margin-top: 20px;
}

.subtitle {
  font-size: 25px;
  color: #000;
  margin-top: 10px;
}

.buttons-wrapper {
  display: flex;
  justify-content: 20px;
  margin-top: 20px;
  height: 30px;
  width: 30px;
}

.left-button,
.right-button {
  background-color: #004aad;
  color: #fff;
  padding: 40px 100px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 15px;
}

.section2 {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.button {
  flex: 1;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

.button1 {
  background-image: url('src/assets/botonhome1.png');
  padding: 80px;
  color: #052e63;
}

.button2 {
  background-image: url('src/assets/botonhome222.png');
  padding: 80px;
  color: #052e63;

}

.button3 {
  background-image: url('src/assets/botonhome33.png');
  padding: 80px;
  color: #052e63;
}

.section3 {
  background-color: #004aad;
  text-align: center;
  padding: 50px 0;
}

.section3 h1 {
  color: #fff;
  font-size: 40px;
}

.carousel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
}

.carousel img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
}

.footer {
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.footer-button {
  color: #004aad;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
