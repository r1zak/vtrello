<template>
  <div v-if="message" :class="['alert', message.type]">
    <h3 class="title" v-if="title">{{ title }}</h3>
    <!-- <pre>{{ message }}</pre> -->
    <p>
      {{ message.value }}
    </p>
    <span class="close" @click="close">&times;</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const TITLE_MAP = {
      primary: "Done!",
      danger: "Error",
      warning: "Attention!",
    };

    const message = computed(() => store.state.message);
    const title = computed(() =>
      message.value ? TITLE_MAP[message.value.type] : null
    );

    return {
      message,
      title,
      close: () => store.commit("CLEAR_MESSAGE"),
    };
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 20px;
  right: 1%;
  padding: 30px 40px 30px 20px;
  background-color: $white;
  // transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  max-width: 300px;
  border-left: 3px solid $white;
  border-radius: 4px;
  .title {
    margin-bottom: 10px;
  }
  .close {
    position: absolute;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: $fs-board-title - 10px;
    cursor: pointer;
  }
}
.primary {
  border-color: $green;
}

.danger {
  border-color: $red;
}

.warning {
  border-color: $orange;
}
</style>
