<template>
<div class = "padding-half-4">
    <div class = "card-table">
        <div class = "header-table">
            Order #{{ order.id }}
        </div>
        <div class = "body-table">
            <p class = "table-title">Date Order: <span class= "c-red">{{ order.created_at.slice(0, 19).split('T').reverse().join('   ') }}</span></p>
            <div class = "table-responsive">
                <table class = "table">
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
                            v-for="item in order.items"
                            v-bind:key="item.product.id"
                            >
                            <td>{{ item.product.name }}</td>
                            <td>${{ item.product.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ getItemTotal(item).toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import '../assets/css/login.css'
export default {
    name: 'OrderSummary',
    props: {
        order: Object
    },
    methods: {
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        orderTotalLength(order) {
            return order.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
    }
}
</script>