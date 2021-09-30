<template>
    <div class="product-detail card-wrapper padding-top padding-half-bottom">
        <div class="container">
            <div class="product-header">
                <div class="row">

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 col-12 product-img">
                        <div class="img-display">
                            <div class="img-showcase" id="showcase">
                                    <img
                                        v-for="item in 4" 
                                        v-bind:key="item"
                                        v-bind:src="product.get_image" alt="" class="img">
                            </div>
                        </div>
                        <div class="row img-select">
                            <div class="img-item col-lg-3 col-md-6 col-sm-6 col-6">
                                <a href="#" data-id="1">
                                    <img v-bind:src="product.get_thumbnail" alt="">
                                </a>
                            </div>
                            <div class="img-item col-lg-3 col-md-6 col-sm-6 col-6">
                                <a href="#" data-id="2">
                                    <img v-bind:src="product.get_thumbnail" alt="">
                                </a>
                            </div>
                            <div class="img-item  col-lg-3 col-md-6 col-sm-6 col-6">
                                <a href="#" data-id="3">
                                    <img v-bind:src="product.get_thumbnail" alt="">
                                </a>
                            </div>
                            <div class="img-item  col-lg-3 col-md-6 col-sm-6 col-6">
                                <a href="#" data-id="4">
                                    <img v-bind:src="product.get_thumbnail" alt="">
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- card right -->
                    <div class="col-xl-6 col-lg-6 col-sm-6 col-xs-12 col-12 product-content">
                        <h2 class="product-title">{{ product.name }}</h2>
                        <a class="product-link">visit ____ store</a>
                        <div class="product-rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                            <span>4.7(21)</span>
                        </div>

                        <div class="product-price">
                            <!--<p class="last-price">Old Price: <span>$257.00</span></p>-->
                            <p class="new-price">New Price: <span>&dollar;{{ product.price }}</span></p>
                        </div>

                        <div class="product-detail">
                            <h2>about this item: </h2>
                            <p>{{ product.description }}</p>
                            <ul>
                                <li>Color: <span>{{ product.color }}</span></li>
                                <li>Available: <span>in stock</span></li>
                                <li>Shipping Area: <span>All over the world</span></li>
                                <li>Shipping Fee: <span>Free</span></li>
                            </ul>
                        </div>

                        <div class="purchase-info">
                            <input type="number" min="1" v-model="quantity">
                            <button type="button" class="btn" @click="addToCart">
                                Add to Cart <i class = "fas fa-shopping-cart"></i>
                            </button>
                            <button type="button" class="btn">Compare</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '../assets/css/product.css'
import axios from 'axios'
import {toast } from 'bulma-toast'

export default {
    name: "Product",
    data() {
        return {
            product: {},
            quantity: 1
        }
    },
    mounted() {
        this.getProduct()

        const imgs = document.querySelectorAll('.img-select a');
        const imgBtns = [...imgs];
        let imgId = 1;

        imgBtns.forEach((imgItem) => {
            imgItem.addEventListener('click', (event) => {
                event.preventDefault();
                imgId = imgItem.dataset.id;
                slideImage();
            });
        });

        function slideImage() {
            const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

            document.getElementById('showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
        }

        window.addEventListener('resize', slideImage);
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug

            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data
                    document.title = this.product.name + ' | Random'
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            if(isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            const item = {
                product:this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)

            toast({
                message: 'The product was added to the cart',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            })
        }
    }
}
</script>