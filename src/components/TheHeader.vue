<template>
  <header class="header">
    <!-- <div class="container"> -->
    <div class="header__inner">
      <h1>Vtrello</h1>
      <a class="link" href="#">Log out</a>
    </div>
    <!-- </div> -->
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  padding: 40px 0;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .link {
      color: $black;
    }
  }
}
</style>
