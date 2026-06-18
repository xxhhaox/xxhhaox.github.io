const passwordInput = document.getElementById("password");

function updateLength() {
    document.getElementById("lengthValue").textContent =
        document.getElementById("length").value;
}

function generatePassword() {

    let chars = "";

    if (document.getElementById("upper").checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (document.getElementById("lower").checked)
        chars += "abcdefghijklmnopqrstuvwxyz";

    if (document.getElementById("number").checked)
        chars += "0123456789";

    if (document.getElementById("symbol").checked)
        chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
        alert("Please select at least one character type.");
        return;
    }

    const length = parseInt(
        document.getElementById("length").value,
        10
    );

    let password = "";

    for (let i = 0; i < length; i++) {
        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    passwordInput.value = password;

    checkStrength(password);
}

function checkStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");

    if (score <= 2) {
        bar.style.width = "25%";
        bar.style.background = "#da3633";
        text.textContent = "Strength: Weak";
    } else if (score <= 4) {
        bar.style.width = "60%";
        bar.style.background = "#d29922";
        text.textContent = "Strength: Medium";
    } else {
        bar.style.width = "100%";
        bar.style.background = "#2ea043";
        text.textContent = "Strength: Strong";
    }
}

function copyPassword() {

    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .then(() => {
            alert("Password copied!");
        })
        .catch(() => {
            alert("Copy failed.");
        });
}

generatePassword();
