<template>
  <div class="task__inner">
    <div class="text">
      <input class="name" type="text" v-model="task.name" />
      <textarea class="textarea" v-model="task.description"></textarea>
    </div>
    <div class="options">
      <button class="btn" @click="isCoverOpen = true">Change cover</button>
      <button class="btn" @click="removeTask">Delete a task</button>
    </div>
  </div>
  <!-- <div class="cover__inner" v-if="isCoverOpen">
    <h5>Colors</h5>
    <ul class="cover__list">
      <li
        class="cover__list-item"
        v-for="(color, i) in colors"
        :key="i"
        :style="{ backgroundColor: color }"
      >
        {{ color }}
      </li>
    </ul>
  </div> -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isCoverOpen: false,
      colors: ["orange", "purple", "green", "blue", "red", "yellow"],
    };
  },

  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },
  methods: {
    removeTask(task) {
      this.$store.commit("REMOVE_TASK", {
        id: this.$route.params.id,
        tasks: this.$route.params.tasks,
        index: this.$route.params.index,
      });
      this.$store.dispatch("removeTask", {
        id: this.$route.params.id,
        tasks: this.$route.params.tasks,
        index: this.$route.params.index,
      });
      this.$router.push({ name: "board" });
    },
  },
};
</script>

<style lang="scss" scoped>
.task__inner {
  display: flex;
  position: relative;
  background-color: $white;
  padding: 41px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  .text {
    flex: 1 1 90%;
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
  .options {
    .btn {
      text-align: left;
      width: 100%;
      padding: 10px 15px;
      background: $main-bg;
      border-radius: 4px;
    }
    .btn:nth-child(2) {
      margin-top: 7px;
    }
  }
}
.cover__inner {
  background: $main-bg;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 4px;
  top: 11%;
  right: 3%;
  padding: 10px 12px;
  h5 {
    margin-bottom: 14px;
  }
  .cover__list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 19px 16px;
    &-item {
      cursor: pointer;
      height: 34px;
      max-width: 80px;
      width: 100%;
      border-radius: 4px;
    }
  }
}
</style>
