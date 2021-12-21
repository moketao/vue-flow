<script lang="ts" setup>
import Header from './Header.vue'
</script>
<template>
  <Header />
  <div style="height: calc(100% - 40px)">
    <router-view />
  </div>
</template>
