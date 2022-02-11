<template>
  <div class="auth">
    <div class="container">
      <form class="auth__inner" @submit.prevent="submitHandler">
        <fieldset>
          <legend>Welcome</legend>
          <BaseInput label="Email" type="email" v-model="email" />
          <span>{{ emailError }}</span>
          <BaseInput label="Name" type="text" v-model="name" />
          <span>{{ nameError }}</span>
          <BaseInput label="Password" type="password" v-model="password" />
          <span>{{ passwordError }}</span>
          <button class="btn" type="submit">
            Sign Up
            <BaseIcon class="icon" name="log" />
          </button>
        </fieldset>
        <h5>
          Have an account?
          <router-link to="/login">login</router-link>
        </h5>
      </form>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import BaseIcon from "@/components/BaseComponents/BaseIcon.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";

export default {
  setup() {
    const store = useStore();

    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
    });

    useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("fieldName");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const reg_form = ref({
      email,
      password,
      name,
    });

    const submitHandler = () => {
      store.dispatch("register", reg_form.value);
    };

    return {
      submitHandler,
      reg_form,
      email,
      emailError,
      password,
      passwordError,
      name,
      nameError,
    };
  },
  components: { BaseIcon, BaseInput },
};
</script>

<style lang="scss" scoped>
.auth {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &__inner {
    max-width: 370px;
    padding: 34px 60px;
    border-radius: 8px;
    background-color: $white;
    width: 100%;
    fieldset {
      width: 100%;
      legend {
        font-size: $fs-board-title;
        font-weight: $fw-bold;
        text-align: center;
        margin-bottom: 20px;
      }
      span {
        display: block;
        margin-top: 5px;
        font-size: $fs-ticket-text;
        color: red;
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
