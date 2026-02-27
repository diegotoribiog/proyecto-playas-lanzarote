<script setup>
import { computed } from 'vue'
import { usePlayas } from '../composables/usePlayas'
import Header from '../components/Header.vue'

const { playasData } = usePlayas()

// Total de playas
const totalPlayas = computed(() => {
    return playasData.value.length
})

//Total y porcentaje de aseos
const totalAseos = computed(() => {
    return playasData.value.filter(playa => {
    return playa.properties.Aseos === 'Sí'
    }).length
})

const porcentajeAseos = computed(() =>
  ((totalAseos.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de duchas
const totalDuchas = computed(() => {
    return playasData.value.filter(playa => {
    return playa.properties.Duchas === 'Sí'
    }).length
})

const porcentajeDuchas = computed(() =>
  ((totalDuchas.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de papeleras
const totalPapeleras = computed(() => {
    return playasData.value.filter(playa => {
    return playa.properties.Papelera === 'Sí'
    }).length
})

const porcentajePapeleras = computed(() =>
  ((totalPapeleras.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de aparcamientos
const totalAparcamientos = computed(() => {
    return playasData.value.filter(playa => {
    return playa.properties.Aparcamien === 'Sí'
    }).length
})

const porcentajeAparcamientos = computed(() =>
  ((totalAparcamientos.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de autobuses
const totalAutobuses = computed(() => {
    return playasData.value.filter(playa => {
    return playa.properties['Autobús'] === 'Sí'
    }).length
})

const porcentajeAutobuses = computed(() =>
  ((totalAutobuses.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de niveles de ocupación
const ocupacionAlta = computed(() =>
    playasData.value.filter(p => p.properties.Grado_ocup === 'Alto').length
)
const ocupacionMedia = computed(() =>
    playasData.value.filter(p => p.properties.Grado_ocup === 'Medio').length
)
const ocupacionBaja = computed(() =>
    playasData.value.filter(p => p.properties.Grado_ocup === 'Bajo').length
)

const porcentajeOcupacionAlta = computed(() =>
  ((ocupacionAlta.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeOcupacionMedia = computed(() =>
  ((ocupacionMedia.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeOcupacionBaja = computed(() =>
  ((ocupacionBaja.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de tipos de arena
const arenaDorada = computed(() =>
    playasData.value.filter(p => p.properties.Tipo_de_ar.trim().toLowerCase() === 'dorada').length
)
const arenaBlanca = computed(() =>
    playasData.value.filter(p => p.properties.Tipo_de_ar.trim().toLowerCase() === 'blanca').length
)
const arenaOscura = computed(() =>
    playasData.value.filter(p => p.properties.Tipo_de_ar.trim().toLowerCase() === 'oscura').length
)

// Porcentajes
const porcentajeArenaDorada = computed(() =>
  ((arenaDorada.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeArenaBlanca = computed(() =>
  ((arenaBlanca.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeArenaOscura = computed(() =>
  ((arenaOscura.value / totalPlayas.value) * 100).toFixed(1)
)

//Total y porcentaje de tipos de acceso
const accesoFacil = computed(() =>
    playasData.value.filter(p => p.properties.Forma_de_a.includes('A pie fácil')).length
)
const accesoDificil = computed(() =>
    playasData.value.filter(p => p.properties.Forma_de_a.includes('A pie difícil')).length
)
const accesoCoche = computed(() =>
    playasData.value.filter(p => p.properties.Forma_de_a.includes('Coche')).length
)
const accesoBarco = computed(() =>
    playasData.value.filter(p => p.properties.Forma_de_a.includes('Barco')).length
)

// Porcentajes
const porcentajeAccesoFacil = computed(() =>
  ((accesoFacil.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeAccesoDificil = computed(() =>
  ((accesoDificil.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeAccesoCoche = computed(() =>
  ((accesoCoche.value / totalPlayas.value) * 100).toFixed(1)
)
const porcentajeAccesoBarco = computed(() =>
  ((accesoBarco.value / totalPlayas.value) * 100).toFixed(1)
)
</script>
<template>
<!-- Barra superior -->
<Header />

<div class="p-6 space-y-6">

    <!-- Primera fila: Total de playas + Servicios -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Total de playas -->
        <div class="bg-white shadow rounded-lg p-6 flex flex-col justify-center items-center">
        <h1 class="text-xl font-bold mb-2">Total de playas</h1>
        <p class="text-3xl font-semibold">{{ totalPlayas }}</p>
        </div>

        <!-- Servicios disponibles -->
        <div class="bg-white shadow rounded-lg p-4">
        <h1 class="text-xl font-bold mb-4 text-center">Servicios disponibles</h1>
        <div class="flex flex-wrap justify-around gap-4">
            <div class="flex flex-col items-center">
            <span class="text-2xl ">🚻</span>
            <p class="font-semibold">Aseos</p>
            <p class="font-semibold">{{ totalAseos }} → {{ porcentajeAseos }}%</p>
            </div>
            <div class="flex flex-col items-center">
            <span class="text-2xl">🚿</span>
            <p class="font-semibold">Duchas</p>
            <p class="font-semibold">{{ totalDuchas }} → {{ porcentajeDuchas }}%</p>
            </div>
            <div class="flex flex-col items-center">
            <span class="text-2xl">🗑️</span>
            <p class="font-semibold">Papeleras</p>
            <p class="font-semibold">{{ totalPapeleras }} → {{ porcentajePapeleras }}%</p>
            </div>
            <div class="flex flex-col items-center">
            <span class="text-2xl">🅿️</span>
            <p class="font-semibold">Aparcamiento</p>
            <p class="font-semibold">{{ totalAparcamientos }} → {{ porcentajeAparcamientos }}%</p>
            </div>
            <div class="flex flex-col items-center">
            <span class="text-2xl">🚌</span>
            <p class="font-semibold">Autobús</p>
            <p class="font-semibold">{{ totalAutobuses }} → {{ porcentajeAutobuses }}%</p>
            </div>
        </div>
        </div>

    </div>

    <!-- Segunda fila: Niveles de ocupación + Arena + Accesos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Niveles de ocupación -->
        <div class="bg-white shadow rounded-lg p-4">
        <h1 class="text-xl font-bold mb-4 text-center">Niveles de ocupación</h1>
        <div class="space-y-3">
            <div>
            <p class="font-semibold">Alto: {{ ocupacionAlta }} → {{ porcentajeOcupacionAlta }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-blue-500 h-4 rounded" :style="{ width: porcentajeOcupacionAlta + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Medio: {{ ocupacionMedia }} → {{ porcentajeOcupacionMedia }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-blue-500 h-4 rounded" :style="{ width: porcentajeOcupacionMedia + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Bajo: {{ ocupacionBaja }} → {{ porcentajeOcupacionBaja }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-blue-500 h-4 rounded" :style="{ width: porcentajeOcupacionBaja + '%' }"></div>
            </div>
            </div>
        </div>
        </div>

        <!-- Tipos de arena -->
        <div class="bg-white shadow rounded-lg p-4">
        <h1 class="text-xl font-bold mb-4 text-center">Tipos de arena</h1>
        <div class="space-y-3">
            <div>
            <p class="font-semibold">Dorada: {{ arenaDorada }} → {{ porcentajeArenaDorada }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-orange-500 h-4 rounded" :style="{ width: porcentajeArenaDorada + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Blanca: {{ arenaBlanca }} → {{ porcentajeArenaBlanca }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-orange-500 h-4 rounded" :style="{ width: porcentajeArenaBlanca + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Oscura: {{ arenaOscura }} → {{ porcentajeArenaOscura }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-orange-500 h-4 rounded" :style="{ width: porcentajeArenaOscura + '%' }"></div>
            </div>
            </div>
        </div>
        </div>

        <!-- Tipos de acceso -->
        <div class="bg-white shadow rounded-lg p-4">
        <h1 class="text-xl font-bold mb-4 text-center">Tipos de acceso</h1>
        <div class="space-y-3">
            <div>
            <p class="font-semibold">A pie fácil: {{ accesoFacil }} → {{ porcentajeAccesoFacil }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-green-500 h-4 rounded" :style="{ width: porcentajeAccesoFacil + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">A pie difícil: {{ accesoDificil }} → {{ porcentajeAccesoDificil }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-green-500 h-4 rounded" :style="{ width: porcentajeAccesoDificil + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Coche: {{ accesoCoche }} → {{ porcentajeAccesoCoche }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-green-500 h-4 rounded" :style="{ width: porcentajeAccesoCoche + '%' }"></div>
            </div>
            </div>
            <div>
            <p class="font-semibold">Barco: {{ accesoBarco }} → {{ porcentajeAccesoBarco }}%</p>
            <div class="bg-gray-200 h-4 rounded">
                <div class="bg-green-500 h-4 rounded" :style="{ width: porcentajeAccesoBarco + '%' }"></div>
            </div>
            </div>
        </div>
        </div>

    </div>

</div>
</template>