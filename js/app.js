const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const divContainer = document.getElementById('phone-container');
const displayPhones = (phones, dataLimit) => {
    //console.log(phones);
    // if no phone fuond
    const noPhoneFound = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    } else {
        noPhoneFound.classList.add('d-none');
    }
    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // show all phone in a div by append child
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in
                to additional content. This content is a little bit longer.</p>
            <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>

        </div>
        `;
        divContainer.appendChild(div);
    })
    spinnerDisplay(false);

}
divContainer.textContent = '';

const processSearch = (dataLimit) => {
    spinnerDisplay(true);
    const searchField = document.getElementById('search-field');
    //get the value of search field
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    divContainer.textContent = '';
}
// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);
})

// handle search button by press Enter key
document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key);
    if (e.key === 'Enter') {
        //code here
        processSearch(10);
    }
})

loadPhones('apple');
// spin loader function
const spinnerDisplay = (isLoading) => {
    const spinnerWorking = document.getElementById('spin-loader');
    if (isLoading) {
        spinnerWorking.classList.remove('d-none');
    }
    else {
        spinnerWorking.classList.add('d-none');
    }
}

// show the other phone from ten to end
document.getElementById('show-all').addEventListener('click', function () {

    processSearch();
    spinnerDisplay(false);
})
const loadPhoneDetails = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phone/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('data show', data.data);
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    const phoneName = document.getElementById('exampleModalLabel');
    const phoneTitle = phone.name;
    phoneName.innerText = phoneTitle;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>${phone.releaseDate ? phone.releaseDate : 'No Release Date'}<p/>
    `
}

