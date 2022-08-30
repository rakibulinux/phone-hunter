const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data)
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container')
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
}

loadPhones()