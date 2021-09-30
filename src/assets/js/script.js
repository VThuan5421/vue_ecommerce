/* Open */
const open_btn = document.querySelector('.open-btn')
const close_btn = document.querySelector('.close-btn')
    //const ovl = document.querySelector('.overlay')
const nav = document.querySelectorAll('.nav')
open_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.add('visible'))
    form.classList.remove('active-search')
    account.classList.remove('active-account')
})

close_btn.addEventListener('click', () => {
    nav.forEach(nav_el => nav_el.classList.remove('visible'))
        //ovl.classList.remove('active')
})
const header_search = document.querySelector('.search-main')
const form = document.querySelector('.search-form-main')

header_search.addEventListener('click', () => {
        form.classList.toggle('active-search')
        account.classList.remove('active-account')
        nav.forEach(nav_el => nav_el.classList.remove('visible'))
    })
    /*
    $('.header-search-wrapper .search-main').click(function() {
        $('.search-form-main').toggleClass('active-search');
        $('.search-form-main .search-field').focus();
    });
    */
const header_account = document.querySelector('.account')
const account = document.querySelector('.account-main')
header_account.addEventListener('click', () => {
    account.classList.toggle('active-account')
    form.classList.remove('active-search')
})

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
        photo: './images/c1.jpg',
        text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
    },
    {
        color: 'purple',
        name: 'June Cha',
        position: 'Software Engineer',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!',
    },
    {
        color: '#5cb85c',
        name: 'Iida Niskanen',
        position: 'Data Entry',
        photo: './images/c2.jpg',
        text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
    },
    {
        color: '#476ce4',
        name: 'Renee Sims',
        position: 'Receptionist',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
    },
    {
        color: '#d9534f',
        name: 'Jonathan Nunfiez',
        position: 'Graphic Designer',
        photo: './images/c3.jpg',
        text: "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
    },
    {
        color: '#f0ad4e',
        name: 'Sasha Ho',
        position: 'Accountant',
        photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
        text: 'This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!',
    },
    {
        color: '#0275d8',
        name: 'Veeti Seppanen',
        position: 'Director',
        photo: './images/c4.jpg',
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