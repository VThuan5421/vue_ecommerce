<template>
    <div class = "page-account padding-half">
        <div class = "container">
            <div class = "edit-form">
            <form @submit.prevent="submitForm()" class=  "container-fluid login-form">
                <h2 class = "edit-title">Fill information</h2>
                    <div class = "form-group">
                        <label>First name</label>
                        <input type = "text" v-model="first_name">
                    </div>
                    <div class = "form-group">
                        <label>Last name</label>
                        <input type = "text" v-model="last_name">
                    </div>
                    <div class = "form-group">
                        <label>Email</label>
                        <input type = "email" v-model="email">
                    </div>
                    <!--
                    <div class = "form-group">
                        <label>Phone</label>
                        <input type = "text" v-model="phone">
                    </div>
                    <div class = "form-group">
                        <label>Address</label>
                        <input type = "text" v-model="address">
                    </div> -->
                    <div class = "is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>
                    <button class = "btn-login" id = "edit" type = "submit">Save changes</button>
                    <div class = "btn-close center" id = "close-edit" >Close</div>
            </form>
        </div>
            <div class = "row">
                <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 padding-half-top">
                    <div class = "box-user">
                        <div class = "user-info">
                            <div class = "img">
                                <img src = "../assets/images/noavater.jpg" alt = "avatar">
                            </div>
                            <div class = "general">
                                <div class = "general-info">
                                    <div class = "row info">
                                        <span>Firstname:</span>
                                        <span>{{ info.first_name }}</span>
                                    </div>
                                    <div class = "row info">
                                        <span>Lastname:</span>
                                        <span>{{ info.last_name }}</span>
                                    </div>
                                    <!--
                                    <div class = "row info">
                                        <span>Gender:</span>
                                        <span></span>
                                    </div> -->
                                    <div class = "row info">
                                        <button class = "btn-edit" id = "edit">Edit</button>
                                        <button @click="logout()" class = "btn-logout">Log out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class = "user-more-info padding-half-2">
                            <div class = "general">
                                <div class = "general-info">
                                    <div class = "row info">
                                        <span>Email </span>
                                        <span>{{ info.email }}</span>
                                    </div>
                                    <div class = "row info">
                                        <span>Phone:</span>
                                        <span>{{ info.phone }}</span>
                                    </div>
                                    <div class = "row info">
                                        <span>Address 1:</span>
                                        <span>{{ info.address }}</span>
                                    </div>
                                    <div class = "row info">
                                        <span>Address 2:</span>
                                        
                                    </div>
                                    <div class = "row info">
                                        <span>Date join:</span>
                                        <span>{{ todate(info.date_joined) }}</span>
                                    </div>
                                    <div class = "row info">
                                        <span>Last login: </span>
                                        <span>{{ todate(info.last_login) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                    <OrderSummary
                        v-for="order in orders"
                        v-bind:key="order.id"
                        v-bind:order="order" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import OrderSummary from '../components/OrderSummary.vue'
import '../assets/css/login.css'
import { toast } from 'bulma-toast'
export default {
    name: 'MyAccount',
    components: {
        OrderSummary
    },
    data() {
        return {
            orders: [],
            info: [],
            user: '',
            first_name: '',
            last_name: '',
            email: '',
            /*
            phone: '',
            address: '', */
            errors: [],
        }
    },
    mounted() {
        document.title = "My account | Djackets"
        this.getInfoUser()
        this.getMyOrders()
        this.edit()
    },
    methods: {
        submitForm() {
            this.errors = []
            if(this.first_name === '') {
                this.errors.push('The firstname field is missing')
            }
            if(this.last_name === '') {
                this.errors.push('The lastname field is missing')
            }
            /*
            if(this.phone === '') {
                this.errors.push('The phone field is missing')
            }
            if(this.address === '') {
                this.errors.push('The address field is missing')
            } */
            if(!this.errors.length) {
                this.$store.commit('setIsLoading', true)

            }
        },
        async saveinfo() {
            const data = {
                'username': this.info.username,
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                /*
                'phone': this.phone,
                'address': this.address, */
            }
            await axios 
                .post('/api/v1/save/', data)
                .then(response => {
                    toast({
                        message: 'Done! Please refresh page',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                    document.querySelector('.edit-form').classList.remove('active')
                })
                .catch(error => {
                    if(error.response) {
                        for(const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    } else if(errro.message) {
                        this.errors.push('Something went wrong!')
                        console.log(JSON.stringify(error))
                    }
                })
        },
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')
            this.$router.push('/')
        },
        edit() {
            const edit_form = document.querySelector('.edit-form')
            const edit = document.querySelector('.btn-edit')
            const  close = document.querySelector('.btn-close')
            edit.addEventListener('click', () => {
                edit_form.classList.toggle('active')
            })
            close.addEventListener('click', () => {
                edit_form.classList.remove('active')
            })
            /*
            window.addEventListener('scroll', () => {
                edit_form.classList.remove('active')
            }) */

        },
        async getMyOrders() {

            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        async getInfoUser() {
            await axios
                .get('/api/v1/info/')
                .then(response => {
                    this.info = response.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        todate(date) {
            return String(date).slice(0, 19).split('T').reverse().join(' ');
        }
    }
}
</script>