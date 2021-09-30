<template>
    <div class="container-fluid padding-bottom">
        <div class="row padding-half-top">
            <div class="col-xl-6 col-lg-7 col-md-12 col-sm-12 col-12">
                <div class="card_cart">
                    <div class="card-header container">
                        <div class="row padding-half-2">
                            <div class="col-md-12">
                                <span class="head">
                                    ORDER DETAILS({{ cartTotalLength }})
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body container">
                        <div v-if="cartTotalLength">
                            <CartItem
                                v-for="item in cart.items"
                                v-bind:key="item.product.id"
                                v-bind:initialItem="item"
                                v-on:removeFromCart="removeFromCart"
                                /> 
                        </div>
                        <p class="head padding-half center" v-else>You don't have any product in your order cart</p>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-12 padding-top">
                <div class="card_card padding-half-top">
                    <div class="card-header container">
                        <div class="row">
                            <div class="col-md-12 padding-half-4">
                                <span class="head">PRICE DETAILS</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row prices">
                            <span>Total Price ({{ cartTotalLength }})&nbsp;</span>
                            <span>&dollar;{{ cartTotalPrice.toFixed(2) }}</span>
                        </div>
                        <div class="row prices">
                            <span>Delivery Charges:</span>
                            <span>Free</span>
                        </div>
                        <div class="row prices">
                            <span>Last Price:</span>
                            <span>&dollar;{{ cartTotalPrice.toFixed(2) }}</span>
                        </div>
                        <hr>
                        <div class = "row checkout" v-if="cartTotalLength">
                            <router-link to="/cart/checkout" class = "btn-checkout">Proceed to checkout</router-link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import CartItem from '../components/CartItem.vue'
import { toast } from 'bulma-toast'
import '../assets/css/cart.css'
export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            cart: {
                items: []
            }   
        }
    },
    mounted() {
        this.cart = this.$store.state.cart

        document.title = "Cart | Random"
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        },
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        }
    },
}
</script>