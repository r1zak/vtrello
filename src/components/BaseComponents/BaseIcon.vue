<template>
  <svg
    class="icon"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    v-html="path"
  ></svg>
</template>
p
<script>
import icons from "@/icons";

export default {
  props: ["name"],
  data() {
    return {
      path: icons[this.name],
    };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
