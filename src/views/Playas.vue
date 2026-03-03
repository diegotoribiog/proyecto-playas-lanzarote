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

// i18n
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
    <div class="h-screen flex flex-col">

    <!-- Barra superior -->
    <Header />

    <!-- Contenido principal -->
    <div class="flex flex-1 overflow-hidden">

        <!-- Barra lateral -->
        <Sidebar />

        <!-- Información de la playa -->
        <main class="flex-1 p-6 overflow-y-auto space-y-4">

        <div v-if="playaSeleccionada" class="space-y-4">

            <!-- Cuadro de información general -->
            <div class="bg-white shadow rounded p-4 space-y-2">
            <h2 class="text-2xl font-bold">{{ $t('details.general_info') }}</h2>
            <p><strong>{{ $t('details.municipio') }}:</strong> {{ playaSeleccionada.properties.Término_M }}</p>
            <p><strong>{{ $t('details.tipo_arena') }}:</strong> {{ playaSeleccionada.properties.Tipo_de_ar }}</p>
            <p><strong>{{ $t('details.acceso') }}:</strong> {{ playaSeleccionada.properties.Forma_de_a }}</p>
            <p><strong>{{ $t('details.acceso_discapacitados') }}:</strong> {{ playaSeleccionada.properties.Acceso_dis }}</p>
            <p><strong>{{ $t('details.longitud') }}:</strong> {{ playaSeleccionada.properties.Longitud }}</p>
            <p><strong>{{ $t('details.anchura') }}:</strong> {{ playaSeleccionada.properties.Anchura }}</p>
            <p><strong>{{ $t('details.condiciones') }}:</strong> {{ playaSeleccionada.properties.Condicione }}</p>
            <p><strong>{{ $t('details.grado_ocupacion') }}:</strong> {{ playaSeleccionada.properties.Grado_ocup }}</p>
            <p><strong>{{ $t('details.grado_urbanizacion') }}:</strong> {{ playaSeleccionada.properties.Grado_urba }}</p>
            <p><strong>{{ $t('details.nudismo') }}:</strong> {{ playaSeleccionada.properties.Nudismo }}</p>
            </div>

            <!-- Cuadro de clima -->
            <div v-if="clima" class="bg-white shadow rounded p-4 mt-4">
            <h2 class="font-bold text-2xl mb-2 flex items-center">
                {{ $t('details.climate') }}: 
                <img :src="clima.condition.icon" alt="Icono del clima">
            </h2>
            <div class="flex items-center space-x-3">
                <div>
                <p><strong>{{ $t('details.temperatura') }}:</strong> {{ clima.temp_c }}°C</p>
                <p><strong>{{ $t('details.condicion') }}:</strong> {{ clima.condition.text }}</p>
                <p><strong>{{ $t('details.viento') }}:</strong> {{ clima.wind_kph }} km/h</p>
                <p><strong>{{ $t('details.humedad') }}:</strong> {{ clima.humidity }}%</p>
                </div>
            </div>
            </div>

            <!-- Cuadro de descripción -->
            <div class="bg-white shadow rounded p-4">
            <h3 class="font-bold text-lg mb-2">{{ $t('details.description') }}</h3>
            <p>{{ playaSeleccionada.properties.Descripci }}</p>
            </div>

            <!-- Cuadro de servicios -->
            <div class="bg-white shadow rounded p-4">
            <h3 class="font-bold text-lg mb-2">{{ $t('details.services') }}</h3>
            <ul class="flex flex-col space-y-1">
                <li>
                <input type="checkbox" :checked="playaSeleccionada.properties.Aseos === 'Sí'" disabled /> {{ t('sidebar.services.toilets') }}
                </li>
                <li>
                <input type="checkbox" :checked="playaSeleccionada.properties.Duchas === 'Sí'" disabled /> {{ t('sidebar.services.showers') }}
                </li>
                <li>
                <input type="checkbox" :checked="playaSeleccionada.properties.Aparcamien === 'Sí'" disabled /> {{ t('sidebar.services.parking') }}
                </li>
                <li>
                <input type="checkbox" :checked="playaSeleccionada.properties['Autobús'] === 'Sí'" disabled /> {{ t('sidebar.services.bus') }}
                </li>
                <li>
                <input type="checkbox" :checked="playaSeleccionada.properties.Papelera === 'Sí'" disabled /> {{ t('sidebar.services.bin') }}
                </li>
            </ul>
            </div>

        </div>

        </main>

    </div>
    </div>
</template>