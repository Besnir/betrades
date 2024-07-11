// Loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loaderSpinner");
  loader.addEventListener("transitionend", () => {document.body.removeChild("loader");
  })
})

// Main menu Js
let mainCheck = false;
const mainMenuBar = document.getElementById('rootMain');

function toggleMainMenu() {
  if (!mainCheck) {
    mainMenuBar.style.display = 'flex';
    mainCheck = true;
  } else if (mainCheck) {
    mainMenuBar.style.display = 'none';
    mainCheck = false;
  }
}

// Contact Us Js

function sendEmail() {
  Email.send({
    Host : "smtp.gmail.com",
    Username : "emmanueltindi23@gmail.com",
    Password : "7EE04D5B2203F93044CB85AFADF275D03A32",
    To : 'emmanueltindi23@gmail.com',
    From : "emmanueltindi23@gmail.com",
    Subject : "New Contact from Enquiry",
    Body : "Name:" + document.getElementById("firstname").value + document.getElementById("lastname").value + 
    "<br> Email:" + document.getElementById("email").value + 
    "<br> Phone:" + document.getElementById("phonenuber").value + 
    "<br> Message:" + document.getElementById("message").value,
}).then(
  message => alert(message)
);
}

// Cart Js
let totalCost = 0;

function toggleCarttSidebar() {
  const cartPage = document.getElementById('cartRoot');

  if (cartPage.style.display !== 'inline') {
    cartPage.style.display = 'inline';
  } else {
    cartPage.style.display = 'none';
  }
}

function updateLocalStorage() {
  const cartItems = document.querySelectorAll('.cartItemMainItem');
  const cartData = [];

  cartItems.forEach(item => {
    const itemData = {
      price: item.dataset.price,
      content: item.innerHTML
    };
    cartData.push(itemData);
  });

  localStorage.setItem('cart', JSON.stringify(cartData));
  localStorage.setItem('totalCost', totalCost);
}

function loadCartFromLocalStorage() {
  const cartData = JSON.parse(localStorage.getItem('cart'));
  const savedTotalCost = localStorage.getItem('totalCost');

  if (cartData && savedTotalCost) {
    const cartEmpty = document.getElementById('js-emptyCart');
    const itemAdded = document.getElementById('cartItem');
    const cartCount = document.getElementById('cartCount');
    const total = document.getElementById('total');

    cartEmpty.style.display = 'none';
    itemAdded.style.display = 'flex';

    let itemCount = cartData.length;
    if (itemCount >= 9) {
      cartCount.innerHTML = '9+';
    } else {
      cartCount.innerHTML = itemCount;
    }

    cartData.forEach(itemData => {
      itemAdded.innerHTML += `
        <div class="cartItemMainItem" data-price="${itemData.price}">
          ${itemData.content}
        </div>
      `;
    });

    totalCost = parseFloat(savedTotalCost);
    total.innerHTML = `<strong>$${totalCost}</strong>`;
  } else {
    cartEmpty.style.display = 'inline';
  }
}

function addItemToCart(itemNo) {
  const cartEmpty = document.getElementById('js-emptyCart');
  const itemAdded = document.getElementById('cartItem');
  const cartCount = document.getElementById('cartCount');
  const total = document.getElementById('total');
  const cartPage = document.getElementById('cartRoot');

  let itemHtml = '';
  let itemPrice = 0;

  if (itemNo === 'item1') {
    cartEmpty.style.display = 'none';
    itemAdded.style.display = 'flex';
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1 >= 9 ? '9+' : parseInt(cartCount.innerHTML) + 1;
    itemPrice = 40;
    itemHtml = `
      <div class="cartItemMainItem" data-price="40">
        <img src="images/betradeslogo.png" alt="Course plan">
        <div class="cartDescPrice">
          <span>1 MONTH PLAN</span>
          <p>$40</p>
        </div>
        <i class='fa-solid fa-trash' onclick="removeItemFromCart(this, 40)"></i>
      </div>`;
  } else if (itemNo === 'item2') {
    cartEmpty.style.display = 'none';
    itemAdded.style.display = 'flex';
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1 >= 9 ? '9+' : parseInt(cartCount.innerHTML) + 1;
    itemPrice = 71;
    itemHtml = `
      <div class="cartItemMainItem" data-price="71">
        <img src="images/betradeslogo.png" alt="Course plan">
        <div class="cartDescPrice">
          <span>3 MONTHS PLAN</span>
          <p>$71</p>
        </div>
        <i class='fa-solid fa-trash' onclick="removeItemFromCart(this, 71)"></i>
      </div>`;
  } else if (itemNo === 'item3') {
    cartEmpty.style.display = 'none';
    itemAdded.style.display = 'flex';
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1 >= 9 ? '9+' : parseInt(cartCount.innerHTML) + 1;
    itemPrice = 148;
    itemHtml = `
      <div class="cartItemMainItem" data-price="148">
        <img src="images/betradeslogo.png" alt="Course plan">
        <div class="cartDescPrice">
          <span>6 MONTHS PLAN</span>
          <p>$148</p>
        </div>
        <i class='fa-solid fa-trash' onclick="removeItemFromCart(this, 148)"></i>
      </div>`;
  } else if (itemNo === 'item4') {
    cartEmpty.style.display = 'none';
    itemAdded.style.display = 'flex';
    cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1 >= 9 ? '9+' : parseInt(cartCount.innerHTML) + 1;
    itemPrice = 254;
    itemHtml = `
      <div class="cartItemMainItem" data-price="254">
        <img src="images/betradeslogo.png" alt="Course plan">
        <div class="cartDescPrice">
          <span>1 YEAR PLAN</span>
          <p>$254</p>
        </div>
        <i class='fa-solid fa-trash' onclick="removeItemFromCart(this, 254)"></i>
      </div>`;
  }

  if (itemHtml) {
    itemAdded.innerHTML += itemHtml;
    totalCost += itemPrice;
    total.innerHTML = `<strong>$${totalCost}</strong>`;
    updateLocalStorage();
  }

  if (cartPage.style.display !== 'inline') {
    cartPage.style.display = 'inline';
  }
}

function removeItemFromCart(element, price) {
  const cartItem = element.closest('.cartItemMainItem');
  cartItem.remove();

  const cartCount = document.getElementById('cartCount');
  const total = document.getElementById('total');

  let itemCount = parseInt(cartCount.innerHTML);
  itemCount--;
  cartCount.innerHTML = itemCount >= 9 ? '9+' : itemCount;
  totalCost -= price;
  total.innerHTML = `<strong>$${totalCost}</strong>`;

  const cartItems = document.querySelectorAll('.cartItemMainItem');
  const cartEmpty = document.getElementById('js-emptyCart');
  const itemAdded = document.getElementById('cartItem');
  if (cartItems.length === 0) {
    cartEmpty.style.display = 'inline-block';
    itemAdded.style.display = 'none';
    total.innerHTML = `<strong>$0</strong>`;
    totalCost = 0;
  }

  updateLocalStorage();
}

document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

// Login & SignUp Js
function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("eye-icon");

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
  }
}

function togglePasswordVisibility2() {
  const passwordInput2 = document.getElementById("password2");

  const toggleIcon2 = document.getElementById("eye-icon2");

  if (passwordInput2.type === "password") {
    passwordInput2.type = "text";
    toggleIcon2.classList.remove("fa-eye");
    toggleIcon2.classList.add("fa-eye-slash");
} else {
    passwordInput2.type = "password";
    toggleIcon2.classList.remove("fa-eye-slash");
    toggleIcon2.classList.add("fa-eye");
}
}

let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelector(".slides");
  slideIndex++;
  slides.style.transform = `translateX(-${(slideIndex % slides.children.length) * 100}%)`;
  setTimeout(showSlides, 2000);
}

function plusSlides(n) {
  const slides = document.querySelector(".slides");
  slideIndex += n;
  slides.style.transform = `translateX(-${(slideIndex % slides.children.length) * 100}%)`;
}

// faqs js
function toggleAnswer(question) {
  const answer = question.nextElementSibling;
  const arrow = question.querySelector('.arrow');
  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    arrow.classList.remove('up');
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    arrow.classList.add('up');
  }
}