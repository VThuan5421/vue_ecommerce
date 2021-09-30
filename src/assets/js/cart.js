/* Collapse in cart */
const stripe = document.querySelector('.stripe')
const stripe_collapse = document.querySelector('.stripe-collapse')
const cash = document.querySelector('.cash')
const submit = document.querySelector('.place-button')
stripe.addEventListener('click', () => {
    stripe_collapse.classList.toggle('active')
    submit.classList.toggle('none')
})
cash.addEventListener('click', () => {
    stripe_collapse.classList.remove('active')
    submit.classList.remove('none')
})