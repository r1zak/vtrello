import defaultBoard from "../defaultBoard";
import { saveStatePlugin, uuid } from "../utils";
import auth from "./auth";
import { db } from "../firebase/firebase";
import {
  ref,
  set,
  push,
  child,
  update,
  remove,
  get,
  getDatabase,
} from "firebase/database";
import { createStore } from "vuex";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board,
    message: null,
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
    getColumn(state) {
      return (id) => {
        for (const column of state.board.columns) {
          return column;
        }
      };
    },
  },
  mutations: {
    ADD_TASK(state, { name, tasks }) {
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
    CLEAR_MESSAGE(state) {
      state.message = null;
    },
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    REMOVE_TASK(state, { id, tasks, index }) {
      for (const col of state.board.columns) {
        for (const task of col.tasks) {
          if (task.id === id) {
            task.name = "";
            // col.tasks.splice(index, 1);
          }
        }
      }
    },
    REMOVE_COLUMN(state, { columns, index }) {
      columns.splice(index, 1);
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit("SET_MESSAGE", message);
      setTimeout(() => {
        commit("CLEAR_MESSAGE");
      }, 3000);
    },
    async removeColumns({ dispatch }) {
      const uid = await dispatch("getUid");

      const columnsRef = ref(db, `users/${uid}/columns`);

      remove(columnsRef, (error) => {
        if (error) {
          console.log("Data could not be removed." + error);
        } else {
          console.log("Data removed successfully.");
        }
      });
    },
    getColumnUid() {
      const newColumnKey = push(child(ref(db), "columns")).key;
      return newColumnKey;
    },
    async addTask({ dispatch, commit }, { name, tasks, columns }) {
      dispatch("removeColumns");

      const uid = await dispatch("getUid");

      set(ref(db, `users/${uid}/columns`), columns);
    },
    async addColumn({ dispatch, commit }, { name, columns, column }) {
      dispatch("removeColumns");

      const uid = await dispatch("getUid");

      set(ref(db, `users/${uid}/columns`), columns);
    },
    async removeColumn({ dispatch, commit }, { name, columns, index }) {
      const uid = await dispatch("getUid");

      const columnsRef = ref(db, `users/${uid}/columns/${index}`);

      remove(columnsRef, (error) => {
        if (error) {
          console.log("Data could not be removed." + error);
        } else {
          console.log("Data removed successfully.");
        }
      });
    },
    async removeTask({ dispatch, commit }, { id, tasks, index }) {
      const uid = await dispatch("getUid");
      const columnsRef = ref(
        db,
        `users/${uid}/columns/${index}/tasks/${index}`
      );
      remove(columnsRef, (error) => {
        if (error) {
          console.log("Data could not be removed." + error);
        } else {
          console.log("Data removed successfully.");
        }
      });
    },
    async getData({ dispatch }) {
      const dbRef = ref(getDatabase());
      const uid = await dispatch("getUid");

      get(child(dbRef, `users/${uid}/columns`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  modules: {
    auth,
  },
});
