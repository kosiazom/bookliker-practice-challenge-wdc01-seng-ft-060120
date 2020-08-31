const BOOKS_URL = "http://localhost:3000/books/"
const USER_URL = "http://localhost:3000/users/"

document.addEventListener("DOMContentLoaded", function(e) {
    fetchBooks()
});

function fetchBooks(){
    fetch(BOOKS_URL)
    .then(resp => resp.json())
    .then( booksObject => renderAllBooksList(booksObject) )

}

function renderAllBooksList(booksObject) {
    booksObject.forEach(book => renderBookList(book) )
//console.log(renderAllBooksList(booksObject))
};

function renderBookList(book) {
    let bookList = document.getElementById('list')
    let li = document.createElement('li')
    li.innerText = `${book.title}`
    bookList.append(li)

    li.addEventListener('click', ()=> 
        showABook(book) )
}
    
function showABook(book) {
    let bookDiv = document.getElementById('show-panel')
    bookDiv.innerHTML = ""
    let img = document.createElement('img')
    img.src = `${book.img_url}`
    bookDiv.append(img)

    let h2 = document.createElement('h2')
    h2.innerHTML = `Title: ${book.title}`
    bookDiv.append(h2)

    let h3 = document.createElement('h3')
    h3.innerHTML = `Author: ${book.author}`
    bookDiv.append(h3)

    let h4 = document.createElement('h4')
    h4.innerHTML = `Subtitle: ${book.subtitle}`
    bookDiv.append(h4)

    let p = document.createElement('p')
    p.innerHTML = `Description: ${book.description}`
    bookDiv.append(p)

    let ul = document.createElement('ul')
    ul.className = "user-list"
    bookDiv.append(ul)

    let likeButton = document.createElement('button')
    likeButton.innerText = "Like Book"
    likeButton.addEventListener('click', (e) => {
        likeBook(book)
    })
    

    //userLi.innerHTML = `${book.users}`
    let bookUser = book.users
    bookUser.forEach(user => {
        let userLi = document.createElement('li')
        userLi.innerText =  user.username 
        userLi.dataset.userId = user.id
        ul.appendChild(userLi)
    })    

    bookDiv.append(img, h2, h3, h4, p, ul, likeButton)
    
  // console.log(likeButton)
    // likeButton.innerText = 'Like'
  
    // likeButton.dataset.userId = user.id
    // bookDiv.append(likeButton)

    //addlisterner here and then update function. when you clicck the button add another li with the user.username
}

function likeBook(book) {
   book.users.push({"id": 1, "username": "pouros"} ) //book.user is an array so we want to push that username into the array
   //debugger

    let newUserInfo = {"users": book.users}

    let patchRequest = {
        method: "PATCH", 
        headers : {
            "Content-type": "application/json",
            Accept: "application/json"
        }, 

        body: JSON.stringify(newUserInfo)
    }

    fetch(BOOKS_URL + book.id, patchRequest)
    .then(resp => resp.json() )
    .then(newLike => { showABook(newLike) })
}



