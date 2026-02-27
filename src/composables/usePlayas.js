import { ref, computed } from 'vue'
import playas from '../assets/playasLanzarote.json'
import { useStorage } from '@vueuse/core'

// Estas variables deben estar fuera de la función para que sean compartidas
const busqueda = ref('')
const filtros = ref({
    Aseos: false,
    Duchas: false,
    Aparcamiento: false,
    Autobus: false,
    Papelera: false,
    Grado_ocup: '',
    Tipo_de_arena: {
        Dorada: false,
        Oscura: false,
        Blanca: false
    },
    Forma_de_acceso: {
        'A pie fácil': false,
        'A pie difícil': false,
        Coche: false,
        Barco: false
    }
})
const playasData = useStorage('playas-storage', playas.features)

const propiedadJSON = {
    Aseos: 'Aseos',
    Duchas: 'Duchas',
    Aparcamiento: 'Aparcamien',
    Autobus: 'Autobús',
    Papelera: 'Papelera'
}

function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const playasFiltradas = computed(() => {
    return playasData.value.filter(playa => {
        // Búsqueda
        const coincideNombre = normalizar(playa.properties.Nombre).includes(normalizar(busqueda.value))

        // Filtros básicos
        const coincideBasicos = ['Aseos','Duchas','Aparcamiento','Autobus','Papelera']
            .every(key => !filtros.value[key] || playa.properties[propiedadJSON[key]] === 'Sí')

        // Grado de ocupación
        const coincideGrado = !filtros.value.Grado_ocup || playa.properties.Grado_ocup === filtros.value.Grado_ocup

        // Tipo de arena
        const tipoArena = playa.properties.Tipo_de_ar.trim().toLowerCase()
        const coincideArena =
            (!filtros.value.Tipo_de_arena.Dorada &&
                !filtros.value.Tipo_de_arena.Oscura &&
                !filtros.value.Tipo_de_arena.Blanca) ||
            (filtros.value.Tipo_de_arena.Dorada && tipoArena === 'dorada') ||
            (filtros.value.Tipo_de_arena.Oscura && tipoArena === 'oscura') ||
            (filtros.value.Tipo_de_arena.Blanca && tipoArena === 'blanca')

        // Forma de acceso
        const accesosSeleccionados = Object.entries(filtros.value.Forma_de_acceso)
            .filter(([_, valor]) => valor)
            .map(([clave]) => clave)
        const formaAccesoJSON = playa.properties.Forma_de_a.split('/').map(s => s.trim())
        const coincideAcceso = accesosSeleccionados.length === 0 || accesosSeleccionados.some(a => formaAccesoJSON.includes(a))

        return coincideNombre && coincideBasicos && coincideGrado && coincideArena && coincideAcceso
    })
})

function crearSlug(nombre) {
    return nombre.toLowerCase().replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]/g, '')
}

// Exportamos la misma instancia siempre
export function usePlayas() {
    return { busqueda, filtros, playasFiltradas, playasData, crearSlug }
}