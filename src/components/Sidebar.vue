<template>
    <aside class="w-64 bg-gray-100 flex flex-col">

        <!-- Buscador -->
        <div class="w-full p-2 border border-gray-300">
        <input 
            type="text" 
            v-model="busqueda" 
            :placeholder="$t('sidebar.search_placeholder')" 
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        </div>

        <!-- Filtros con checkboxes -->
        <div class="w-full p-2 border border-gray-300">
        <h2 class="font-bold text-xl mb-2">{{ $t('sidebar.filters') }}</h2>
        <div class="flex flex-col space-y-1">
            <label><input type="checkbox" v-model="filtros.Aseos" /> {{ $t('sidebar.services.toilets') }}</label>
            <label><input type="checkbox" v-model="filtros.Duchas" /> {{ $t('sidebar.services.showers') }}</label>
            <label><input type="checkbox" v-model="filtros.Aparcamiento" /> {{ $t('sidebar.services.parking') }}</label>
            <label><input type="checkbox" v-model="filtros.Autobus" /> {{ $t('sidebar.services.bus') }}</label>
            <label><input type="checkbox" v-model="filtros.Papelera" /> {{ $t('sidebar.services.bin') }}</label>

            <!-- Tipo de arena -->
            <div class="flex flex-col mt-3">
            <h4 class="font-semibold mb-1">{{ $t('sidebar.sand_type.title') }}</h4>
            <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Dorada" /> {{ $t('sidebar.sand_type.golden') }}</label>
            <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Oscura" /> {{ $t('sidebar.sand_type.dark') }}</label>
            <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Blanca" /> {{ $t('sidebar.sand_type.white') }}</label>
            </div>

            <!-- Forma de acceso -->
            <div>
            <h3 class="font-bold mb-2">{{ $t('sidebar.access_type.title') }}</h3>
            <div class="flex flex-col space-y-1">
                <label><input type="checkbox" v-model="filtros.Forma_de_acceso['A pie fácil']" /> {{ $t('sidebar.access_type.easy_walk') }}</label>
                <label><input type="checkbox" v-model="filtros.Forma_de_acceso['A pie difícil']" /> {{ $t('sidebar.access_type.hard_walk') }}</label>
                <label><input type="checkbox" v-model="filtros.Forma_de_acceso.Coche" /> {{ $t('sidebar.access_type.car') }}</label>
                <label><input type="checkbox" v-model="filtros.Forma_de_acceso.Barco" /> {{ $t('sidebar.access_type.boat') }}</label>
            </div>
            </div>

            <!-- Grado de ocupación -->
            <div class="flex flex-col mt-3">
            <h4 class="font-semibold mb-1">{{ $t('sidebar.occupation.title') }}</h4>
            <select v-model="filtros.Grado_ocup" class="w-full p-2 border border-gray-300 rounded">
                <option value="">{{ $t('sidebar.occupation.all') }}</option>
                <option value="Bajo">{{ $t('sidebar.occupation.low') }}</option>
                <option value="Medio">{{ $t('sidebar.occupation.medium') }}</option>
                <option value="Alto">{{ $t('sidebar.occupation.high') }}</option>
            </select>
            </div>
        </div>
        </div>

        <!-- Listado con scroll -->
        <ul class="flex-1 overflow-y-auto w-full p-2 border border-gray-300">
        <li
            v-for="playa in playasFiltradas"
            :key="playa.properties.OBJECTID"
            class="p-3 hover:bg-blue-100 cursor-pointer"
            @click="onSelectPlaya ? onSelectPlaya(playa) : router.push(`/playas/${crearSlug(playa.properties.Nombre)}`)"
        >
            {{ playa.properties.Nombre }}
        </li>
        </ul>

    </aside>
</template>

<script setup>
import { usePlayas } from '../composables/usePlayas'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

// Router para navegación en caso de no recibir onSelectPlaya
const router = useRouter()

// Composable de playas
const { busqueda, filtros, playasFiltradas, crearSlug } = usePlayas()

// Prop opcional: si la página quiere manejar el click, se pasa onSelectPlaya
const props = defineProps({
    onSelectPlaya: Function
})

// Esto nos permite usar props.onSelectPlaya en el template
const { onSelectPlaya } = props
</script>