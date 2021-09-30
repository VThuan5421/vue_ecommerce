<template>
    <div class = "login-main padding-half">
        <form @submit.prevent="submitForm" class = "container-fluid login-form">
            <h2 class = "login-title padding-bottom center">Sign up</h2>
            <div class = "form-group">
                <label for="username">Username</label>
                <input type = "text" v-model="username">
            </div>
            <!--
            <div class = "form-group percent">
                <div class = "half-percent">
                    <label for="firstname">First name</label>
                    <input type = "text" v-model="first_name">
                </div>
                <div class = "half-percent">
                    <label for="lastname">Last name</label>
                    <input type = "text" v-model="last_name">
                </div>
            </div> -->
            <div class = "form-group">
                <label for="email">Email</label>
                <input type = "email" v-model="email">
            </div>
            <div class = "form-group">
                <label for="password">Password</label>
                <input type = "password" v-model="password">
            </div>
            <div class = "form-group">
                <label for = "password2">Confirm Password</label>
                <input type = "password" v-model = "password2">
            </div>
            <div class = "is-danger" v-if = "errors.length">
                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
            </div>
            <button class = "btn-login" id = "signup">Sign up</button>

            <hr>
            <div class = "to-login right">
                Or <router-link to="/login">Click here</router-link> to log in!
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import {toast} from 'bulma-toast'
import '../assets/css/login.css'
export default {
    name: 'SignUp',
    data() {
        return {
            username: '', first_name: '', last_name: '', email: '',  password: '', password2: '', errors: []
        }
    },
    mounted() {
        document.title = "Sign Up | Random"
    },
    methods: {
        submitForm() {
            this.erros = []

            if(this.username === '') {
                this.errors.push('The username is missing')
            }
            if(this.first_name === '') {
                this.errors.push('The firstname is missing')
            }
            if(this.last_name === '') {
                this.errors.push('The lastname is missing')
            }
            if(this.email === '') {
                this.errors.push('The email is missing')
            }
            if (this.password === '') {
                this.errors.push('The password is too short')
            }
            if (this.password !== this.password2) {
                this.errors.push('The passwords doesn\'t match')
            }
            if(!this.errors.length) {
                const formData = {
                    username: this.username,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    password: this.password
                }
                axios
                    .post("/api/v1/users/", formData)
                    .then(response => {
                        toast({
                            message: 'Account created, please log in!',
                            type: 'is-success',
                            dismissible: true,
                            pauseOnHover: true,
                            duration: 2000,
                            position: 'bottom-right',
                        })
                        this.$router.push('/login')
                    })
                    .catch(error => {
                        if(error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${property}: ${error.response.data[property]}`)
                            }
                            console.log(JSON.stringigy(error.response.data))
                            
                        } else if (error.message) {
                            this.errors.push('Something went wrong!')
                            console.log(JSON.stringify(error))
                        }
                        
                    })
            }
        }
    }

}
</script>