// SELECT ITEMS

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// EDIT OPTION

let editElement;
let editFlag = false;
let editID = "";

/************ EVENT LISTENERS ************/

// SUBMIT FORM

form.addEventListener('submit', addItem);

// Clear Items

clearBtn.addEventListener('click', clearItems);

/************ FUNCTIONS ************/

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag) {
        const element = document.createElement('article');
        // Add Class
        element.classList.add('grocery-item');
        //Add ID 
        const attr = document.createAttribute('data-id');  
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button type="button" class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            `;
            //Append Child
            list.appendChild(element);
            //Display Alert
            displayAlert(`Вы добавили ${value} в список`, 'success');
            //Show Container
        container.classList.add('show-container');
        // Add To Local Storage
        addToLocalStorage(id, value);
        // Set Back To Default
        setBackToDefault();
    }
    else if(value && editFlag) {
        console.log('editing');
    }
    else {
        displayAlert('Введите в поле значение', 'danger');
    }
}

// Display Alert

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // Remove Alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//Clear Items

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if(items.length > 0) {
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert('Вы очистили список', 'danger');
    setBackToDefault();
    //localStorage.removeItem('list'); 
}

//Set Back To Default

function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

// Local Storage 

function addToLocalStorage(id, value) {
    console.log('added to local storage');
}