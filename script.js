
//1.
const authorContainer = document.getElementById("author-container");
const loadMoreBtn = document.getElementById("load-more-btn");

//2. * ISPOD
fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")      //Ovo je GET request. Step 2.
.then((res) => res.json())
.then((data) => {
    authorDataArr = data;           //Onaj dole prazan array = data. A data smo izvukli iz json valjda.
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));    //Ima dosta autora u tom json file-u ali necu da ispisem sve od jednom zato radim slice da pozovem deo samo. Step 16. - Now it's time to call the displayAuthors function. But again, you don't want to populate the page with all the authors at once. Instead, you can extract a portion of the authors with the startingIndex and endingIndex variables. The best method to do this is the .slice() array method. First, remove the console log statement showing authorDataArr. Then, call the displayAuthors function with the authorDataArr array and .slice(). Use the startingIndex variable for the starting point and the endingIndex variable for the ending point.
})
.catch((err) => {
    authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`;
});

//3.
let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

//4. ** ISPOD     Step 8. - Now you'll create a function to populate the UI with the author data. You will call this function inside the second .then() method. Create an empty arrow function named displayAuthors that takes authors as a parameter.
const displayAuthors = (authors) => {
    authors.forEach(({author, image, url, bio}, index) => {         //Prvi parametar sam dobio pomocu destructuring.
        authorContainer.innerHTML += `
        <div id="${index}" class="user-card">
            <h2 class="author-name">${author}</h2>
            <img class="user-img" src=${image} alt="${author} avatar">
            <div class="purple-divider"></div>
            <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>  
            <a class="author-link" href=${url} target=_blank>${author}'s author page</a> 
        </div>
        `;              //Kod alt imam ove navodnike "". Tako sam morao jer je unutar `` pa ne moze opet `` da se koristi.
    });                 //kod p imam ovo bio.length. Tu radim length na stringu. A iako je bio duzi od 50 slova onda radim slice(0, 50) i dodajem tri tacke, a ako je kraci onda bio ostaje taj koji jeste.
};

//Step 20. - Now you have everything you want to include in the UI. The next step is to make the Load More Authors button fetch more authors whenever it's clicked. You can do this by adding a click event to the button and carefully incrementing the startingIndex and endingIndex variables. Create a fetchMoreAuthors function with the arrow function syntax. Don't put anything in it yet. Make sure you use curly braces because you'll have more than one expression inside the function.
const fetchMoreAuthors = () => {
    startingIndex += 8;
    endingIndex += 8;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
    if(authorDataArr.length <= endingIndex){
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more data to load";
        loadMoreBtn.style.cursor = "not-allowed";
    }
};

loadMoreBtn.addEventListener("click", fetchMoreAuthors);





// *
// fetch("https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json")      //Ovo je GET request. Step 2.  fetch returnuje Promise sto je placeholder object. Ako je fetch request ispunjen onda promise valjda postaje response, a ako nije ondsa je rejected(odbijeno).
// .then((res) => res.json())          //ovde je res ustvari response Object. Mogao sam uraditi console.log(res). Ali to res nije jos upotrebljivo. Zato sam dodao .json() method
// .then((data) => {                   //Da bi mogao da koristim fetchovane podatke moram da uradim jos jedno .then()
//     authorDataArr = data;           //Onaj dole prazan array = data. A data smo izvukli iz json valjda.
//     displayAuthors(authorDataArr.slice(startingIndex, endingIndex));    //Ima dosta autora u tom json file-u ali necu da ispisem sve od jednom zato radim slice da pozovem deo samo. Step 16. - Now it's time to call the displayAuthors function. But again, you don't want to populate the page with all the authors at once. Instead, you can extract a portion of the authors with the startingIndex and endingIndex variables. The best method to do this is the .slice() array method. First, remove the console log statement showing authorDataArr. Then, call the displayAuthors function with the authorDataArr array and .slice(). Use the startingIndex variable for the starting point and the endingIndex variable for the ending point.
// })
// .catch((err) => {       //Ako je promise rejected onda nam je ovo korisno da mozemo da registrujemo gresku.
//     authorContainer.innerHTML = `<p class="error-msg">There was an error loading the authors</p>`;  //Ispisuje ovo ako ima error.
// });


// **
// const displayAuthors = (authors) => {       //U ovu funkciju cu da prosledim onaj array sto sad preko fetch dobio
//     authors.forEach(({author, image, url, bio}, index) => {         //Prvi parametar sam dobio pomocu destructuring.
//         authorContainer.innerHTML += `
//         <div id="${index}" class="user-card">
//             <h2 class="author-name">${author}</h2>
//             <img class="user-img" src=${image} alt="${author} avatar">
//             <div class="purple-divider"></div>
//             <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
//             <a class="author-link" href=${url} target=_blank>${author}'s author page</a> 
//         </div>
//         `;              //Kod alt imam ove navodnike "". Tako sam morao jer je unutar `` pa ne moze opet `` da se koristi.
//     });      
// };