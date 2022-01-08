<template>
  <div class="container">
    <TheHeader />
    <div class="board">
      <div class="board__column">
        <BaseIcon name="plus" />
        <input
          class="input"
          placeholder="Add another column"
          @keyup.enter="addColumn"
          v-model="newColumnName"
        />
      </div>

      <div
        class="board__inner"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
      >
        <div class="title">
          <h3>{{ column.name }}</h3>
          <BaseIcon name="more" />
        </div>
        <ul class="task__list">
          <li
            class="task__list-item"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goToTask(task)"
            v-show="task.name"
          >
            <h5>{{ task.name }}</h5>
            <p>{{ task.description }}</p>
            <!-- <BaseIcon name="pencil" /> -->
          </li>
        </ul>
        <div class="add">
          <BaseIcon name="plus" />
          <input
            class="btn"
            placeholder="Add a card"
            @keyup.enter="addTask($event, column.tasks)"
          />
        </div>
      </div>
      <div v-if="isPopupOpen" class="board__popup">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et molestias
        veritatis quo nihil ab consequuntur voluptatibus fuga, provident sunt
        quisquam quibusdam! Sapiente porro delectus, quibusdam corporis aliquam
        dolores qui ad.
      </div>
    </div>
    <div
      class="task"
      v-if="isTaskOpen"
      @click.self="close"
      @keypress.enter="close"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/BaseComponents/BaseIcon.vue";
import TheHeader from "@/components/TheHeader.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
      // console.log(task.id);
    },
    close() {
      this.$router.push({ name: "board" });
    },
    addTask(e, tasks) {
      this.$store.commit("ADD_TASK", {
        tasks,
        name: e.target.value,
      });
      e.target.value = "";
    },
    addColumn() {
      this.$store.commit("ADD_COLUMN", {
        name: this.newColumnName,
      });
      this.newColumnName = "";
    },
  },

  components: { BaseIcon, TheHeader },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 13px;
  width: 13px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
  bottom: 0;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.board {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-flow: column;
  column-gap: 33px;
  overflow: auto;
  min-height: 530px;

  &__column {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-size: inherit;
    justify-content: start;
    padding: 10px 15px;
    max-width: 300px;
    max-height: 40px;
    // height: max-content;
    background-color: $white;
    border-radius: 4px;
    .input {
      width: 100%;
      font-family: inherit;
      font-size: inherit;
    }
  }

  &__popup {
    background-color: red;
  }

  &__inner {
    position: relative;
    background-color: $white;
    padding: 10px 15px;
    border-radius: 4px;
    max-width: 300px;
    width: 100%;
    height: max-content;
    margin-bottom: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .task__list {
      display: flex;
      flex-direction: column;
      overflow: auto;
      max-height: 399px;
      padding: 0 10px 0 0;

      &-item {
        position: relative;
        word-break: break-all;
        background-color: $main-bg;
        padding: 10px 15px;
        border-radius: 4px;
        margin: 5px 0;
        cursor: pointer;
        // max-width: 245px;
        width: 100%;

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
        }
        p {
          margin-top: 2px;
          color: gray;
          font-size: $fs-label;
        }
      }
    }
    .add {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 20px;
      .btn {
        display: flex;
        align-items: center;
        font-family: inherit;
        font-size: inherit;
        background: none;
      }
    }
  }
}

.task {
  display: flex;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

::placeholder {
  color: $black;
}
</style>
