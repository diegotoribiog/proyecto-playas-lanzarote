<template>
    <aside class="w-64 bg-gray-100 flex flex-col">

        <!-- Buscador -->
        <div class="w-full p-2 border border-gray-300">
            <input 
                type="text" 
                v-model="busqueda" 
                placeholder="Buscar playa..." 
                class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
        </div>

        <!-- Filtros con checkboxes -->
        <div class="w-full p-2 border border-gray-300">
            <h2 class="font-bold text-xl mb-2">Filtros:</h2>
            <div class="flex flex-col space-y-1">
                <label><input type="checkbox" v-model="filtros.Aseos" /> Aseos</label>
                <label><input type="checkbox" v-model="filtros.Duchas" /> Duchas</label>
                <label><input type="checkbox" v-model="filtros.Aparcamiento" /> Aparcamiento</label>
                <label><input type="checkbox" v-model="filtros.Autobus" /> Autobús</label>
                <label><input type="checkbox" v-model="filtros.Papelera" /> Papelera</label>

                <!-- Tipo de arena -->
                <div class="flex flex-col mt-3">
                    <h4 class="font-semibold mb-1">Tipo de arena:</h4>
                    <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Dorada" /> Dorada</label>
                    <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Oscura" /> Oscura</label>
                    <label><input type="checkbox" v-model="filtros.Tipo_de_arena.Blanca" /> Blanca</label>
                </div>

                <!-- Forma de acceso -->
                <div>
                    <h3 class="font-bold mb-2">Forma de acceso:</h3>
                    <div class="flex flex-col space-y-1">
                        <label><input type="checkbox" v-model="filtros.Forma_de_acceso['A pie fácil']" /> A pie fácil</label>
                        <label><input type="checkbox" v-model="filtros.Forma_de_acceso['A pie difícil']" /> A pie difícil</label>
                        <label><input type="checkbox" v-model="filtros.Forma_de_acceso.Coche" /> Coche</label>
                        <label><input type="checkbox" v-model="filtros.Forma_de_acceso.Barco" /> Barco</label>
                    </div>
                </div>

                <!-- Grado de ocupación -->
                <div class="flex flex-col mt-3">
                    <h4 class="font-semibold mb-1">Grado de ocupación:</h4>
                    <select v-model="filtros.Grado_ocup" class="w-full p-2 border border-gray-300 rounded">
                        <option value="">Todos</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
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