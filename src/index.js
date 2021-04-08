let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toyData()
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

  function toyData () {
    fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(getToyData => { 
    //iterate
    getToyData.forEach(toy => {
      renderToyInfo(toy)
    })
  })
}
});


  const renderToyInfo = (toy) => {
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
      let likeBtn = document.createElement('button')
      likeBtn.class = 'like-btn'
      likeBtn.innerText = 'Like <3'
      likeBtn.addEventListener('click', e => showLikes(e, toy))

      toyCollection.appendChild(divCard)
      divCard.append(h2, img, p, likeBtn)
    }

   const addNewToy = e => {
      let newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      }
      createToy(newToy)
    }

    const createToy = toy => {
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(toy)
      })
        .then(resp => resp.json())
        .then(showToy(toy))
    }

const showLikes = (e, toy) => {
  let num = parseInt(e.target.parentElement.children[2].innerText)
  e.target.parentElement.children[2].innerText = num + 1
  likeToy(toy)
}

const likeToy = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: toy.likes++ })
  }).then(resp => resp.json())
}
