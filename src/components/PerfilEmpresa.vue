<template>
  <div class="perfil-empresa-container">
    <h2 class="pre-titulo">Perfil Empresa</h2>
    <div v-if="empresa">
      <h1 class="titulo">{{ empresa.nombre }}</h1>
      <div class="empresa-info">
        <p><strong>RUC:</strong> {{ empresa.ruc }}</p>
        <p><strong>Dirección:</strong> {{ empresa.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ empresa.telefono }}</p>
      </div>
    </div>
    <div class="botones-container">
      <q-btn color="primary" label="Regresar a inicio" class="regresar-btn" @click="regresar"></q-btn>
      <q-btn v-if="esEmpresaAutenticada" color="primary" label="Crear Oferta" class="crear-oferta-btn"
        @click="crearOferta"></q-btn>
    </div>
    <div class="ofertas-container">
      <h3>Ofertas de la empresa:</h3>
      <div class="ofertas-list" v-if="ofertas.length > 0">
        <div class="oferta-item" v-for="oferta in ofertas" :key="oferta.idOferta">
          <h4>{{ oferta.puesto }}</h4>
          <p><strong>Descripción: </strong>{{ oferta.descripcion }}</p>
          <q-btn color="primary" label="Ver más" class="ver-mas-btn" @click="verDetalles(oferta.idOferta)"></q-btn>
        </div>
      </div>
      <p v-else>No se encontraron ofertas.</p>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PerfilEmpresa",
  data() {
    return {
      empresa: null,
      ofertas: [] // Agregamos la propiedad para almacenar las ofertas de la empresa
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosEmpresa(id);
    this.obtenerOfertasEmpresa(id); // Llamamos a la función para obtener las ofertas de la empresa
  },
  computed: {
    esEmpresaAutenticada() {
      const empresaAutenticada = JSON.parse(localStorage.getItem("empresaAutenticada"));
      const empresaAutenticadaId = empresaAutenticada ? empresaAutenticada.idEmpresa.toString() : null;
      return empresaAutenticadaId === this.$route.params.id;
    },
  },
  methods: {
    obtenerDatosEmpresa(id) {
      axios
        .get(`http://localhost:5158/api/Empresa/${id}`)
        .then((response) => {
          this.empresa = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos de la empresa:", error);
        });
    },
    obtenerOfertasEmpresa(id) {
      axios
        .get(`http://localhost:5158/api/Oferta/${id}/GetByEmpresa`)
        .then((response) => {
          this.ofertas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las ofertas de la empresa:", error);
        });
    },
    regresar() {
      this.$router.push("/home");
    },
    crearOferta() {
      this.$router.push("/crearOferta");
    },
    verDetalles(idOferta) {
      this.$router.push(`/OfertaPostular/${idOferta}`);
    },
  },
};
</script>

<style scoped>
.perfil-empresa-container {
  padding: 20px;
  background-color: #b3e5fc;
  text-align: center;
}

.pre-titulo {
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
}

.titulo {
  font-size: 30px;
  font-weight: bold;
}

.empresa-info {
  margin-top: 20px;
  font-size: 18px;
}

.regresar-btn {
  margin-top: 20px;
}

.crear-oferta-btn {
  margin-top: 20px;
  margin-left: 10px;
}

.botones-container {
  display: flex;
  justify-content: center;
}

.ofertas-container {
  background-color: #a1c5db;
  margin-top: 40px;
  max-height: 400px;
  overflow-y: auto;
}


.ofertas-list {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.oferta-item {
  margin-bottom: 20px;
}

.ver-mas-btn {
  margin-top: 10px;
}

/* Estilos de fuente atractivos */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

h1,
h2,
h3,
h4,
p,
button {
  font-family: "Poppins", sans-serif;
}
</style>
