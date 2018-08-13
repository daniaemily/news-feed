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
      const listItemEl = buildArticleHtml(article);
      listItems.push(listItemEl);
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

function buildArticleHtml(article) {
  return `
    <li>
     <a target="_blank" href="${article.url}">${article.title}</a>
     <img class="article-image" src="${article.urlToImage}"></img>
    </li>
  `;
}
