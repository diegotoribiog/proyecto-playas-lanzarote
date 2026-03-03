<template>
    <header class="bg-blue-600 text-white flex justify-between items-center px-6 py-4">
        
        <h1 class="text-xl font-bold">
        {{ $t('header.title') }}
        </h1>

        <nav class="space-x-4">
        <a href="/playas" class="hover:underline">
            {{ $t('header.beaches') }}
        </a>
        <a href="/mapa" class="hover:underline">
            {{ $t('header.map') }}
        </a>
        <a href="/estadisticas" class="hover:underline">
            {{ $t('header.statistics') }}
        </a>
        </nav>

        <!-- BOTONES IDIOMA -->
        <div class="space-x-2 ml-4">
        <button @click="changeLanguage('es')" class="bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer">
            ES
        </button>
        <button @click="changeLanguage('en')" class="bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-100 cursor-pointer">
            EN
        </button>
        </div>

    </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLanguage(lang) {
    locale.value = lang
    localStorage.setItem('locale', lang)
}
</script>
