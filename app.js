function logwhaticlicked(title) {
  console.log(title);
  updatePageTitle(title);
}

function updatePageTitle(title) {
  pageTitleEl = document.getElementById("page-title");
  pageTitleEl.innerText = title;
}
