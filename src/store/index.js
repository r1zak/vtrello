import defaultBoard from "../defaultBoard";
import { saveStatePlugin, uuid } from "../utils";
import auth from "./auth";

import { createStore } from "vuex";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board,
    user: null,
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {
    ADD_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    ADD_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    REMOVE_COLUMN(state, { column }) {
      state.board.columns.splice(column, 1);
    },
  },
  actions: {},
  modules: {
    auth,
  },
});
