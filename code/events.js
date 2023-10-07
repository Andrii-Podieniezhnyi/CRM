import { getLogin, getPassword } from "./var.js";
import { generationId, validate, createInputSring, dateNow } from "./functions.js";
import { StoreElementCRM } from "./class.js";


//changeInputEvent Object
const isDisabledBtn = {
    flagLogin: false,
    flagPassword: false
}

function changeInputEvent(e) {
    if (e.target.dataset.type === "login" && validate(new RegExp("^" + getLogin + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagLogin = true;
    } else if (e.target.dataset.type === "password" && validate(new RegExp("^" + getPassword + "$"), e.target.value)) {
        e.target.classList.remove("error")
        isDisabledBtn.flagPassword = true;
    } else {
        e.target.classList.add("error");
        if (e.target.dataset.type === "login") {
            isDisabledBtn.flagLogin = false;
        } else if (e.target.dataset.type === "password") {
            isDisabledBtn.flagPassword = false;
        }
    }

    if (isDisabledBtn.flagLogin && isDisabledBtn.flagPassword) {
        document.getElementById("disabled").disabled = false;
    } else {
        document.getElementById("disabled").disabled = true;
    }
}

function userLoginEvent() {
    sessionStorage.isLogin = true;
    document.location = "/"
}

function showModalEvent() {
    const modal = document.querySelector(".container-modal").classList.remove("hide")
}

function hideModalEvent() {
    const modal = document.querySelector(".container-modal").classList.add("hide")
}

function changeCategoryEvent(e) {
    const modal__body = document.querySelector(".modal__body");
    modal__body.innerHTML = "";

    if (e.target.value === "Магазин") {
        modal__body.insertAdjacentHTML("beforeend", `
       <form>
        ${createInputSring("text", "Назва продукту", generationId(), "productName")}
        ${createInputSring("number", "Вартість продукту", generationId(), "productPrice")}
        ${createInputSring("text", "Валюта/од", generationId(), "currencyUnits")}
        ${createInputSring("url", "Картинка продукту", generationId(), "productImage")}
        ${createInputSring("text", "Опис продукту", generationId(), "productDescription")}
        ${createInputSring("text", "Ключові слова для пошуку. Розділяти комою", generationId(), "keywords")}
       </form>
       `)

    }else if (e.target.value === "Відео хостинг"){
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва відео", generationId(), "productName")}
         ${createInputSring("url", "Постер", generationId(), "poster")}
         ${createInputSring("url", "Посилання на відео", generationId(), "url")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
        </form>
        `)
    }else if (e.target.value === "Рестаран"){
        modal__body.insertAdjacentHTML("beforeend", `
        <form>
         ${createInputSring("text", "Назва Страви", generationId(), "productName")}
         ${createInputSring("text", "Грамовка", generationId(), "productWeigth")}
         ${createInputSring("text", "Склад", generationId(), "ingredients")}
         ${createInputSring("text", "Опис продукту", generationId(), "description")}
         ${createInputSring("text", "Ключеві слова для пошуку. Розділяти комою", generationId(), "keywords")}
         ${createInputSring("text", "Вартість продукту", generationId(), "price")}
         ${createInputSring("url", "Забраження продукту", generationId(), "productimageUrl")}
        </form>
        `)
    }
}

function saveData() {
    try {
        const [isCategory] = document.querySelector("select").selectedOptions;
        const [...inputs] = document.querySelectorAll("form input");
        if (isCategory.value === "Магазин") {
            const obj = {
                productName: "string",
                productPrice: "number",
                currencyUnits: "string",
                productImage: "string",
                productDescription: "string",
                keywords: "string",
            };

            inputs.forEach(e => {
                obj[e.dataset.type] = e.value;
                e.value = ''
            })

            const store = JSON.parse(localStorage.store);
            store.push(new StoreElementCRM(
                obj.productName,
                obj.productPrice,
                obj.currencyUnits,
                obj.productImage,
                obj.productDescription,
                undefined,
                obj.keywords,
                dateNow,
                generationId));

            localStorage.store = JSON.stringify(store);

        }
    } catch (e) {
        console.error(e)
    }
}

export function exportDataEvent () {

    let windowData = open("/window", "test");
    console.log(document.querySelector(".show-json"));
    
    setTimeout(()=>{
        windowData.close()
    }, 5000)
}

export { changeInputEvent, userLoginEvent, showModalEvent, changeCategoryEvent, hideModalEvent, saveData }