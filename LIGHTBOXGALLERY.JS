window.addEventListener('load', () => {
    // Select all elements with the animation class
    const elements = document.querySelectorAll('.animate-on-load, .zoom-in-on-load');
    
    // Add the 'loaded' class to trigger animations
    elements.forEach(element => {
        element.classList.add('loaded');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartIcon = document.getElementById("cart-icon");
    const cartDropdown = document.getElementById("cart-dropdown");
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");



    // Show/Hide Cart Dropdown on Click
    cartIcon.addEventListener("click", function (e) {
        e.preventDefault();
        cartDropdown.style.display = (cartDropdown.style.display === "block") ? "none" : "block";
    });

    // Add to Cart Function
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    };

    // Update Cart Display
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">❌</button>`;
            cartItemsList.appendChild(li);
        });

        cartCount.textContent = cart.length;
        cartTotal.textContent = total.toFixed(2);
    }

    // Remove Item from Cart
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    // Clear Cart
    clearCartBtn.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    //  "Add to Cart" functionality to all buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
});

    // ** Hide other dropdowns when clicking elsewhere**
    document.addEventListener("click", function (event) {
        let isDropdown = event.target.closest(".dropdown");

        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            if (!isDropdown) {
                menu.style.display = "none";
            }
        });
    });

    // **Dropdown Hover Effect (Ensures Old Dropdown Issue is Fixed)**
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function () {
            this.querySelector(".dropdown-menu").style.display = "block";
        });

        dropdown.addEventListener("mouseleave", function () {
            this.querySelector(".dropdown-menu").style.display = "none";
        });
    });



document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none"; // Hide all dropdowns initially
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Hide all dropdowns on page load
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none";
    });

    // Hide the cart dropdown on page load
    const cartDropdown = document.getElementById("cart-dropdown");
    if (cartDropdown) {
        cartDropdown.style.display = "none";
    }
});

//new


const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let intervalId;

function showSlide() {
    testimonialSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide();
}

function autoSlide() {
    intervalId = setInterval(nextSlide, 4000);
}

testimonialSlides[0].classList.add('active');

prevBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    prevSlide();
    autoSlide();
});

nextBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    nextSlide();
    autoSlide();
});

testimonialContainer.addEventListener('mouseover', () => {
    clearInterval(intervalId);
});

testimonialContainer.addEventListener('mouseout', autoSlide);

autoSlide();

//newwww
document.addEventListener("DOMContentLoaded", function () {
    const slides = [
        { 
            img: "IMAGE/cupcakes-4186218_1280.jpg", 
            title: "Delicious Cakes & Cupcakes", 
            text: "At DjowoCakes, we believe every celebration deserves a special touch, which is why we craft beautifully designed and delicious cakes that bring joy to every occasion. Made with love, passion, and the finest ingredients, our cakes and cupcakes are more than just desserts—they are sweet memories waiting to be shared!💜💜🎂🎂💜💜!" 
        },
    
        { 
            img: "slideshow images/pexels-life-of-pix-134575.jpg", 
            title: "Elegant Wedding Cakes ✨💍", 
            text: "Your wedding day is one of the most magical moments of your life, and your cake should be just as unforgettable. From breathtaking multi-tiered designs to delicate floral masterpieces, our wedding cakes are handcrafted to add a touch of elegance, romance, and sweetness to your special day. Let us create a cake that tells your love story! 💕🍰💍" 
        },
    
        { 
            img: "slideshow images/melissa-walker-horn-UMMsUCJG7RA-unsplash.jpg", 
            title: "Love Baked to Perfection ❤️🍓", 
            text: "Nothing says 'I love you' better than a decadent, heart-shaped cake made with passion. Whether it’s a rich chocolate indulgence, a strawberry-filled dream, or a delicate vanilla delight, our Valentine’s cakes are designed to melt hearts and create unforgettable moments. Celebrate love with a bite of something sweet! 💕🎂🍓" 
        },
    
        { 
            img: "slideshow images/deva-williamson-HjnFuC5pcA8-unsplash.jpg", 
            title: "Unforgettable Birthday Cakes 🎉🎂", 
            text: "Make every birthday extra special with a cake that’s as unique as the person celebrating! From vibrant, fun-themed cakes for kids to sophisticated and stylish designs for adults, our birthday cakes are baked to bring smiles and happiness. Celebrate another amazing year with a delicious masterpiece! 🎈🎂🥳" 
        }
    ];


    let currentSlide = 0;
    const slideshow = document.getElementById("slideshow");
    const slideTitle = document.getElementById("slide-title");
    const slideText = document.getElementById("slide-text");

    function preloadImage(url, callback) {
        const img = new Image();
        img.src = url;
        img.onload = callback;
    }

    function changeSlide(index) {
        const nextImage = slides[index].img;

        // ✅ Preload next image before making any changes
        preloadImage(nextImage, function () {
            slideshow.classList.add("fade-out"); // Smooth transition effect

            setTimeout(() => {
                slideshow.style.backgroundImage = `url('${nextImage}')`;

                // Change text only after background is set
                slideTitle.textContent = slides[index].title;
                slideText.textContent = slides[index].text;

                slideshow.classList.remove("fade-out");
            }, 300); // Slight delay for smooth transition
        });
    }

    // Preload all images to remove loading delay
    slides.forEach(slide => {
        const img = new Image();
        img.src = slide.img;
    });

    // Automatic Slide Change Every 5 Seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        changeSlide(currentSlide);
    }, 5000);



    // Manual Slide Navigation
    document.getElementById("prev-slide").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        changeSlide(currentSlide);
    });

    document.getElementById("next-slide").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        changeSlide(currentSlide);
    });

    // Initial slide setup
    changeSlide(currentSlide);
});

document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
        alert("Thank you for subscribing! 🎉");
        document.getElementById("email").value = ""; // Clear input
    } else {
        alert("Please enter a valid email!");
    }
});








