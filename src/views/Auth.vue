<template>
  <div class="auth">
    <div class="container">
      <form class="auth__inner">
        <fieldset>
          <legend>Welcome</legend>
          <BaseInput label="Email" type="email" />
          <BaseInput label="Password" type="password" />
          <button class="btn">
            Sign in
            <BaseIcon class="icon" name="log" />
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import BaseIcon from "@/components/BaseComponents/BaseIcon.vue";

export default {
  components: { BaseInput, BaseIcon },
};
</script>

<style lang="scss" scoped>
.auth {
  position: absolute;
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
