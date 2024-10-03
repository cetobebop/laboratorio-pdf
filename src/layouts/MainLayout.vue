<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20Kcn0GCRnOztl2XMJ6lTjD_T1Nly76FVAtoSdhuFPF18ZMzgVV3JKO6G4xgyZqx8Gpg&usqp=CAU"
            />
          </q-avatar>
          San Carlos
        </q-toolbar-title>

        <button-dark-mode></button-dark-mode>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import ButtonDarkMode from "src/components/ButtonDarkMode.vue";
</script>
