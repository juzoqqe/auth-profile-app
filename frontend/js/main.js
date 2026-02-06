// Элементы
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const authTitle = document.getElementById('authTitle');
const backToLogin = document.querySelector('.back-to-login');
const toggleLogin = document.getElementById('toggleLogin');
const notification = document.getElementById('notification');

// Переключение форм
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    authTitle.textContent = "Регистрация";
    backToLogin.classList.remove('hidden');
    toggleLogin.classList.add('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    authTitle.textContent = "Вход в аккаунт";
    backToLogin.classList.add('hidden');
    toggleLogin.classList.remove('hidden');
});

// Регистрация
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });

        const data = await res.json();

        if (res.status === 201) {
            showNotification(data.message, 'success');
            registerForm.reset();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            authTitle.textContent = "Вход в аккаунт";
            backToLogin.classList.add('hidden');
            toggleLogin.classList.remove('hidden');
        } else {
            showNotification(data.message, 'error');
        }
    } catch (err) {
        console.error(err);
        showNotification('Ошибка сервера', 'error');
    }
});

// Логин
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'profile.html';
        } else {
            showNotification(data.message, 'error');
        }
    } catch (err) {
        console.error(err);
        showNotification('Ошибка сервера', 'error');
    }
});

// Уведомления
function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = '';
    notification.classList.add(type);
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
}
