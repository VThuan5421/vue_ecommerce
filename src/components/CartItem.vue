<template>
    <div class="row padding-half-bottom">
        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 padding-half-top center">
            <div class="image">
                <img v-bind:src="item.product.get_thumbnail" alt="">
            </div>
            <div class = "justify-amount center">
                <a @click="decrementQuantity(item)"><i class="fas fa-minus-circle"></i></a>
                <a @click="incrementQuantity(item)"><i class="fas fa-plus-circle"></i></a>
            </div> 
        </div>
        <div class="col-xl-8 col-lg-6 col-md-6 col-sm-6 sol-12 item padding-half-top">
            <p>Item Name:&nbsp;<router-link :to="item.product.get_absolute_url" class="bold">{{ item.product.name }}</router-link></p>
            <p class="price">Price:&nbsp;&dollar;{{ item.product.price }}</p>
            <p class="price">Amount:&nbsp;{{ item.quantity }}</p>
            <p class="price">Total:&nbsp;&dollar;{{ getItemTotal(item).toFixed(2) }}</p>
            <p style = "cursor:pointer;"><a class="remove" @click="removeFromCart(item)">Remove</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        initialItem: Object
    },
    data() {
        return {
            item: this.initialItem
        }
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        decrementQuantity(item) {
            item.quantity -= 1
            if (item.quantity === 0) {
                this.$emit('removeFromCart', item)
            }
            this.updateCart()
        },
        incrementQuantity(item) {
            item.quantity += 1

            this.updateCart()
        },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        },
        removeFromCart(item) {
            this.$emit('removeFromCart', item)

            this.updateCart()
        }
    }
}
</script>