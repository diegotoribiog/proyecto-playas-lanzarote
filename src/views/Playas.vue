<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePlayas } from '../composables/usePlayas'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

const { busqueda, filtros, playasFiltradas } = usePlayas()
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const clima = ref(null)
const playaSeleccionada = ref(null)
const router = useRouter()
const route = useRoute()

function crearSlug(nombre) {
    return nombre
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '')
}

function seleccionarPlaya(playa) {
    const slug = crearSlug(playa.properties.Nombre)
    router.push(`/playas/${slug}`)
}

// Actualizar la playa seleccionada
watch(
    () => route.params.slug,
    (slug) => {
    if (!slug) {
        playaSeleccionada.value = null
        return
    }
    // Buscar la playa dentro de todas las features
    playaSeleccionada.value = playasFiltradas.value.find(
            playa => crearSlug(playa.properties.Nombre) === slug
    )
    },
    { immediate: true }
)

//Actualizar el clima
watch(playaSeleccionada, async (playa) => {
    if (!playa) {
        clima.value = null
        return
    }

    const [lng, lat] = playa.geometry.coordinates

    try {
        const respuesta = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lng}&lang=es`)
        const data = await respuesta.json()
        clima.value = data.current
    } catch (error) {
        console.error("Error al cargar el clima:", error)
        clima.value = null
    }
}, { immediate: true })
</script>

<template>
<div class="h-screen flex flex-col">

    <!-- Barra superior -->
    <Header />

    <!-- Contenido principal -->
    <div class="flex flex-1 overflow-hidden">

        <!-- Barra lateral -->
        <sidebar />

        <!-- Información de la playa -->
        <main class="flex-1 p-6 overflow-y-auto space-y-4">

            <div v-if="playaSeleccionada" class="space-y-4">

                <!-- Cuadro de información general -->
                <div class="bg-white shadow rounded p-4 space-y-2">
                    <h2 class="text-2xl font-bold">{{ playaSeleccionada.properties.Nombre }}</h2>
                    <p><strong>Municipio:</strong> {{ playaSeleccionada.properties.Término_M }}</p>
                    <p><strong>Tipo de arena:</strong> {{ playaSeleccionada.properties.Tipo_de_ar }}</p>
                    <p><strong>Acceso:</strong> {{ playaSeleccionada.properties.Forma_de_a }}</p>
                    <p><strong>Acceso para discapacitados:</strong> {{ playaSeleccionada.properties.Acceso_dis }}</p>
                    <p><strong>Longitud:</strong> {{ playaSeleccionada.properties.Longitud }}</p>
                    <p><strong>Anchura:</strong> {{ playaSeleccionada.properties.Anchura }}</p>
                    <p><strong>Condiciones:</strong> {{ playaSeleccionada.properties.Condicione }}</p>
                    <p><strong>Grado de ocupación:</strong> {{ playaSeleccionada.properties.Grado_ocup }}</p>
                    <p><strong>Grado de urbanización:</strong> {{ playaSeleccionada.properties.Grado_urba }}</p>
                    <p><strong>Nudismo:</strong> {{ playaSeleccionada.properties.Nudismo }}</p>
                </div>

                <!-- Cuadro de clima -->
                <div v-if="clima" class="bg-white shadow rounded p-4 mt-4">
                <h2 class="font-bold text-2xl mb-2 flex items-center">Clima actual: <img :src="clima.condition.icon" alt="Icono del clima"></h2>
                <div class="flex items-center space-x-3">
                    <div>
                        <p><strong>Temperatura:</strong> {{ clima.temp_c }}°C</p>
                        <p><strong>Condición:</strong> {{ clima.condition.text }}</p>
                        <p><strong>Viento:</strong> {{ clima.wind_kph }} km/h</p>
                        <p><strong>Humedad:</strong> {{ clima.humidity }}%</p>
                    </div>
                </div>
                </div>

                <!-- Cuadro de descripción -->
                <div class="bg-white shadow rounded p-4">
                    <h3 class="font-bold text-lg mb-2">Descripción</h3>
                    <p>{{ playaSeleccionada.properties.Descripci }}</p>
                </div>

                <!-- Cuadro de servicios -->
                <div class="bg-white shadow rounded p-4">
                    <h3 class="font-bold text-lg mb-2">Servicios</h3>
                    <ul class="flex flex-col space-y-1">
                        <li>
                            <input type="checkbox" :checked="playaSeleccionada.properties.Aseos === 'Sí'" disabled /> Aseos
                        </li>
                        <li>
                            <input type="checkbox" :checked="playaSeleccionada.properties.Duchas === 'Sí'" disabled /> Duchas
                        </li>
                        <li>
                            <input type="checkbox" :checked="playaSeleccionada.properties.Aparcamien === 'Sí'" disabled /> Aparcamiento
                        </li>
                        <li>
                            <input type="checkbox" :checked="playaSeleccionada.properties['Autobús'] === 'Sí'" disabled /> Autobús
                        </li>
                        <li>
                            <input type="checkbox" :checked="playaSeleccionada.properties.Papelera === 'Sí'" disabled /> Papelera
                        </li>
                    </ul>
                </div>

            </div>

        </main>

    </div>
</div>
</template>