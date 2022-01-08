<template>
  <label class="label" v-if="label">{{ label }}</label>
  <input
    class="input"
    :type="type"
    :placeholder="label"
    :value="modelValue"
    @focus="focused = true"
    @blur="focused = false"
  />
</template>

<script>
export default {
  data() {
    return {
      focused: false,
    };
  },
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  display: block;
  margin: 8px 0;
  font-size: $fs-ticket-text;
}

.input {
  width: 100%;
  border: 1px solid $black;
  padding: 10px 15px;
  font-family: inherit;
}

.focused {
  border: 1px solid red;
}
</style>
