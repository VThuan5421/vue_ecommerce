<template>
    <div class = "login-main padding-half">
        <form @submit.prevent="submitForm" class = "container-fluid login-form">
            <h2 class = "login-title padding-half center">LOGIN</h2>
            <div class = "form-group">
                <label for = "username">Username</label>
                <input type = "text" placeholder = "Your username" v-model="username">
            </div>
            <div class = "form-group">
                <label for = "password">Password</label>
                <input type = "password" placeholder="Your password" v-model="password">
            </div>
            <div class = "is-danger" v-if="errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <button class = "btn-login" id = "login" type = "submit">Login</button>
            <hr>
            <div class = "to-login right">
                Or <router-link to="/sign-up">Click here</router-link> to Sign Up!
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import '../assets/css/login.css'
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Log In | Random'
    },
    methods: {
        async submitForm() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            const formData = {
                username: this.username,
                password: this.password
            }
            await axios
                .post("/api/v1/token/login/", formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common["Authorization"] = "Token" + token
                    localStorage.setItem("token", token)
                    const toPath = this.$route.query.to || '/cart'
                    this.$router.push(toPath)
                })
                .catch(error => {
                    if(error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        } 
                    } else {
                        
                    }
                })
        }
    }
}
</script>