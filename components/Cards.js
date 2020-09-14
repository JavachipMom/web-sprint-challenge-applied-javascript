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

axios
  .get("https://lambda-times-api.herokuapp.com/articles")
  .then((response) => {
    console.log(response);
    const cardArr = response.data.articles;
    console.log("These are the cardsArr, ", cardArr);

    const articleObject = Object.values(cardArr);
    console.log("These are the Objects, ", articleObject);

    articleObject.forEach((array) => {
      array.forEach((card) => {
        cardContainer.appendChild(articleCard(card));
      });
    });
  })
  .catch((error) => {
    console.log("This is the error --> ", error);
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
  author.textContent = article.authorName;

  articleCard.addEventListener("click", () => {
    console.log(article.headline);
  });

  return articleCard;
};
