const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = phones => {
    console.log(typeof (phones));
    //console.log(phones);
    const divContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        const div = document.createElement('div');

        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in
                to additional content. This content is a little bit longer.</p>
        </div>
        `;
        divContainer.appendChild(div);
    })

}
loadPhones();