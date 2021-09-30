<template>
    <div class = "page-success container">
        <div class = "center">
            <div id = "check">
                <i class="fas fa-check-circle"></i>
            </div>
            <div id = "aboutCheck">
                <h1>Order Placed Successfully</h1>
                <p>We've sent you an email with the Order details.</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Success',
    mounted() {
        document.title = 'Success | Random'
    },
}
</script>