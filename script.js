document.addEventListener("DOMContentLoaded", function () {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];

  const feedbackSection = document.getElementById("feedback");
  const commentList = document.createElement("ul");
  commentList.id = "comment-list";
  feedbackSection.appendChild(commentList);

  savedComments.forEach((comment) => {
    addCommentToList(comment);
  });

  const commentForm = document.getElementById("commentform");
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const userComment = document.getElementById("comment").value;

    const newComment = {
      name,
      surname,
      email,
      comment: userComment,
    };

    savedComments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(savedComments));

    // Display the comment
    addCommentToList(newComment);

    commentForm.reset();
  });
  function addCommentToList(comment) {
    const commentListItem = document.createElement("li");
    commentListItem.innerHTML = `<img src="user.jpg" alt="pogi ako" width="50px;"> <strong>${comment.name} ${comment.surname}</strong>: ${comment.comment}`;
    commentList.appendChild(commentListItem);
  }
});

// Save comments if the user leaves the page
window.addEventListener("beforeunload", function () {
  const commentForm = document.getElementById("commentform");
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const userComment = document.getElementById("comment").value;

  // Check if any form fields have values
  if (name || surname || email || userComment) {
    // Save the form values to local storage
    localStorage.setItem(
      "unsavedComment",
      JSON.stringify({
        name,
        surname,
        email,
        comment: userComment,
      })
    );
  }

  function submitForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You are now a registered user.",
        });
      } else {
        // Show error message for password mismatch
        Swal.fire({
          icon: "error",
          title: "Password Mismatch",
          text: "Please make sure the passwords match.",
        });
      }
    } else {
      // Show error message for incomplete form
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill out all fields.",
      });
    }
  }

  function postComment() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var comment = document.getElementById("comment").value;
    var imageUrl = document.getElementById("imageUrl").value;

    if (name && surname && comment) {
      // display user feedback
      var userFeedbackDiv = document.getElementById("userFeedback");
      var newUserFeedback = document.createElement("div");
      newUserFeedback.innerHTML = `
                <p><strong>${name} ${surname}</strong>: ${comment}</p>
                <img src="user.jpg" alt="User Image">
            `;
      userFeedbackDiv.appendChild(newUserFeedback);

      saveCommentToLocalStorage(name, surname, comment, imageUrl);

      document.getElementById("commentform").reset();
    } else {
      alert("Please fill out all required fields (Name, Surname, Comment).");
    }
  }

  function saveCommentToLocalStorage(name, surname, comment, imageUrl) {
    var existingComments = JSON.parse(localStorage.getItem("comments")) || [];

    existingComments.push({
      name: name,
      surname: surname,
      comment: comment,
      imageUrl: imageUrl,
    });

    localStorage.setItem("comments", JSON.stringify(existingComments));
  }

  function loadCommentsFromLocalStorage() {
    var existingComments = JSON.parse(localStorage.getItem("comments")) || [];
    var userFeedbackDiv = document.getElementById("userFeedback");

    existingComments.forEach(function (user) {
      var userFeedback = document.createElement("div");
      userFeedback.innerHTML = `
                <p><strong>${user.name} ${user.surname}</strong>: ${user.comment}</p>
                <img src="user.jpg" alt="User Image">
            `;
      userFeedbackDiv.appendChild(userFeedback);
    });
  }

  loadCommentsFromLocalStorage();

  // Select all menu items
  const menuItems = document.querySelectorAll(".menu-items a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("checkbox").checked = false;
    });
  });
});
