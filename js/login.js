const btnLogin = document.getElementById("login");
const btnRegistro = document.getElementById("registro");
const formRegistro = document.querySelector(".registrarte");
const formLogin = document.querySelector(".loguearse");
const btnIngresoReg = document.getElementById("btnRegistro");
const btnLoguearse = document.getElementById("btnloguearse");
const titulo = document.getElementById("titulo");

// Obtener usuarios almacenados en localStorage
const storedUsers = localStorage.getItem('users');
const Users = storedUsers ? JSON.parse(storedUsers) : [];

// Usuario administrador
const adminUser = {
    name: 'Mike',
    email: 'mike@gmail.com',
    password: '12345'
};

// Verifica si el usuario administrador ya está registrado
const isAdminRegistered = Users.find(user => user.email === adminUser.email);

if (!isAdminRegistered) {
    // Si el usuario administrador no está registrado, agrégalo
    Users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(Users));
}

// Evento de registro
const signupForm = document.querySelector('.registro1');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#inputNombre').value;
    const email = document.querySelector('#inputRegistroCorreo').value;
    const password = document.querySelector('#inputRegistroContr').value;

    const isUserRegistered = Users.find(user => user.email === email);

    if (isUserRegistered) {
        return alert('El usuario ya está registrado!');
    }

    Users.push({ name: name, email: email, password: password });
    localStorage.setItem('users', JSON.stringify(Users));
    alert('Registro Exitoso!');
    formRegistro.classList.add("hide");
    formLogin.classList.remove("hide");
});

// Evento de inicio de sesión
const loginForm = document.querySelector('.loguin2');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#lblCorreo').value;
    const password = document.querySelector('#lblContraseña').value;

    const validUser = Users.find(user => user.email === email && user.password === password);
    const useradmin = email === adminUser.email && password === adminUser.password;

    if (!email || !password) {
        return alert('Por favor, complete todos los campos.');
    }

    if (!validUser && !useradmin) {
        return alert('Usuario y/o contraseña incorrectos!');
    }

    if (useradmin) {
        alert('Bienvenido Admin');
        localStorage.setItem('login_success', JSON.stringify(adminUser));
        window.location.href = 'index.html';
    } else {
        alert(`Bienvenido ${validUser.name}`);
        localStorage.setItem('login_success', JSON.stringify(validUser));
        window.location.href = 'usuarios.html';
    }
});

// Cambiar a formulario de inicio de sesión
btnLogin.addEventListener("click", e => {
    formRegistro.classList.add("hide");
    formLogin.classList.remove("hide");
    titulo.textContent = "Inicio de sesión";
});

// Cambiar a formulario de registro
btnRegistro.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegistro.classList.remove("hide");
    titulo.textContent = "Registro";
});
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.parentElement.querySelector('.password-toggle i');

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove('bx-hide');
        eyeIcon.classList.add('bx-show');
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove('bx-show');
        eyeIcon.classList.add('bx-hide');
    }
}

function validarRegistro() {
    const password = document.getElementById("inputRegistroContr").value;
    const confirmPassword = document.getElementById("inputConfirmContr").value;

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
        return false;
    }

    return true;
}