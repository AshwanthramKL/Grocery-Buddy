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
// form submit
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener('click', clearItems); 

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

        // adding event listeners to edit and delete btns
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);

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
        editElement.textContent = value;
        displayAlert('successfully edited', 'success');
        // Edit in local storage
        editLocalStorage(editID, value);
        setBackToDefault();
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
    }, 1000);
}

// Set back to default
function setBackToDefault(){
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = "submit";
}

// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    
    if(items.length > 0){
        items.forEach((item)=>{
            list.removeChild(item);
        });
            
    }
    // hide grocery container
    container.classList.remove('show-container'); 
    // display alert
    displayAlert('Empty list', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');

}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    list.removeChild(element);
    // hide container if list is empty
    if(list.children.length < 1){
        container.classList.remove('show-container');
    }
    // display alert
    displayAlert('item removed', 'danger');
    // set back to default
    setBackToDefault();
    removeFromLocalStorage(id);
}


function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.textContent;
    submitBtn.textContent = 'edit';
    editFlag = true;
    editID = element.dataset.id;

}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
    // each time you setitem the existing items get overwritten, hence we use a list
    let grocery = {id, value};
    let items = getLocalStorage();
    // console.log(items);

    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();

    items = items.filter((item) => {
        if(id !== item.id){
            return item;
        }
    })

    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(editID, value){
    let items = getLocalStorage();
    items = items.map((item) =>{
        if(editID === item.id){
            item.value = value;
        
        return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')): [];
}
// ****** LocalStorage functions ******
// localStorage.setItem('orange', JSON.stringify(['item1', 'item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges);
// localStorage.removeItem('orange');
// ****** SETUP ITEMS **********