const loginForm = document.getElementById("loginForm");
const loginPassword = document.getElementById("loginPassword");
const loginPasswordToggle = document.getElementById("loginPasswordToggle");

loginPasswordToggle.addEventListener("click", () => {
    const isPassword = loginPassword.type === "password";

    loginPassword.type = isPassword ? "text" : "password";

    loginPasswordToggle.querySelector(".eye-open").style.display =
        isPassword ? "none" : "block";

    loginPasswordToggle.querySelector(".eye-closed").style.display =
        isPassword ? "block" : "none";

    loginPasswordToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

function showLoginError(input, message) {
    const group = input.closest(".input-group");

    group.classList.remove("has-success");
    group.classList.add("has-error");

    group.querySelector(".input-error").textContent = message;
}

function clearLoginError(input) {
    const group = input.closest(".input-group");

    group.classList.remove("has-error");
    group.classList.add("has-success");

    group.querySelector(".input-error").textContent = "";
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    let valid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        showLoginError(email, "Enter a valid email address.");
        valid = false;
    } else {
        clearLoginError(email);
    }

    if (password.value.trim() === "") {
        showLoginError(password, "Enter your password.");
        valid = false;
    } else {
        clearLoginError(password);
    }

    if (!valid) return;

    console.log("Login form is valid.");
});