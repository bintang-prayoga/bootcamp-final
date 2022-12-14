<template>
    <div class="bg">
        <div class="container-fluid mt-0">
            <div class="row justify-content-end">
                <div class="col-lg-4"></div>
                <div class="col-lg-4">
                    <div
                        class="container-fluid"
                        style="background-color: #474b54"
                    >
                        <div class="text-center">
                            <img
                                src="/image/LogoLogin.jpeg"
                                style="margin-top: 110px"
                                class="mb-5"
                            />
                        </div>
                        <form
                            @submit.prevent="login"
                            method="post"
                            class="mt-3"
                            style="margin-bottom: 230px"
                        >
                            <div class="mb-5">
                                <label
                                    for="passcode"
                                    class="form-label text-light"
                                    >Passcode</label
                                >
                                <input
                                    type="password"
                                    class="form-control"
                                    id="passcode"
                                    v-model="passcode"
                                    name="passcode"
                                />
                            </div>

                            <button
                                type="submit"
                                class="btn btn-info btn-lg mt-5 col-lg-12"
                            >
                                Login
                            </button>
                        </form>
                        <div class="segitiga3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            passcode: "",
        };
    },
    methods: {
        login() {
            this.$store
                .dispatch("userLogin", {
                    email: this.$route.params.email,
                    password: this.passcode,
                })
                .then(() => {
                    this.$router.push({ name: "Open" });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        // check email param
        if (
            this.$route.params.email == undefined ||
            this.$route.params.email == null
        ) {
            this.$router.push({ name: "Login" });
        }

        // check local storage token
        if (localStorage.getItem("token")) {
            this.$router.push({ name: "Open" });
        }
    },
};
</script>

<style>
.bg {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
    background-image: url("/image/loginInfosoft2Rev.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.segitiga3 {
    height: 0px;
    width: 100%;
    border-top: solid 100% #474b54;
    border-left: solid 238px transparent;
    border-right: solid 238px transparent;
    margin-bottom: 20px;
}
</style>
