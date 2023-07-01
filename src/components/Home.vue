<template>
<<<<<<< HEAD
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
=======
  <div class="home-page">
    <header class="header">
      <div class="logo">
        <img src="src/assets/jobsitelogo.png" alt="Logo" />
      </div>
      <div class="buttons">
        <template v-if="postulanteAutenticado || empresaAutenticada">
          <router-link v-if="empresaAutenticada" :to="'/perfilEmpresa/' + empresaAutenticada.idEmpresa"
            class="profile-button">
            Mi Perfil
          </router-link>
          <router-link v-if="postulanteAutenticado" :to="'/perfilPostulante/' + postulanteAutenticado.idPostulante"
            class="profile-button">
            Mi Perfil
          </router-link>
          <button class="logout-button" @click="cerrarSesion">Cerrar Sesión</button>
        </template>
        <template v-else>
          <router-link to="/Login" class="enter-button">Ingresar</router-link>
          <div class="dropdown">
            <button class="register-button">Registro</button>
            <div class="dropdown-content">
              <router-link to="/RegistroPostulante">Postulante</router-link>
              <router-link to="/RegistroEmpresa">Empresa</router-link>
            </div>
          </div>
        </template>
        <input type="text" class="search-bar" placeholder="Buscar" v-model="filtro"
          @input="!empresaSeleccionada ? fetchOfertas() : filtrarPorEmpresa()" />

      </div>
    </header>
    <div class="ofertas-container">
      <div class="filtrar-empresa-section">
        <label for="empresa-select" class="filter-label">Filtrar por empresa:</label>
        <select id="empresa-select" v-model="empresaSeleccionada" @change="filtrarPorEmpresa" class="filter-select">
          <option value="">Todas las empresas</option>
          <option v-for="empresa in empresas" :key="empresa.idEmpresa">{{ empresa.nombre }}</option>
        </select>
      </div>
      <div v-if="ofertas.length > 0" class="ofertas-section">
        <h2 class="ofertas-title">Ofertas disponibles</h2>
        <ul>
          <li v-for="oferta in ofertas" :key="oferta.idOferta">
            <div class="oferta-details">
              <div class="oferta-puesto">
                <strong>Puesto:</strong> {{ oferta.puesto }}
              </div>
              <div class="oferta-empresa">
                <strong>Empresa: </strong>
                <template v-if="!empresaSeleccionada && oferta.empresa">{{ oferta.empresa.nombre }}</template>
                <template v-else>{{ empresaSeleccionada }}</template>
              </div>
              <button class="ver-mas-button" @click="verMas(oferta)">
                Ver más
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="ofertaSeleccionada" class="detalle-oferta-section">
        <h2 class="detalle-oferta-title">{{ ofertaSeleccionada.puesto }}</h2>
        <div class="detalle-oferta-info">
          <div class="detalle-oferta-empresa">
            <strong>Empresa:</strong>
            <template v-if="!empresaSeleccionada">{{ ofertaSeleccionada.empresa.nombre }}</template>
            <template v-else>{{ empresaSeleccionada }}</template>
          </div>
          <div class="detalle-oferta-descripcion">
            <strong>Descripción:</strong> {{ ofertaSeleccionada.descripcion }}
          </div>
          <div class="detalle-oferta-requisitos">
            <strong>Requisitos:</strong> {{ ofertaSeleccionada.requisitos }}
          </div>
          <div class="detalle-oferta-certificados">
            <strong>Certificados:</strong> {{ ofertaSeleccionada.certificados }}
          </div>
          <div class="detalle-oferta-funciones">
            <strong>Funciones:</strong> {{ ofertaSeleccionada.funciones }}
          </div>
          <div class="detalle-oferta-ubicacion">
            <strong>Ubicación:</strong> {{ ofertaSeleccionada.ubicacion }}
          </div>
          <div class="detalle-oferta-modalidad">
            <strong>Modalidad:</strong> {{ ofertaSeleccionada.modalidad }}
          </div>
          <div class="detalle-oferta-fecha-creacion">
            <strong>Fecha de Creación:</strong> {{ getFormattedDate(ofertaSeleccionada.fechaCreacion) }}
          </div>
        </div>
        <router-link :to="'/OfertaPostular/' + ofertaSeleccionada.idOferta" class="postular-button">
          Ver Oferta
        </router-link>
        <router-link v-if="!empresaSeleccionada" :to="'/perfilEmpresa/' + ofertaSeleccionada.empresa.idEmpresa"
          class="ver-empresa-button">
          Ver Empresa
        </router-link>
        <router-link v-else :to="'/perfilEmpresa/' + ofertaSeleccionada.idEmpresa" class="ver-empresa-button">
          Ver Empresa
        </router-link>

      </div>
>>>>>>> 9b5f2853b5ae20718b9e9dc3f842b85fa85ddb1b
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
      ofertas: [],
      ofertaSeleccionada: null,
      postulanteAutenticado: null,
      empresaAutenticada: null,
      filtro: '',
      empresas: [],
      empresaSeleccionada: '',
    };
  },
  mounted() {

    this.obtenerDatosAutenticados();
    this.fetchEmpresas();
    this.fetchOfertas();
  },
  methods: {

    fetchEmpresas() {
      axios
        .get("http://localhost:5158/api/Empresa/GetAll")
        .then((response) => {
          this.empresas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las empresas:", error);
        });
    },


    fetchOfertas() {
      this.ofertaSeleccionada = null;
      axios
        .get("http://localhost:5158/api/Oferta/GetAll")
        .then((response) => {
          const ofertas = response.data;
          this.ofertas = ofertas.filter((oferta) =>
            oferta.puesto.toLowerCase().includes(this.filtro.toLowerCase())
          );
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas:", error);
        });
    },
    filtrarPorEmpresa() {

      if (this.empresaSeleccionada) {
        const empresa = this.empresas.find(empresa => empresa.nombre.trim().toLowerCase() === this.empresaSeleccionada.trim().toLowerCase());
        if (empresa) {
          const empresaId = empresa.idEmpresa;
          axios.get(`http://localhost:5158/api/Oferta/${empresaId}/GetByEmpresa`)
            .then((response) => {
              const ofertas = response.data;
              this.ofertas = ofertas.filter((oferta) =>
                oferta.puesto.toLowerCase().includes(this.filtro.toLowerCase())
              );
            })
            .catch((error) => {
              console.error("Error al obtener las ofertas de la empresa:", error);
            });
        } else {
          console.error("No se encontró la empresa seleccionada");
        }
      } else {
        this.fetchOfertas();
      }
    },


    verMas(oferta) {
      if (this.ofertaSeleccionada && this.ofertaSeleccionada === oferta) {
        this.ofertaSeleccionada = null;
      } else {
        this.ofertaSeleccionada = oferta;
      };
    },
    getFormattedDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    obtenerDatosAutenticados() {
      const postulanteAutenticado = JSON.parse(localStorage.getItem("postulanteAutenticado"));
      const empresaAutenticada = JSON.parse(localStorage.getItem("empresaAutenticada"));

      if (postulanteAutenticado) {
        this.postulanteAutenticado = postulanteAutenticado;
      }

      if (empresaAutenticada) {
        this.empresaAutenticada = empresaAutenticada;
      }
    },

    cerrarSesion() {
      localStorage.removeItem("postulanteAutenticado");
      localStorage.removeItem("empresaAutenticada");
      this.postulanteAutenticado = null;
      this.empresaAutenticada = null;
      this.$q.notify({
        message: "Sesión cerrada con éxito",
        color: "positive",
        position: "bottom",
        timeout: 3000,
      });
    },
  }
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

<<<<<<< HEAD
.section {
  margin-bottom: 20px;
}

.section1 {
  background-image: url('src/assets/logohome1.png');
  background-size: cover;
  padding: 20px;
  color: #004aad;
  height: 300px;
=======
.ofertas-section {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  overflow-y: auto;
  background-color: #004aad;
  color: white;
  padding: 20px;
  grid-column: 2;
>>>>>>> 9b5f2853b5ae20718b9e9dc3f842b85fa85ddb1b
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


.ver-mas-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 5px 10px;
  margin-top: 10px;
  cursor: pointer;
}

.detalle-oferta-section {
  width: 100%;
  background-color: #004aad;
  color: white;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 300px;
  overflow-y: auto;
  grid-column: 3;
}

.detalle-oferta-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.detalle-oferta-info {
  margin-bottom: 15px;
}

.detalle-oferta-empresa,
.detalle-oferta-descripcion,
.detalle-oferta-requisitos,
.detalle-oferta-certificados,
.detalle-oferta-funciones,
.detalle-oferta-ubicacion,
.detalle-oferta-modalidad,
.detalle-oferta-fecha-creacion {
  font-size: 16px;
  margin-top: 10px;
}

.postular-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  align-self: flex-start;
}

.ofertas-container {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-gap: 20px;
  width: 100%;

}


.profile-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  text-decoration: none;
}

.logout-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.ver-empresa-button {
  background-color: #0079c2;
  border: none;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  align-self: flex-start;
}

.filter-label {
  font-size: 16px;
  margin-right: 10px;
}

.filter-select {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.filtrar-empresa-section {
  width: 100%;
  height: 300px;
  margin-top: 20px;
  overflow-y: auto;
  background-color: #004aad;
  color: white;
  padding: 20px;
  grid-column: 1;
}
</style>
