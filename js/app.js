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
          <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Buy Now</button>
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

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone)
    
    // const getSensors = phone.mainFeatures.sensors;
    // console.log(getSensors)
    // for(const getSensor of getSensors){
    //     const newSensor = getSensor.charAt(0).toUpperCase() + getSensor.slice(1);
    //     console.log(newSensor);
    //     // return newSensor;
    // }
    const phoneDetailsModalLabel = document.getElementById('phoneDetailsModalLabel');
    phoneDetailsModalLabel.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${phone.releaseDate}</h5>
      <p class="card-text">Brand Name: ${phone.brand}</p>
      <p class="card-text">ChipSet: ${phone.mainFeatures.chipSet}</p>
      <p class="card-text">Display: ${phone.mainFeatures.displaySize}</p>
      <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
      <p class="card-text">Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No stotage found'}</p>
      <p id="text-text" class="card-text">Sensors: ${phone.mainFeatures.sensors.join(', ')}</p>
      </div>
    `;
}

const toggleSpinner = isLodding => {
    const loddingSpinner = document.getElementById('spinner');
    if(isLodding){
        loddingSpinner.classList.remove('d-none')
    }else{
        loddingSpinner.classList.add('d-none')
    }
}

loadPhones('a')