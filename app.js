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

  axios.get(url)
  .then(function (response) {
    const listItems = [];
    response.data.articles.forEach(function (article) {
      const listItemEl = buildArticleListItem(article);
      listItems.push(listItemEl.outerHTML);
    });
    replaceList(listItems.join(''));
  })
  .catch(function (error) {
    console.error(error);
  });
}

function replaceList(body) {
  const articlesListEl = document.getElementById("articles");
  articlesListEl.innerHTML = body;
}


/**
<li>
 <a href="url">Title</a>
 <img src="img"></img>
</li>
*/
function buildArticleListItem(article) {
  const aTag = buildArticleLink(article);
  const imgTag = buildImageElement(article);

  const articleListItem = document.createElement("LI");
  articleListItem.appendChild(aTag);
  articleListItem.appendChild(imgTag);

  return articleListItem;
}

// <img src="img"></img>
function buildImageElement(article) {
  const articleImageEl = document.createElement("IMG"); // <img></img>
  articleImageEl.setAttribute("src", article.urlToImage); // <img src="article.urlToImage"></img>
  articleImageEl.setAttribute("class", "article-image"); // <img class="article-image" src="article.urlToImage"></img>
  return articleImageEl; // <img class="article-image" src="http://www.myimageurl.com"></img>
}

// <a href="url">Title</a>
function buildArticleLink(article) {
  const articleLink = document.createElement("A"); // <a></a>
  articleLink.setAttribute("href", article.url); // <a href="{article.url}"></a>
  articleLink.setAttribute("target", "_blank"); // <a target="_blank" href="{article.url}"></a>

  const titleNode = document.createTextNode(article.title);// "{article.title}"
  articleLink.appendChild(titleNode); // <a target="_blank" href="{article.url}">{article.title}</a>

  // <a target="_blank" href="http://myarticle.com/1">My Article</a>
  return articleLink;
}
