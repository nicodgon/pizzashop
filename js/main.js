const food = document.getElementById("food__container")
const categContainer = document.querySelector(".categories")
const title = document.getElementById("title__catalogo")
const categories = [{name:"MENÚ",img:"./assets/images/icons/categories/menú_icon.svg"},{name:"PIZZAS",img:"./assets/images/icons/categories/pizza_icon.svg"},{name:"EMPANADAS",img:"./assets/images/icons/categories/empanada_icon.svg"}]
const myCarouselElement = document.querySelector('#carouselFood')

//Configuracion del carrusel de bootstrap
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 3000,
  touch: false,
  pause: false
})

//Llamado al json con los productos
fetch("../data/products.json").then(response=>response.json()).then(data=>{
  //Renderizar categoria "MENÚ"
  function printAll(){
    data.map(prod=>{
      const element = `<div class="detail__container">
      <span class="title">${prod.product}</span>
      <img class="detail__img" src=${prod.image}>
      <span class="price">$ ${prod.price}</span>
      <div>`
      food.insertAdjacentHTML("beforeend",element)
    })
  }
  //Renderizar el resto de categorias
  function printCateg(catalogo){
    catalogo.map(prod=>{
      const element = `<div class="detail__container">
      <span class="title">${prod.product}</span>
      <img class="detail__img" src=${prod.image}>
      <span class="price">$ ${prod.price}</span>
      <div>`
      food.insertAdjacentHTML("beforeend",element)
    })
  }
  //Renderizar los botones de las categorias con su funcionalidad
  function printCategories(){
    categories.map(categ=>{
      let element
      if(categ.name === "MENÚ"){
        element = `
        <button class="category__btn active" id=${categ.name}>
        <img class="category__icon" src=${categ.img}><span></span><p>${categ.name}</p></button>`
      } else{
        element = `
        <button class="category__btn" id=${categ.name}>
        <img class="category__icon" src=${categ.img}><span></span><p>${categ.name}</p></button>`
      }
      categContainer.insertAdjacentHTML("beforeend",element)
      const btn= document.getElementById(categ.name)
      btn.addEventListener('click',(event)=>{
        event.preventDefault()
        categories.forEach(categ=>{
          const btn= document.getElementById(categ.name)
          btn.classList.remove("active")
        })
        btn.classList.toggle("active")
        printFood(categ.name)
      })
      }
    )
  }
  printAll()
  printCategories()
  //Funcionalidad especifica de los botones
  function printFood(categ){
    food.innerHTML=''
    if(categ !== "MENÚ"){
      title.innerHTML=categ
      const catalogo = data.filter(prod=>prod.category == categ)
      printCateg(catalogo)
    }else{
      title.innerHTML=categ
      printAll()
    }
  }
})

