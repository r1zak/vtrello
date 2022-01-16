<template>
  <header class="header">
    <!-- <div class="container"> -->
    <div class="header__inner">
      <h1>Vtrello</h1>
      <button class="link" href="#" @click="$store.dispatch('logout')">
        Log out
      </button>
    </div>
    <!-- </div> -->
  </header>
</template>

<script>
export default {
  methods: {
    // logout() {
    //   const auth = getAuth();
    //   signOut(auth)
    //     .then(() => {
    //       this.$router.push("/login");
    //       console.log("signOut");
    //     })
    //     .catch((e) => {
    //       // An error happened.
    //       console.log(e);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.header {
  padding: 40px 0;
  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .link {
      font-size: inherit;
      font-weight: inherit;
      background: none;
      color: $black;
    }
  }
}
</style>
