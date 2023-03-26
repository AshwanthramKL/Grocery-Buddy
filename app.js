// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();

    if(value && !editFlag){
        let element = document.createElement('article');
        element.classList.add('grocery-item');
        // add id
        // const attr = document.createAttribute('data-id');
        // attr.value = id;
        element.setAttribute('data-id', id);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`

        // Add element to list
        list.appendChild(element);

        // display container
        container.classList.add('show-container');

        // display alert
        displayAlert('Item added to the list', 'success');
        
        // add to local storage
        addToLocalStorage(id, value)

        // Set Back to Default
        setBackToDefault()
    }
    else if(value && editFlag){
        console.log('add item');            
    }
    else{
        displayAlert('Please Enter Value', 'danger');
    }
}

// Display the alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // to remove alert after some time
    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1500);
}

// Set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = "submit";
}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    console.log('added to local storage');
}



// ****** SETUP ITEMS **********
