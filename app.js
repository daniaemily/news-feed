const categories = {
  'Top News': '',
  'Pop Culture' : 'entertainment',
  'Business' : 'business',
  'Tech' : 'technology',
  'Because Science' : 'science',
  'Sports' : 'sports'
};

function logwhaticlicked(title) {
  console.log(title);
  updatePageTitle(title);
  getArticles(title);
}

function updatePageTitle(title) {
  pageTitleEl = document.getElementById("page-title");
  pageTitleEl.innerText = title;
}

function getArticles(title) {
  const category = categories[title];
  // key has 1000 requests per day limit 
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=3bd915d84a3042d1be0b723b6ba01fa5`;

  // Fetch the articles
  axios.get(url)
  .then(function (response) {
    // looping through articles
    response.data.articles.forEach(function (article) {
      // pass the article to addArticle
      addArticle(article);
    });
  })
  .catch(function (error) {
    console.error(error);
  });
}

function addArticle(article) {
  /**
  * <li>
  *   <a href="url">Title</a>
  * </li>
  */

  // Get list element
  const articlesListEl = document.getElementById("articles");

  var articleListItem = document.createElement("LI");

  // <a href="url" target="_blank"></a>
  var articleLink = document.createElement("A");
  articleLink.setAttribute("href", article.url);
  articleLink.setAttribute("target", "_blank");

  // Add title to link
  var titleNode = document.createTextNode(article.title);
  articleLink.appendChild(titleNode);

  // Add link to list item
  articleListItem.appendChild(articleLink);

  // appending the a tag to the list element
  articlesListEl.appendChild(articleListItem);
}
