// Constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

// display constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
  tableBody = document.getElementById("tableBody");
  let uiString = `  <tr>
                        <td> ${book.name} </td>
                        <td> ${book.author} </td>
                        <td> ${book.type} </td>
                    </tr>`;

  tableBody.innerHTML += uiString;
};
// function to clear form
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// function for form validation
Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, showMessage) {
  let message = document.getElementById("message");
  var alertText;
  if (type == "success") {
    alertText = "Success";
  } else {
    alertText = "Error";
  }
  message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong> ${alertText}! </strong> ${showMessage}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
            </div>
  `;

  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
};

// Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let other = document.getElementById("other");

  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (other.checked) {
    type = other.value;
  }

  let book = new Book(name, author, type);
  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has been successfully added");
  } else {
    display.show("danger", "Please fill the name & author section");
    display.clear();
  }
  e.preventDefault();
}
