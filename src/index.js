let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }


  });

  function fetchToys () {
    fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(renderToys => console.log(renderToys))
  }

    function renderToyInfo(toy) {
      let toyCollection = document.getElementById("toy-collection")
      let divCard = document.createElement('div')
      divCard.className = "card"
      let h2 = document.createElement("h2")
      h2.innerHTML = toy.name
      let img = document.createElement("img")
      img.src = toy.image
      img.alt = toy.name
      img.className = "toy-avatar"
      let p = document.createElement("p")
      p.innerText = `${toy.likes} Likes`
      
      divCard.append(h2, img, button, p)
      toyCollection.appendChild(divCard)
    }

    function addNewToy () {
      
    }


   



  


});



