const dropdownBtn = document.querySelector('.header__burger-dropdown')

const myFunction = (btnEl) => {
  btnEl.classList.toggle("opened")
  document.getElementById('myDropdown').classList.toggle("show")
  document.body.classList.toggle('burger__overflow')
  
}

const itemTemplate = document.getElementById('slider-item')
const sliderWrapper = document.getElementById('slider-wrapper')

const fetchPets = async () => {
  const res = await fetch(location.href + '/../pets.json')
  return res.json()
}

const loadSliderItems = async () => {
  try {
    const pets = await fetchPets()

    pets.map((pet, petIdx) => {
      itemTemplate.content.querySelector('img').src = pet.img.replace('../../', '')
      itemTemplate.content.querySelector('[data-name]').innerText = pet.name
      itemTemplate.content.querySelector('button').setAttribute('data-petID', petIdx)

      const itemNode = document.importNode(itemTemplate.content, true)

      sliderWrapper.appendChild(itemNode)
      sliderWrapper.querySelector(`[data-petID='${petIdx}']`).onclick = openModal(pet)
    })
    const randomized = [...pets].sort(() => Math.random() <= 0.5)
    randomized.map((pet, petIdx) => {
      itemTemplate.content.querySelector('img').src = pet.img.replace('../../', '')
      itemTemplate.content.querySelector('[data-name]').innerText = pet.name
      itemTemplate.content.querySelector('button').setAttribute('data-petID', petIdx)
      itemTemplate.content.querySelector('button').onclick = openModal(pet)
      const itemNode = document.importNode(itemTemplate.content, true)
      
      sliderWrapper.appendChild(itemNode)
      sliderWrapper.querySelector(`[data-petID='${petIdx}']`).onclick = openModal(pet)
    })

    const swiper = new Swiper('.swiper-container', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1280: {
          slidesPerView: 3,
          spaceBetween: 90,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        430: {
          slidesPerView: 1,
          spaceBetween: 20,
        }
      }
    });
    console.log(swiper)
  } catch(e) {
    console.error(e)

    alert("Could not fetch pets information. Please try again later, or pray for your internets.")
  }
}

loadSliderItems()



const toggleModal = () => {
  document.body.classList.toggle('burger__overflow')
  document.querySelector('.modal').classList.toggle('modal--hidden')
  
}

document.querySelector('.modal__close-bar').addEventListener('click', toggleModal)

const openModal = pet => () => {
  
  
  console.log(pet)
  
  document.querySelector('.modal__picture').src = pet.img.replace('../../', '')
  document.querySelector('.modal__name').innerText = pet.name
  document.querySelector('.modal__pet-type').innerText = `${pet.type} - ${pet.breed}`
  document.querySelector('.modal__description').innerText = pet.description
  document.querySelector('.age').innerText = pet.age
  document.querySelector('.inocul').innerText = pet.inoculations
  document.querySelector('.diseases').innerText = pet.diseases
  document.querySelector('.parasites').innerText = pet.parasites
  
  toggleModal()

}
