const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const showMorePhones = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.innerHTML = ``

    //Show more
    const showMore = document.getElementById('show-more');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10)
        showMore.classList.remove('d-none')
    }
    else{
        showMore.classList.add('d-none')

    }
    //Display 20 result

    //Display no phone message
    const noPhone = document.getElementById('no-found-message')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    console.log(phones)
    phones.forEach(phone => {
        const {brand, image, phone_name, slug} = phone
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-2 rounded">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">Brand Name: ${brand}</p>
          <button class="btn btn-primary"><a class="text-light text-decoration-none" href="/${slug}">Buy Now</a></button>
        </div>
      </div>        
        `
        phonesContainer.appendChild(phoneDiv)
    });
    toggleSpinner(false)

}

document.getElementById('btn-search').addEventListener('click', function(){
    showMorePhones(10)

})
document.getElementById('btn-show-more').addEventListener('click', function(){
    showMorePhones()

})

const toggleSpinner = isLodding => {
    const loddingSpinner = document.getElementById('spinner');
    if(isLodding){
        loddingSpinner.classList.remove('d-none')
    }else{
        loddingSpinner.classList.add('d-none')
    }
}

loadPhones('a')