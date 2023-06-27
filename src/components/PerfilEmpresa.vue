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
      <q-btn
        color="primary"
        label="Regresar a inicio"
        class="regresar-btn"
        @click="regresar"
      ></q-btn>

      <q-btn
        v-if="esEmpresaAutenticada"
        color="primary"
        label="Crear Oferta"
        class="crear-oferta-btn"
        @click="crearOferta"
      ></q-btn>
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
    };
  },
  created() {
    const id = this.$route.params.id;
    this.obtenerDatosEmpresa(id);
  },
  computed: {
    esEmpresaAutenticada() {
      const empresaAutenticada = JSON.parse(
        localStorage.getItem("usuarioAutenticado")
      );

      const empresaAutenticadaId = empresaAutenticada
        ? empresaAutenticada.idUsuario.toString()
        : null;
      return empresaAutenticadaId === this.$route.params.id;
    },
  },
  methods: {
    obtenerDatosEmpresa(id) {
      axios
        .get(`http://localhost:5158/api/Empresa/GetByUsuario/${id}`)
        .then((response) => {
          this.empresa = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos de la empresa:", error);
        })
        .finally(() => {
          this.mostrarPerfilEmpresa = true; // Marcamos que se han obtenido los datos de la empresa
        });
    },
    regresar() {
      this.$router.push("/home");
    },
    crearOferta() {
      this.$router.push("/crearOferta");
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

/* Estilos de fuente atractivos */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

h1,
h2,
p,
button {
  font-family: "Poppins", sans-serif;
}
</style>
