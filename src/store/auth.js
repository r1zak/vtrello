import router from "../router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase/firebase";
// import { uuid } from "../utils";

export default {
  state: {
    user: null,
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        // const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        console.log(e);
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        // const auth = getAuth();

        const uuid = await dispatch("getUid");
        await createUserWithEmailAndPassword(auth, email, password);
        set(ref(db, "users/" + uuid), {
          name: name,
          email: email,
        });
      } catch (e) {
        console.log(e);
      }
    },
    getUid() {
      return Math.random().toString(36).substring(2);
    },
    async logout({ commit }) {
      await signOut(auth);

      commit("CLEAR_USER");

      router.push("/login");
      console.log("signOut");
    },
    // getUid() {
    //   // const user = getAuth().currentUser;
    //   return uuid;
    // },
  },
};
