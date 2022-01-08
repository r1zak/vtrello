<template>
  <div class="task__inner">
    <input class="name" type="text" v-model="task.name" />
    <textarea class="textarea" v-model="task.description"></textarea>
  </div>
</template>

<script>
// import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.task__inner {
  flex-direction: column;
  background-color: $white;
  padding: 40px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  .name {
    width: 100%;
    height: 39px;
    font-family: inherit;
    font-size: $fs-column-title;
    font-weight: $fw-medium;
  }
  .textarea {
    min-height: 60px;
    height: 400px;
    width: 100%;
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
  }
}

// .textfield.focused .name {
//   border: 1px solid $black;
// }
</style>
