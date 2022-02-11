<template>
  <div class="container">
    <TheHeader />
    <AppMessage />
    <router-view />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import AppMessage from "@/components/AppMessage";

export default {
  components: { TheHeader, AppMessage },
};
</script>

<style></style>
