<template>
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
  margin-top: 20px;
  overflow-y: auto;
  background-color: #004aad;
  color: white;
  padding: 20px;
  grid-column: 2;
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
