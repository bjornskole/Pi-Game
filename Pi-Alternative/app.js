let app = document.getElementById("app");

updateView();
function updateView() {
  app.innerHTML = `
    <button onclick="backBtn()"  class="bckBtn" style="display:${model.showBBtn}">Back</button> 
    <div>${model.router.currentPage}</div>
    `;
}
changeView(mainView);
///// updated

function changeView(element) {
  model.router.currentPage = element();
  updateView();
  inputFocus(element);
}