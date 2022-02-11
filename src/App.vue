<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { computed, onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";

export default {
  setup() {
    const store = useStore();

    const route = useRoute();

    onBeforeMount(() => {
      store.dispatch("fetchUser");
    });

    onMounted(() => {
      store.dispatch("getData");
    });

    return {
      layout: computed(() => route.meta.layout),
      store,
    };
  },

  components: { MainLayout, AuthLayout },
};
</script>
