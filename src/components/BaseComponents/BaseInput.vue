<template>
  <label class="label" v-if="label">{{ label }}</label>
  <input
    class="input"
    :type="type"
    :placeholder="label"
    :value="modelValue"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
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
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {};
  },
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  display: block;
  margin: 8px 0;
  font-size: $fs-column-title;
}

.input {
  width: 100%;
  border: 1px solid $black;
  padding: 12px 15px;
  font-family: inherit;
  font-size: $fs-column-title;
}
</style>
