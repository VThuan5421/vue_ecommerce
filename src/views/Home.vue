<template>
  <div>
    <div class="main-hero">
      <div class="hero-img">
        <img src="../assets/images/92.jpg" alt="">
      </div>
    </div>
    <div class = "container padding-half">
        <div id="containerSlider">
                <div id="slidingImage"> <img src="../assets/images/img1.png" alt="image1"> </div>
                <div id="slidingImage"> <img src="../assets/images/img2.png" alt="image2"> </div>
                <div id="slidingImage"> <img src="../assets/images/img3.png" alt="image3"> </div>
                <div id="slidingImage"> <img src="../assets/images/img4.png" alt="image4"> </div>
            </div>
    </div>
    <div class = "products padding-half">
        <div class = "container snippets">
            <div class = "row">
                <div class = "col-12 center">
                    <h2 class = "heading">Latest Product</h2>
                    <hr class = "heading-space">
                </div>
            </div>
            <div class = "row center">
                <ProductBox 
                    v-for="product in latestProducts"
                    v-bind:key="product.id"
                    v-bind:product="product" />
            </div>
        </div>
    </div>
    <!-- Testimonial -->
    <div class="container padding-half">
        <div class="testimonial-container" id="tes">
            <div class="progress-bar"></div>
            <div class="fas fa-quote-right fa-quote"></div>
            <div class="fas fa-quote-left fa-quote"></div>
            <p class="testimonial">
                I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer.
            </p>
            <div class="user">
                <img src="../assets/images/92.jpg" alt="" class="user-image">
                <div class="user-details">
                    <h4 class="username">Nguyen Van A</h4>
                    <p class="role">Marketing</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import '../assets/css/products.css'
import axios from 'axios'
import ProductBox from '../components/ProductBox.vue'
export default {
  name: 'Home',
  data() {
      return {
          latestProducts: []
      }
  },
  components: {
      ProductBox
  },
  mounted() {
    this.getLatestProducts()

    document.title = 'Home | Random'
    this.slider()
    this.runTestomonial()
  },
  methods: {
    async getLatestProducts() {
        this.$store.commit('setIsLoading', true)
        
        await axios
            .get('/api/v1/latest-products/')
            .then(response => {
                this.latestProducts = response.data
            })
            .catch(error => {
                console.log(error)
            })
        this.$store.commit('setIsLoading', false)
        
    },
    runTestomonial() {
        
        /* Testimonial */
        const testimonialsContainer = document.querySelector('.testimonials-container')
        const testimonial = document.querySelector('.testimonial')
        const userImage = document.querySelector('.user-image')
        const username = document.querySelector('.username')
        const role = document.querySelector('.role')

        const testimonials = [{
                color: 'palevioletred',
                name: 'Nguyen Van A',
                position: 'Marketing',
                photo: 'i.jpg',
                text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details.",
            },
            {
                color: 'purple',
                name: 'June Cha',
                position: 'Software Engineer',
                photo: 'i.jpg',
                text: 'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
            },
            {
                color: '#5cb85c',
                name: 'Iida Niskanen',
                position: 'Data Entry',
                photo: 'i.jpg',
                text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
            },
            {
                color: '#476ce4',
                name: 'Renee Sims',
                position: 'Receptionist',
                photo: 'i.jpg',
                text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
            },
            {
                color: '#d9534f',
                name: 'Jonathan Nunfiez',
                position: 'Graphic Designer',
                photo: 'i.jpg',
                text: "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
            },
            {
                color: '#f0ad4e',
                name: 'Sasha Ho',
                position: 'Accountant',
                photo: 'i.jpg',
                text: 'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
            },
            {
                color: '#0275d8',
                name: 'Veeti Seppanen',
                position: 'Director',
                photo: 'i.jpg',
                text: 'This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.',
            },
        ]


        let idx = 1

        function updateTestimonial() {
            const { color, name, position, photo, text } = testimonials[idx]
            document.getElementById('tes').style.backgroundColor = color
            testimonial.innerHTML = text
            userImage.src = photo
            username.innerHTML = name
            role.innerHTML = position

            idx++

            if (idx > testimonials.length - 1) {
                idx = 0
            }
        }
        setInterval(updateTestimonial, 5000)
    },
    slider() {
        $('#containerSlider').slick({
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            });
    }
  },
}
</script>
