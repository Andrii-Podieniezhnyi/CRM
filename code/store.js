import { hideModalEvent, showModalEvent } from "./events.js";
import { createHTMLElement, createEditProductInput } from "./functions.js";
import { modalClose, modalSave } from "./var.js";

//Вивід на сторінку позицій меню
function showStoreProduct(arr = []) {
    //Знайшли tbody для виводу інформації по позиціям 
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""

    arr.forEach(function ({ productName, productQuantity, productPrice, currencyUnits, status, date, id }, i) {
        //#	Назва	Залишок	Ціна	Редагувати	Статус	Дата додавання	Видалити
        const tr = createHTMLElement("tr");
        const element = [
            createHTMLElement("td", undefined, i + 1),
            createHTMLElement("td", undefined, productName),
            createHTMLElement("td", undefined, productQuantity),
            createHTMLElement("td", undefined, productPrice),
            createHTMLElement("td", undefined, currencyUnits),
            createHTMLElement("td", undefined, `<span data-key="${id}" class="icon">&#9998;</span>`, undefined, editProductStoreEvent),
            createHTMLElement("td", undefined, status ? "<span class='icon green'>&#10004;</span>" : "<span class='icon red'>&#10008;</span>"),
            createHTMLElement("td", undefined, date),
            createHTMLElement("td", undefined, `<span data-key="${id}" class='icon'>&#10006;</span>`, undefined, delProductItemEvent),
        ]
        tbody.append(tr);
        tr.append(...element)
    })
}

// Читаємо з localStorage
if (localStorage.store) {
    showStoreProduct(JSON.parse(localStorage.store));
}

// Змінюємо продукт з БД
function editProductStoreEvent(e) {
    if (!e.target.tagName === "SPAN") return;
    showModalEvent();

    const span = e.target;
    const store = JSON.parse(localStorage.store);

    const modalWindow = document.querySelector(".modal");
    const modalBody = createHTMLElement("div", "modal-body");
    modalWindow.append(modalBody);

    // Робота з кнопками 
    const btns = createHTMLElement("div", "btns-save");

    modalSave.addEventListener("click", () => {
        newSaveProductInfo(modalBody, rez)
        hideModalEvent()
        modalBody.remove()
        showStoreProduct(JSON.parse(localStorage.store));
    });

    modalClose.addEventListener("click", () => {
        hideModalEvent()
        modalBody.remove()
    });

    btns.append(modalSave, modalClose);
    modalWindow.append(btns)

    //Визначення обєвкта для редагування
    const rez = store.find((a) => {
        return span.dataset.key === a.id
    });
    const data = Object.entries(rez);

    // Редагування позиції
    const inputsElemets = data.map(([props, value]) => {
        return createEditProductInput(props, value)
    })
    modalBody.append(...inputsElemets)
}

function newSaveProductInfo(newObj, oldObj) {
    const inputs = newObj.querySelectorAll("input");

    const obj = {
        id: oldObj.id,
        date: oldObj.date,
        status: false
    }

    inputs.forEach(input => {
        switch (input.key) {
            case "productPrice": obj.productPrice = input.value;
                return
            case "currencyUnits": obj.currencyUnits = input.value;
                return
            case "productDescription": obj.productDescription = input.value;
                return
            case "productImage": obj.productImage = input.value;
                return
            case "productName": obj.productName = input.value;
                return
            case "productQuantity": obj.productQuantity = input.value;
                return
        }
    })
    if (obj.productQuantity > 0) {
        obj.status = true;
    } else {
        obj.status = false;
    }
    const store = JSON.parse(localStorage.store);
    store.splice(store.findIndex(el => el.id === oldObj.id), 1, obj);
    localStorage.store = JSON.stringify(store);
}


//
function delProductItemEvent(e) {
    const store = JSON.parse(localStorage.store);

    e.target.closest('tr').remove()
    console.log(e.target.dataset.key)
    store.splice(store.findIndex(({ id }) => e.target.dataset.key === id), 1)
    localStorage.store = JSON.stringify(store);
}