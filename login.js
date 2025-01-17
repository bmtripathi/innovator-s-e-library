const fetchcred = async (mail, password, rollNumber) => {
  try {
    const response = await fetch(
      `http://localhost:3000/login/${mail}/${password}/${rollNumber}`
    );
    const data = await response.json();

    if (data.mssg.startsWith("Welcome, your book")) {
      alert(`Your book "${data.bookName}" is due on ${data.dueDate}`);
      window.location.href = "books.html";
    } else if (data.mssg === "Welcome") {
      window.location.href = "books.html";
    } else {
      console.log(data.mssg);
    }
  } catch (err) {
    console.log("Error fetching your information", err);
  }
};

document.querySelector(".submit").addEventListener("click", () => {
  const mail = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rollNumber = document.getElementById("rollNumber").value;

  fetchcred(mail, password, rollNumber);
});

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle the eye icon (optional)
    this.textContent = type === "password" ? "\uD83D\uDC41" : "\uD83D\uDC45"; // Unicode for eye and tongue-out emoji
  });
