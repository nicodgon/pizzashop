const food = document.getElementById("food__container")
const categContainer = document.querySelector(".categories")
const title = document.getElementById("title__catalogo")
const categories = [{name:"TODO",img:"./assets/images/categories/food_icon.svg"},{name:"PIZZAS",img:"./assets/images/categories/pizza_icon.svg"},{name:"EMPANADAS",img:"./assets/images/categories/patty_icon.svg"}]
const myCarouselElement = document.querySelector('#carouselFood')

//Configuracion del carrusel de bootstrap
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 3000,
  touch: false,
  pause: false
})

//Llamado al json con los productos
fetch("../data/products.json").then(response=>response.json()).then(data=>{
  //Renderizar categoria todo
  function printAll(){
    data.map(prod=>{
      const element = `<div class="container__detail"><img class="detail__img" src=${prod.imagen}>
      <p class="price">$ ${prod.precio}</p><div>`
      food.insertAdjacentHTML("beforeend",element)
    })
  }
  //Renderizar el resto de categorias
  function printCateg(catalogo){
    catalogo.map(prod=>{
      const element = `<div class="container__detail"><img class="detail__img" src=${prod.imagen}>
      <p class="price">$ ${prod.precio}</p><div>`
      food.insertAdjacentHTML("beforeend",element)
    })
  }
  //Renderizar los botones de las categorias con su funcionalidad
  function printCategories(){
    categories.map(categ=>{
      const element = `
      <button class="category__btn" id=${categ.name}>
      <img class="category__icon" src=${categ.img}><span></span><p>${categ.name}</p></button>`
      categContainer.insertAdjacentHTML("beforeend",element)
      const btn= document.getElementById(categ.name)
      btn.addEventListener('click',(event)=>{
        event.preventDefault()
        food.innerHTML=''
        printFood(categ.name)
      })
      }
    )
  }
  printAll()
  printCategories()
  //Funcionalidad especifica de los botones
  function printFood(categ){
    if(categ !== "TODO"){
      title.innerHTML=categ
      const catalogo = data.filter(prod=>prod.categoria == categ)
      printCateg(catalogo)
    }else{
      title.innerHTML=categ
      printAll()
    }
  }
})

