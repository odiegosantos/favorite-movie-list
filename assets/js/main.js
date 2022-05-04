function addMovie() {
  var inTitle = document.getElementById("inTitle");
  var inGenre = document.getElementById("inGenre");
  var title = inTitle.value;
  var genre = inGenre.value;

  insertLine(tbMovies, title, genre);
  saveMovie(title, genre);

  inTitle.value = "";
  inGenre.value = "";
  inTitle.focus();
}
var btAddMovie = document.getElementById("btAddMovie");
btAddMovie.addEventListener("click", addMovie);


function insertLine(table, title, genre) {
  var linha = table.insertRow(-1);
  var col1 = linha.insertCell(0);
  var col2 = linha.insertCell(1);
  var col3 = linha.insertCell(2);

  col1.textContent = title;
  col2.textContent = genre;
  col3.innerHTML = "<input type='checkbox'>";
}

function saveMovie(title, genre) {

  if (localStorage.getItem("moviesTitle")) {
    var moviesTitle = localStorage.getItem("moviesTitle") + ";" + title;
    var moviesGenre = localStorage.getItem("moviesGenre") + ";" + genre;

    localStorage.setItem("moviesTitle", moviesTitle);
    localStorage.setItem("moviesGenre", moviesGenre);

  } else {
    localStorage.setItem("moviesTitle", title);
    localStorage.setItem("moviesGenre", genre);
  }
}

function recoverMovies() {
  if (localStorage.getItem("moviesTitle")) {
    var titles = localStorage.getItem("moviesTitle").split(";");
    var genres = localStorage.getItem("moviesGenre").split(";");

    for (var i = 0; i < titles.length; i++) {
      insertLine(tbMovies, titles[i], genres[i]);
    }
  }
}
recoverMovies();

var ckEverything = document.getElementById("ckEverything");

ckEverything.addEventListener("change", function () {
  var tbMovies = document.getElementById("tbMovies");
  var ckDelete = tbMovies.getElementsByTagName("input");

  var status = ckEverything.checked;
  for (var i = 1; i < ckDelete.length; i++) {
    ckDelete[i].checked = status;
  }
});

function removeMovies() {
  var tbMovies = document.getElementById("tbMovies");
  var ckDelete = tbMovies.getElementsByTagName("input");

  var selected = false;

  for (var i = 1; i < ckDelete.length; i++) {
    if (ckDelete[i].checked) {
      selected = true;
      break;
    }
  }
  if (!selected) {
    alert("Não há filmes Selecinados para exclusão");
    return;
  }
  if (confirm("Confirma Exclusão dos Filmes Selecionados?")) {

    localStorage.removeItem("moviesTitle");
    localStorage.removeItem("moviesGenre");

    for (i = 1; i < ckDelete.length; i++) {
      if (!ckDelete[i].checked) {

        title = tbMovies.rows[i].cells[0].textContent;
        genre = tbMovies.rows[i].cells[1].textContent;
        saveMovie(title, genre);
      }
    }

    for (i = ckDelete.length - 1; i > 0; i--) {
      if (ckDelete[i].checked) {
        tbMovies.deleteRow(i);
      }
    }
    ckDelete[0].checked = false;
  }
}
var btDelete = document.getElementById("btDelete");
btDelete.addEventListener("click", removeMovies);