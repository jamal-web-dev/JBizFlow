const registerForm = document.getElementById("registerForm");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

passwordToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    passwordToggle.querySelector(".eye-open").style.display =
        isPassword ? "none" : "block";

    passwordToggle.querySelector(".eye-closed").style.display =
        isPassword ? "block" : "none";

    passwordToggle.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password"
    );
});

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const states = [
        { width: "0%", text: "Use 8+ characters" },
        { width: "25%", text: "Weak" },
        { width: "50%", text: "Fair" },
        { width: "75%", text: "Good" },
        { width: "100%", text: "Strong" }
    ];

    strengthBar.style.width = states[score].width;
    strengthText.textContent = states[score].text;
});

function showError(input, message) {
    const group = input.closest(".input-group");

    group.classList.remove("has-success");
    group.classList.add("has-error");

    group.querySelector(".input-error").textContent = message;
}

function clearError(input) {
    const group = input.closest(".input-group");

    group.classList.remove("has-error");
    group.classList.add("has-success");

    group.querySelector(".input-error").textContent = "";
}

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const terms = document.getElementById("terms");

    let valid = true;

    if (firstName.value.trim().length < 2) {
        showError(firstName, "Enter your first name.");
        valid = false;
    } else {
        clearError(firstName);
    }

    if (lastName.value.trim().length < 2) {
        showError(lastName, "Enter your last name.");
        valid = false;
    } else {
        clearError(lastName);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
    } else {
        clearError(email);
    }

    if (password.value.length < 8) {
        showError(password, "Password must contain at least 8 characters.");
        valid = false;
    } else {
        clearError(password);
    }

    if (!terms.checked) {
        terms.closest(".terms-check").style.color = "#f87171";
        valid = false;
    } else {
        terms.closest(".terms-check").style.color = "";
    }

    if (!valid) return;

    console.log("Registration form is valid.");
});