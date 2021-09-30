<template>
  <div id="wrapper">
    <header class="header">
        <div class="container-fluid">
            <div class="header-content">
                <div class="header-left">
                    <div class="hamburger open-btn">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                    <div class="main-logo">
                        <router-link to ="/" class="logo">Random</router-link>
                    </div>
                    <div class="nav nav-black">
                        <div class="nav nav-red">
                            <div class="nav nav-white">
                                <div class="hamburger-times close-btn">
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                    <div class="bar"></div>
                                </div>
                                <ul class="list">
                                    <li><router-link to = "/t-shirt" class = "nav-item">T-Shirt</router-link></li>
                                    <li><router-link to = "/pants" class = "nav-item">Pants</router-link></li>
                                    <li><router-link to = "/jacket" class = "nav-item">Jacket</router-link></li>
                                    <li><router-link to = "/" class = "nav-item">Skirt</router-link></li>
                                    <li><router-link to = "/" class = "nav-item">Shoes</router-link></li>
                                    <li><router-link to = "/" class = "nav-item">Dresses</router-link></li>
                                    <li><router-link to = "/" class = "nav-item">Makeup</router-link></li>
                                    <li><router-link to = "/" class = "nav-item">Jeans</router-link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header-right">
                    <div class="header-cart">
                        <span class="cart">
                            <router-link to = "/cart" class = "cart-link">
                                <i class = "fas fa-shopping-cart"><div id="badge"> {{ this.cartTotalLength }} </div></i>
                            </router-link>
                        </span>
                    </div>
                    <div class="header-account">
                        <span class="account"><i class = "fas fa-user"></i></span>
                        <div class="account-main">
                            <template v-if="$store.state.isAuthenticated">
                                <router-link to ="/my-account" class="account-link">My Account</router-link>
                                <hr>
                                <button @click="logout()" class = "logout">Log out</button>
                            </template>
                            <template v-else>
                                <span>You are not logged</span>
                                <hr>
                                <router-link to ="/login" class="account-link">Login</router-link>
                            </template>
                        </div>
                    </div>
                    <div class="header-search-wrapper">
                        <span class="search-main">
                        <i class = "fas fa-search"></i>
                    </span>
                        <div class="form-main-search">
                            <form role="search" method="get" class="search-form" action="/search">
                                <label>
                                <input type = "search" class = "search-field" placeholder = "Search..." name = "query">
                            </label>
                                <button class="button-search"><i class = "fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class = "is-loading-bar center" v-bind:class ="{'is-loading': $store.state.isLoading }">
      <div class = "lds-dual-ring"></div>
    </div>
    <section class = "section">
      <router-view/>
    </section>
    <footer class="padding-half bg-black">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-sm-6 footer-column">
                    <h4 class="heading">Who are we?</h4>
                    <hr clcass="half-space">
                    <p class="half-space"></p>
                    <p class="justify">Launched in HCM, Luxuty has grown from a home project to one of the largest food aggregators in the world. We are present in the whole city globally, enabling our vision of better food for mỏe people. We not only connect people to
                        food in every context but work closely with restaurants to enable a sustaniable ecosystem.</p>
                </div>

                <div class="col-md-3 col-sm-6 footer-column">
                    <h4 class="heading">Quick Links</h4>
                    <hr class="half-space">
                    <ul class="widget-links">
                        <li><router-link class = "item" to = "/"><i class = "fas fa-arrow-right"></i>&nbsp;Home</router-link></li>
                        <li><router-link class = "item" to = "/products"><i class = "fas fa-arrow-right"></i>&nbsp;Products</router-link></li>
                        <li><router-link class = "item" to = "/about"><i class = "fas fa-arrow-right"></i>&nbsp;About Us</router-link></li>
                        <li><router-link class = "item" to = "/faq"><i class = "fas fa-arrow-right"></i>&nbsp;Faq's</router-link></li>
                        <li><router-link class = "item" to = "/cart"><i class = "fas fa-arrow-right"></i>&nbsp;Cart</router-link></li>
                    </ul>
                </div>
                <div class="col-md-3 col-sm-6 footer-column">
                    <h4 class="heading">Newsletter</h4>
                    <hr class="half-space">
                    <p class="icon">
                        <i class="fas fa-envelope"></i>Sign up with your name and email to get discount.
                    </p>
                    <div id="result" class="center"></div>
                    <form action="#" method="get" onsubmit="return false" class="newsletter">
                        <div class="form-group">
                            <input type="email" placeholder="E-mail Address" required name="EMAIL" class="form-control">

                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn-submit btn-f" value="Subscribe">
                        </div>
                    </form>
                </div>
                <div class="col-md-3 col-sm-6 footer-column">
                    <h4 class="heading">Get in Touch</h4>
                    <hr class="half-space">
                    <p></p>
                    <p class="address"><i class="fas fa-map-marker-alt"></i>University, HCM City</p>
                    <p class="address"><i class="fas fa-phone-alt"></i>(+84) 1234396879</p>
                    <p class="address"><i class='fas fa-envelope'></i><a href="#">thuan.jolly@gmail.com</a></p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="copyright clearfix">
                        <p>
                          Copyright &copy; 2021 
                          <a style = "color: greenyellow" href = "https://github.com/VThuan5421">VThuan5421</a>
                          . All right reserved
                        </p>
                        <ul class="social-icons">
                            <li><a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#" class="twitter"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#" class="google"><i class="fab fa-google-plus-g"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>
<script>
import axios from 'axios'
import '../src/assets/css/style.css'

export default {
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    beforeCreate() {
        this.$store.commit('initializeStore')
        const token = this.$store.state.token

        if (token) {
            axios.defaults.headers.common['Authorization'] = "Token " + token
        } else {
            axios.defaults.headers.common['Authorization'] = ""
        }
    },
    computed: {
        cartTotalLength() {
            let totalLength = 0;
            for (let i = 0; i < this.cart.items.length; i++) {
                totalLength += this.cart.items[i].quantity
            }
            return totalLength;
        },
        currentRouteName() {
            return this.$route.name;
        }
    },
    mounted() {
        this.cart = this.$store.state.cart
        
        this.showBar()
        
    },
    methods: {
        showBar() {
            /* Open */
            const open_btn = document.querySelector('.open-btn')
            const close_btn = document.querySelector('.close-btn')
                //const ovl = document.querySelector('.overlay')
            const nav = document.querySelectorAll('.nav')
            open_btn.addEventListener('click', () => {
                nav.forEach(nav_el => nav_el.classList.add('visible'))
                form.classList.remove('active-search')
                account.classList.remove('active-account')
            })

            close_btn.addEventListener('click', () => {
                nav.forEach(nav_el => nav_el.classList.remove('visible'))
                    //ovl.classList.remove('active')
            })
            const header_search = document.querySelector('.search-main')
            const form = document.querySelector('.form-main-search')

            header_search.addEventListener('click', () => {
                    form.classList.toggle('active-search')
                    account.classList.remove('active-account')
                    nav.forEach(nav_el => nav_el.classList.remove('visible'))
                })
                
            const header_account = document.querySelector('.account')
            const account = document.querySelector('.account-main')
            header_account.addEventListener('click', () => {
                account.classList.toggle('active-account')
                form.classList.remove('active-search')
                nav.forEach(nav_el => nav_el.classList.remove('visible'))
            })
            const cart = document.querySelector('.cart')
            cart.addEventListener('click', () => {
                nav.forEach(nav_el => nav_el.classList.remove('visible'))
            })
            window.addEventListener('scroll', () => {
                nav.forEach(nav_el => nav_el.classList.remove('visible'))
                account.classList.remove('active-account')
                form.classList.remove('active-search')
            })
        },
        logout() {
            axios.defaults.headers.common["Authorization"] = ""
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("userid")

            this.$store.commit('removeToken')
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss">
/*@import '../node_modules/bulma';*/
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: cyan transparent greenyellow transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
