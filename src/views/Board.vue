<template>
  <div class="container">
    <div class="board">
      <div
        class="board__inner"
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
      >
        <div class="title">
          <h3>{{ column.name }}</h3>
          <BaseIcon
            @click="removeColumn($event, board.columns, $columnIndex)"
            name="cancel"
            class="icon"
          >
          </BaseIcon>
        </div>
        <ul class="task__list">
          <li
            class="task__list-item"
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            @click="goToTask(task, column.tasks, $taskIndex)"
            v-show="task.name"
          >
            <h5>{{ task.name }}</h5>
            <p>{{ task.description }}</p>
          </li>
          <div class="add">
            <BaseIcon name="plus" />
            <input
              class="btn"
              placeholder="Add a task"
              @keyup.enter="addTask($event, column.tasks, board.columns)"
            />
          </div>
        </ul>
      </div>
      <div class="board__column">
        <BaseIcon name="plus" />
        <input
          class="input"
          placeholder="Add another column"
          @keyup.enter="addColumn($event, board.columns, column)"
          v-model="newColumnName"
        />
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
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    ...mapGetters(["getColumn"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
    name(task) {
      return this.getColumn(task.name);
    },
  },
  methods: {
    goToTask(task, tasks, index) {
      this.$router.push({
        name: "task",
        params: {
          id: task.id,
          tasks,
          index,
        },
      });
    },
    close() {
      this.$router.push({ name: "board" });
    },
    addTask(e, tasks, columns) {
      this.$store.commit("ADD_TASK", {
        name: e.target.value,
        tasks,
      });
      try {
        this.$store.dispatch("addTask", {
          name: e.target.value,
          tasks,
          columns,
        });
        this.newColumnName = "";
      } catch (e) {
        console.log(e);
      }

      e.target.value = "";
    },
    addColumn(e, columns, column) {
      if (!this.newColumnName == " ") {
        this.$store.commit("ADD_COLUMN", {
          name: this.newColumnName,
          columns,
        });
        try {
          this.$store.dispatch("addColumn", {
            name: this.newColumnName,
            columns,
            column,
          });
          this.newColumnName = "";
        } catch (e) {
          console.log(e);
        }
      }
    },
    removeColumn(e, columns, index) {
      this.$store.commit("REMOVE_COLUMN", {
        columns,
        index,
      });
      try {
        this.$store.dispatch("removeColumn", {
          name: this.newColumnName,
          columns,
          index,
        });
        this.newColumnName = "";
      } catch (e) {
        console.log(e);
      }

      // try {
      //   this.$store.dispatch("removeColumn", {
      //     name: this.newColumnName,
      //   });
      //   this.newColumnName = "";
      // } catch (e) {
      //   console.log(e);
      // }
    },
  },

  components: { BaseIcon },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  position: absolute;
  height: 13px;
  width: 13px;
  margin-right: 20px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
  left: 0;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
  left: 0;
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
    width: 300px;
    max-height: 40px;
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
    width: 300px;
    width: 100%;
    height: max-content;
    margin-bottom: 20px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 -3px 6px 0;
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
  height: 101%;
  background: rgba(0, 0, 0, 0.5);
  padding: 0 10px;
}

::placeholder {
  color: $black;
}
</style>
