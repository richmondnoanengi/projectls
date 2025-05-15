document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }

  // Hero slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dots .dot');
  let currentSlide = 0;
  if (heroSlides.length > 0) {
    setInterval(() => {
      heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        heroDots[i].classList.remove('active');
      });
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
      heroDots[currentSlide].classList.add('active');
    }, 3000);
  }

  // Banner slider
  const bannerSlides = document.querySelectorAll('.banner-slide');
  const bannerDots = document.querySelectorAll('.banner-dots .dot');
  let currentBannerSlide = 0;
  if (bannerSlides.length > 0) {
    setInterval(() => {
      bannerSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        bannerDots[i].classList.remove('active');
      });
      currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
      bannerSlides[currentBannerSlide].classList.add('active');
      bannerDots[currentBannerSlide].classList.add('active');
    }, 5000);
  }

  // Size selection
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  // Commission modal
  const openBtn = document.querySelector(".commission-btn");
  const modal = document.getElementById("commissionModal");
  const closeBtn = document.getElementById("closeModal");
  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Add to cart (product page only)
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const title = document.querySelector(".product-info h1").innerText;
      const artist = document.querySelector(".by-artist a").innerText;
      const frame = document.querySelector('input[name="frame"]:checked').parentElement.innerText.trim();
      const size = document.querySelector(".size-btn.selected").innerText;
      const quantity = parseInt(document.getElementById("qty").value);
      const priceText = document.querySelector(".price .discounted").innerText;
      const price = parseInt(priceText.replace(/[^\d]/g, ""));
      const imageUrl = document.querySelector(".product-image img").src;  // Get product image URL

      const cartItem = {
        title,
        artist,
        frame,
        size,
        quantity,
        price,
        total: price * quantity,
        imageUrl  // Store image URL
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Item added to cart!");
    });
  }

  // Cart page rendering
  const cartItemsDiv = document.getElementById("cartItems");
  const cartSummaryDiv = document.getElementById("cartSummary");
  if (cartItemsDiv && cartSummaryDiv) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
      cartSummaryDiv.innerHTML = "";
    } else {
      let totalAmount = 0;
      cartItemsDiv.innerHTML = cart.map((item, index) => {
        totalAmount += item.total;
        return `
          <div class="cart-item">
            <img src="${item.imageUrl}" alt="${item.title}" class="cart-item-image" />
            <h2>${item.title}</h2>
            <p><strong>Artist:</strong> ${item.artist}</p>
            <p><strong>Frame:</strong> ${item.frame}</p>
            <p><strong>Size:</strong> ${item.size}</p>
            <p><strong>Quantity:</strong> ${item.quantity}</p>
            <p><strong>Price:</strong> ₦${item.price.toLocaleString()}</p>
            <p><strong>Total:</strong> ₦${item.total.toLocaleString()}</p>
            <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            <hr>
          </div>
        `;
      }).join("");

      cartSummaryDiv.innerHTML = `
        <h2>Total: ₦${totalAmount.toLocaleString()}</h2>
        <button onclick="checkout()" class="checkout-btn">Proceed to Checkout</button>
      `;
    }
  }
});

// Global cart functions (outside DOMContentLoaded)
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function checkout() {
  alert("Checkout functionality coming soon!");
}
