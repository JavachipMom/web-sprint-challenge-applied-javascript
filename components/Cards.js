// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardContainer = document.querySelector(".cards-container");
const errorContainer = document.querySelector(".errors-container");

axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((response) => {
    console.log(response);
    const cardArr = response.data.articles;
    console.log("These are the cardsArr, ", cardArr);

    //Object.values gives you the values inside the object and creates a new array for you
    const articles = Object.values(cardArr);
    console.log("These are the Objects, ", articles);

    //can only use a forEach on the array NOT a Object itself
    articles.forEach((array) => {
      array.forEach((card) => {
        cardContainer.appendChild(articleCard(card));
      });
    });
  })
  .catch((error) => {
    const requestErr = error.request.status;
    console.log("This is the error --> ", requestErr);
    errorContainer.appendChild(errorMessage(error));
  });

const articleCard = (article) => {
  const articleCard = document.createElement("div");
  const headline = document.createElement("div");
  const authorDiv = document.createElement("div");
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  const author = document.createElement("span");

  articleCard.classList.add("card");
  headline.classList.add("headline");
  authorDiv.classList.add("author");
  imgContainer.classList.add("img-container");

  articleCard.appendChild(headline);
  articleCard.appendChild(authorDiv);
  authorDiv.appendChild(imgContainer);
  imgContainer.appendChild(img);
  authorDiv.appendChild(author);

  headline.textContent = article.headline;
  img.src = article.authorPhoto;
  author.textContent = "By: " + article.authorName;

  articleCard.addEventListener("click", () => {
    console.log(article.headline);
  });

  return articleCard;
};

//Even though I already submitted my Sprint wanted to work on the stretch goal to show the user the error on the screen..

const errorMessage = (status) => {
  //Creating my component for the axios .catch error and producing the status..
  const errDiv = document.createElement("div");
  const message = document.createElement("h3");

  errDiv.appendChild(message);
  message.textContent = `This is producing the following ${status}`;

  return errDiv;
};
