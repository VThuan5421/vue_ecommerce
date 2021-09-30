<template>
    <div class="container-fluid padding-bottom">
        <div class="row padding-half-top">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="card_cart">
                    <div class="card-header container">
                        <div class="row padding-half-2">
                            <div class="col-12">
                                <span class="head"> ORDER DETAILS({{ cartTotalLength }}) </span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class = "table-responsive">
                        <table class = "table padding-half-2">
                            <thead class = "title">
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="item in cart.items"
                                    v-bind:key="item.product.id"
                                    >
                                    <td>{{ item.product.name }}</td>
                                    <td>${{ item.product.price }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td>${{ getItemTotal(item).toFixed(2)}}</td>
                                </tr>
                            </tbody>
                            <tfoot style="color: #e25111;">
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td>{{ cartTotalLength }}</td>
                                    <td>${{ cartTotalPrice.toFixed(2) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 padding-half-top">
                <div class="card_cart padding-half-top">
                    <div class="card-header container">
                        <div class="row">
                            <div class="col-md-12 padding-half-4">
                                <span class="head">Buyer / Consignee</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-body container">
                        <div>
                            <div class="field">
                                <label>Name&nbsp;<span class="c-red">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Recipient's name"
                                    v-model="name"
                                />
                                <div class="hide-4 margin-left"></div>
                            </div>
                            <div class="field">
                                <label for="txtPhone">Email address <span class="c-red">*</span></label>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    v-model="email"
                                />
                                <div class="hide-5 margin-left"></div>
                            </div>
                            <div class="field">
                                <label>Phone number&nbsp;<span class="c-red">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Phone number (10 digit-mobile-number)"
                                    v-model="phone"
                                />
                                <div class="hide-5 margin-left"></div>
                            </div>
                            <div class="field">
                                <label>Delivery address <span class="c-red">*</span></label>
                                <input
                                    type="text"
                                    placeholder="Address (Area and Street, City/District/Town)"
                                    v-model="address"
                                />
                                <div class="hide-6 margin-left"></div>
                            </div>
                            <div class="field">
                                <label>Note</label>
                                <textarea rows="2" v-model="note"></textarea>
                                <div class="hide-7 margin-left"></div>
                            </div>
                            <div class="is-danger" v-if="errors.length">
                                <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                            </div>
                            <div id = "card-element" class = "padding-half-2"></div>
                            <template v-if="cartTotalLength">
                                <div class = "padding-top-4">
                                    <button class="place-button" @click="submitForm">Pay with Stripe</button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import '../assets/css/cart.css'

export default {
  name: "Checkout",
  data() {
    return {
      cart: {
            items: []
        },
        stripe: {},
        card: {},
        name: '',
        email: '',
        phone: '',
        address: '',
        note: '',
        errors: [],
        };
  },
  mounted() {
    document.title = "Checkout | Random";

    this.cart = this.$store.state.cart;

    if(this.cartTotalLength > 0) {
        this.stripe = Stripe('pk_test_51JR7D1CRkAoNqSPR3dbrceSBONVz66T0EIxqCkY0oStkR5T3TOEZNZKnF1pDGbkZpWG74mg6ykhg7rbkuzf20SxM00nulywA5H')
        const elements =this.stripe.elements();
        this.card = elements.create('card', { hidePostalCode: true})
        this.card.mount('#card-element')
    }
    
  },
  methods: {
    getItemTotal(item) {
        return item.quantity * item.product.price
    },
    submitForm() {
        this.errors = []

        if(this.name === '') {
            this.errors.push('The name field is missing')
        }
        if(this.email === '') {
            this.errors.push('The email field is missing')
        }
        if(this.phone === '') {
            this.errors.push('The phone field is missing')
        }
        if(this.address === '') {
            this.errors.push('The address field is missing')
        }
        if (!this.errors.length) {
            this.$store.commit('setIsLoading', true)

            this.stripe.createToken(this.card).then(result => {                    
                if (result.error) {
                    this.$store.commit('setIsLoading', false)

                    this.errors.push('Something went wrong with Stripe. Please try again')

                    console.log(result.error.message)
                } else {
                    this.stripeTokenHandler(result.token)
                }
            })
        }
    },
    async stripeTokenHandler(token) {
        const items = []

        for (let i = 0; i < this.cart.items.length; i++) {
            const item = this.cart.items[i]
            const obj = {
                product: item.product.id,
                quantity: item.quantity,
                price: item.product.price * item.quantity
            }

            items.push(obj)
        }
        const data = {
            'name': this.name,
            'email': this.email,
            'phone': this.phone,
            'address': this.address,
            'note': this.note,
            'items': items,
            'stripe_token': token.id
        }
        await axios
                .post('/api/v1/checkout/', data)
                .then(response => {
                    this.$store.commit('clearCart')
                    this.$router.push('/cart/success')
                })
                .catch(error => {
                    this.errors.push('Something went wrong. Please try again')

                    console.log(error)
                })

                this.$store.commit('setIsLoading', false)

    }
  },
  computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    }
};
</script>