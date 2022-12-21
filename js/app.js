const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const divContainer = document.getElementById('phone-container');
const displayPhones = phones => {
    //console.log(typeof (phones));
    //console.log(phones);
    // if no phone fuond
    const noPhoneFound = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }
    phones = phones.slice(0, 20);
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
        </div>
        `;
        divContainer.appendChild(div);
    })
    spinnerDisplay(false);

}
divContainer.textContent = '';
document.getElementById('btn-search').addEventListener('click', function () {
    spinnerDisplay(true);
    const searchField = document.getElementById('search-field');

    const searchText = searchField.value;
    loadPhones(searchText);
    divContainer.textContent = '';

})

loadPhones();
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