<script setup>
import { onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePlayas } from '../composables/usePlayas'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

// Usamos el composable
const { busqueda, filtros, playasFiltradas, crearSlug } = usePlayas()

let mapa
let capaMarcadores

// Crear mapa al montar
onMounted(() => {
    mapa = L.map('mapa').setView([29.05, -13.65], 11)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    }).addTo(mapa)

  // Grupo para poder borrar marcadores fácilmente
    capaMarcadores = L.layerGroup().addTo(mapa)

    pintarMarcadores()
})

// Cuando cambian filtros o búsqueda -> actualizar marcadores
watch(playasFiltradas, () => {
    capaMarcadores.clearLayers()
    pintarMarcadores()
})

// Función que pinta los markers
function pintarMarcadores() {
    playasFiltradas.value.forEach(playa => {
    const [lng, lat] = playa.geometry.coordinates

    L.marker([lat, lng])
        .addTo(capaMarcadores)
    .bindPopup(`
        <strong>${playa.properties.Nombre}</strong><br>
        Municipio: ${playa.properties.Término_M}<br>
        Tipo de arena: ${playa.properties.Tipo_de_ar}<br>
        Longitud: ${playa.properties.Longitud}<br>
        Acceso: ${playa.properties.Forma_de_a}<br>
        <a href="/playas/${crearSlug(playa.properties.Nombre)}">Ver más</a>
    `)
    })
}

// Mostrar playa seleccionada
function mostrarSoloPlaya(playa) {
    capaMarcadores.clearLayers()

    const [lng, lat] = playa.geometry.coordinates

    L.marker([lat, lng])
    .addTo(capaMarcadores)
    .bindPopup(`
        <strong>${playa.properties.Nombre}</strong><br>
        Municipio: ${playa.properties.Término_M}<br>
        Tipo de arena: ${playa.properties.Tipo_de_ar}<br>
        Longitud: ${playa.properties.Longitud}<br>
        Acceso: ${playa.properties.Forma_de_a}<br>
        <a href="/playas/${crearSlug(playa.properties.Nombre)}">Ver más</a>
    `)
    .openPopup()
}
</script>

<template>
<div class="h-screen flex flex-col">

    <!-- Barra superior -->
    <Header />

    <!-- Contenido principal -->
    <div class="flex flex-1 overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :onSelectPlaya="mostrarSoloPlaya" />

    <!-- Mapa -->
    <main class="flex-1 relative">
        <div id="mapa" class="absolute inset-0"></div>
    </main>

    </div>
</div>
</template>