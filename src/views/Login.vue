<template>
  <div class="auth">
    <div class="container">
      <form class="auth__inner" @submit.prevent="submitHandler">
        <fieldset>
          <legend>Welcome</legend>
          <BaseInput
            label="Email"
            type="email"
            v-model="log_form.email"
            :required="true"
          />
          <BaseInput
            label="Password"
            type="password"
            v-model="log_form.password"
            :required="true"
          />
          <button class="btn" type="submit">
            Sign in
            <BaseIcon class="icon" name="log" />
          </button>
        </fieldset>
        <h5>
          Don't have an account?
          <router-link to="/register">register</router-link>
        </h5>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseIcon from "@/components/BaseComponents/BaseIcon.vue";

export default {
  setup() {
    const store = useStore();

    const log_form = ref({});

    const submitHandler = () => {
      store.dispatch("login", log_form.value);
    };

    return {
      submitHandler,
      log_form,
    };
  },
  components: { BaseInput, BaseIcon },
};
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &__inner {
    min-width: 370px;
    padding: 34px 60px;
    border-radius: 8px;
    background-color: $white;
    fieldset {
      width: 100%;
      legend {
        font-size: $fs-board-title;
        font-weight: $fw-bold;
        text-align: center;
        margin-bottom: 20px;
      }
      .btn {
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 9px 0 10px 0;
        color: $white;
        background-color: black;
        margin-top: 20px;
        .icon {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
