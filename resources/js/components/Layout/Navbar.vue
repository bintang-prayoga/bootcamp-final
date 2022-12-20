<template>
  <nav class="navbar navbar-expand-lg bg-black text-white">
    <div class="container-fluid justify-content-between">
      <router-link to="/">
        <a class="navbar-brand">
          <h3 class="text-white">TubeStream</h3>
        </a>
      </router-link>
      <div class="ms-auto dropdown d-flex">
        <!-- <div
          class="dropdown-toggle d-flex mx-5"

        > -->
        <p class="my-auto mx-2">Good Morning, {{ name }}</p>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt="avatar"
          class="rounded-circle img-fluid dropdown-toggle"
          style="width: 50px"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <!-- </div> -->
        <ul class="dropdown-menu ml-5">
          <li class="dropdown-item" @click="logout()">Log Out</li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    getName() {
      this.name = localStorage.getItem("user");
    },
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.getName();
  },
};
</script>
