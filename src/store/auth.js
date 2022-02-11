import router from "../router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set, child, get } from "firebase/database";
import { auth, db } from "../firebase/firebase";
import { error } from "../error";
const TOKEN_KEY = "jwt-token";

export default {
  state: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    // CLEAR_USER(state) {
    //   state.user = null;
    // },
    // SET_USER(state, user) {
    //   state.user = user;
    // },
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          console.log(user.accessToken);

          commit("SET_TOKEN", user.accessToken);
          commit("CLEAR_MESSAGE", null, { root: true });
          // commit("SET_USER", auth.currentUser);
          dispatch(
            "setMessage",
            { value: "Welcome", type: "primary" },
            { root: true }
          );

          router.push("/");
        })
        .catch((e) => {
          dispatch(
            "setMessage",
            { value: error(e.code), type: "danger" },
            { root: true }
          );
        });
    },
    async register({ dispatch, commit }, { email, password, name }) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);

          // commit("SET_USER", auth.currentUser);
          dispatch(
            "setMessage",
            { value: "Done", type: "primary" },
            { root: true }
          );
          router.push("/");
        })
        .catch((e) => {
          dispatch(
            "setMessage",
            { value: error(e.code), type: "danger" },
            { root: true }
          );
        });

      const uid = await dispatch("getUid");
      console.log(uid);

      const info = {
        name,
        email,
      };

      set(ref(db, `users/${uid}/info`), info);
    },
    getUid() {
      const user = auth.currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit, dispatch }) {
      await signOut(auth)
        .then(() => {
          router.push("/login");
          // commit("CLEAR_USER");
          dispatch(
            "setMessage",
            {
              value: "Done",
              type: "primary",
            },
            { root: true }
          );
        })
        .catch((e) => {
          console.log(e);
        });

      console.log("signOut");
    },
    fetchUser({ commit, dispatch }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          // commit("CLEAR_USER");
        } else {
          // commit("SET_USER", user);
          const uid = user.uid;
          console.log(uid);

          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      });
    },
  },
  getters: {
    token(state) {
      return state.token;
    },
    isAuthenticated(_, getters) {
      return !!getters.token;
    },
  },
};
