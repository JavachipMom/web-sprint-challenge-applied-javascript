// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element

const tabsContainer = document.querySelector(".topics");

axios
  .get("https://lambda-times-api.herokuapp.com/topics")
  .then((response) => {
    //with the .then I can get the response from the server with the data needed and console.log it
    // console.log(response);
    const tabsArr = response.data.topics;
    // console.log(tabsArr);
    tabsArr.forEach((tabs) => {
      const subject = tabsTopics(tabs);
      //   console.log(subject);
      tabsContainer.appendChild(subject);
    });
  })
  .catch((error) => {
    //This is to see any errors that come up during my axios request
    console.log("This is the error --> ", error);
  });

const tabsTopics = (topic) => {
  const tabs = document.createElement("div");

  tabs.classList.add("tab");
  tabs.textContent = topic;

  return tabs;
};
