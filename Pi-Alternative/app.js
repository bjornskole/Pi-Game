let app = document.getElementById("app");

updateView();
function updateView() {
  app.innerHTML = `
    <button onclick="backBtn()"  class="bckBrn">Back</button> 
    <div>${model.router.currentPage}</div>
    `;
}
changeView(mainView);
///// updated
