<template>
    <div class = "products padding-half">
        <div class = "container snippets">
            <div class = "row">
                <div class = "col-12 center">
                    <h2 class = "heading">{{ category.name }}</h2>
                    <hr class = "heading-space">
                </div>
            </div>
            <div class = "row center">
                <ProductBox 
                    v-for="product in category.products"
                    v-bind:key="product.id"
                    v-bind:product="product" />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {toast } from 'bulma-toast'
import ProductBox from '../components/ProductBox.vue'
export default {
    name: 'Category',
    components: {
        ProductBox
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if(to.name === 'Category') {
                this.getCategory()
                const nav = document.querySelectorAll('.nav')
                nav.forEach(nav_el => nav_el.classList.remove('visible'))
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            await axios
                .get(`/api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data
                    document.title = this.category.name + ' | Random'
                })
                .catch(erroe => {
                    console.log(error)
                    toast({
                        messgae: 'Something went wrong. Please try again.',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        duration: 2000,
                        position: 'bottom-right',
                    })
                })

            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>