let app = document.getElementById("app");

updateView();
function updateView() {
  app.innerHTML = `
    <button onclick="backBtn()">Back</button>
    <div>${model.router.currentPage}</div>
    `;
}
changeView(mainView);
///// updated
// Adrian be testing if the commit is allowed or nah