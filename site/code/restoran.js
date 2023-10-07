const restoran = JSON.parse(localStorage.restorationBD);
    console.log(restoran);

if (!Array.isArray(restoran)) {
    throw Error("З серверу пeредано не масив");
}

// Бургери та закуски

const burgerSnackMenu = restoran.filter((item) => item.keywords.includes("burgers_snacks"));
    
const burgerSnackMenuItem = burgerSnackMenu.map(({productName, productimageUrl, description, productWeigth, price}) => { 
    return`
    <div class="card_container">
        <div class = "restoran__card">
            <div class="prod_name__container">
                <div class="name">${productName}</div>
            </div>
            <div class="card_img">
                <div class="img_container">
                    <img src="../${productimageUrl}">
                </div>
            </div>
            <div class="description__container">
                <div class="description">
                    <p>${description}</p>
                <div class="product_weigth">${productWeigth}</div>
                <div class="price">${price}</div>
                </div>
            </div> 
        </div>
    </div>
    
`
}).join("");


if (document.querySelector("#burgersSnacks") != null) {
    document.querySelector("#burgersSnacks")
    .insertAdjacentHTML("beforeend", burgerSnackMenuItem);    
}
//
  
//  салати

const saladsMenu = restoran.filter((item) => item.keywords.includes("salads"));
    
const saladsMenuItem = saladsMenu.map(({productName, productimageUrl, description, productWeigth, price}) => { 
    return`
    <div class="card_container">
        <div class = "restoran__card">
            <div class="prod_name__container">
                <div class="name">${productName}</div>
            </div>
            <div class="card_img">
                <div class="img_container">
                    <img src="../${productimageUrl}">
                </div>
            </div>
            <div class="description__container">
                <div class="description">
                    <p>${description}</p>
                <div class="product_weigth">${productWeigth}</div>
                <div class="price">${price}</div>
                </div>
            </div> 
        </div>
    </div>
    
`
}).join("");


if (document.querySelector("#salads") != null) {
    document.querySelector("#salads")
    .insertAdjacentHTML("beforeend", saladsMenuItem);    
}

//


//  супи

const soupsMenu = restoran.filter((item) => item.keywords.includes("soups"));

const soupsMenuItem = soupsMenu.map(({productName, productimageUrl, description, productWeigth, price}) => { 
    return`
    <div class="card_container">
        <div class = "restoran__card">
            <div class="prod_name__container">
                <div class="name">${productName}</div>
            </div>
            <div class="card_img">
                <div class="img_container">
                    <img src="../${productimageUrl}">
                </div>
            </div>
            <div class="description__container">
                <div class="description">
                    <p>${description}</p>
                <div class="product_weigth">${productWeigth}</div>
                <div class="price">${price}</div>
                </div>
            </div> 
        </div>
    </div>
    
`
}).join("");


if (document.querySelector("#soups") != null) {
    document.querySelector("#soups")
    .insertAdjacentHTML("beforeend", soupsMenuItem);    
}

//

// гарячі страви

const hotMealMenu = restoran.filter((item) => item.keywords.includes("hot_meals"));

const hotMealMenuItem = hotMealMenu.map(({productName, productimageUrl, description, productWeigth, price}) => { 
    return`
    <div class="card_container">
        <div class = "restoran__card">
            <div class="prod_name__container">
                <div class="name">${productName}</div>
            </div>
            <div class="card_img">
                <div class="img_container">
                    <img src="../${productimageUrl}">
                </div>
            </div>
            <div class="description__container">
                <div class="description">
                    <p>${description}</p>
                <div class="product_weigth">${productWeigth}</div>
                <div class="price">${price}</div>
                </div>
            </div> 
        </div>
    </div>
    
`
}).join("");


if (document.querySelector("#hotMeals") != null) {
    document.querySelector("#hotMeals")
    .insertAdjacentHTML("beforeend", hotMealMenuItem);    
}

//

// новинки

const newProductMenu = restoran.filter((item) => item.keywords.includes("new_products"));

const newProductMenuItem = newProductMenu.map(({productName, productimageUrl, description, productWeigth, price}) => { 
    return`
    <div class="card_container">
        <div class = "restoran__card">
            <div class="prod_name__container">
                <div class="name">${productName}</div>
            </div>
            <div class="card_img">
                <div class="img_container">
                    <img src="${productimageUrl}">
                </div>
            </div>
            <div class="description__container">
                <div class="description">
                    <p>${description}</p>
                <div class="product_weigth">${productWeigth}</div>
                <div class="price">${price}</div>
                </div>
            </div> 
        </div>
    </div>
    
`
}).join("");

if(document.querySelector("#newProducts") != null){
    document.querySelector("#newProducts")
        .insertAdjacentHTML("beforeend", newProductMenuItem)
}

//

// БАР


// Функція для генерації карточок бару
function generateBarMenuItemCard({ productName, productimageUrl, description, productWeigth, price }) {
    return `
      <div class="slide">
          <div class="card_container">
              <div class="restoran__card">
                  <div class="prod_name__container">
                      <div class="name">${productName}</div>
                      <div class="description__container">
                          <div class="description">
                              <p>${description}</p>
                              <div class="product_weigth">${productWeigth}</div>
                              <div class="price">${price}</div>
                          </div>
                      </div> 
                  </div>
                  <div class="card_img">
                      <div class="img_container">
                          <img src="${productimageUrl}">
                      </div>
                  </div>
              </div>
          </div>
      </div>`;
  }
  
  // Функція для генерації меню за типом
  function generateBarMenuItemsByType(menuType) {
    const filteredMenu = restoran.filter((item) => item.keywords.includes(menuType));
    const menuItemsHTML = filteredMenu.map(generateBarMenuItemCard).join("");
    if (slidesContainer != null) {
        slidesContainer.innerHTML = menuItemsHTML;
        showFirstSlide();    
    }    
  }
  
  // Слайдер
  
  if (document.querySelector(".slider") != null) {
    const slider = document.querySelector(".slider");
    let currentIndex = 0;
    
    function showSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function showFirstSlide() {
      slider.style.transform = `translateX(-${0}%)`;
    }

    showSlide(currentIndex);

    function updateSlider(direction) {
      const slides = document.querySelectorAll(".slide");
      currentIndex += direction;
      if (currentIndex >= slides.length) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    showSlide(currentIndex);
  }
  
  document.querySelector(".next_btn").addEventListener("click", () => updateSlider(1));
  document.querySelector(".prev_btn").addEventListener("click", () => updateSlider(-1));
    
  }
  
  // Генерація меню за фільтром
  const slidesContainer = document.querySelector("#slides_container");
  const menuTypeButtons = document.querySelectorAll(".category-button");

  menuTypeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuType = this.id;
      generateBarMenuItemsByType(menuType);
    });
  });
  
  // Ініціалізація першого типу (бар) при завантаженні сторінки
  generateBarMenuItemsByType("bar");


//  