<template>
    <div class = "col-lg-4 col-md-6 col-sm-6 col-12">
        <div class = "product thumbnail thumbnail-3">
            <img v-bind:src="product.get_thumbnail">
            <div class = "caption">
                <h6><router-link v-bind:to="product.get_absolute_url" class = "name">{{ product.name }}</router-link></h6>
                <span class = "price sale">&dollar;{{ product.price }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   name: 'ProductBox',
   props: {
       product: Object
   } 
}
</script>