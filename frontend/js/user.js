const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

const usernameEl = document.getElementById('usernameUser');
const emailEl = document.getElementById('emailUser');
const descEl = document.getElementById('descriptionUser');
const avatar = document.getElementById('avatarUser');

const contactBtn = document.getElementById('contactBtn');
const backBtn = document.getElementById('backBtn');

backBtn.onclick = () => history.back();

async function loadUser() {
    const res = await fetch(`http://localhost:3000/api/profile/${userId}`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    const u = await res.json();
    usernameEl.textContent = u.username;
    emailEl.textContent = u.email;
    descEl.textContent = u.description;
    if (u.avatar) avatar.style.backgroundImage = `url(${u.avatar})`;
}

contactBtn.onclick = () => {
    alert(`Связаться с пользователем:\nEmail: ${emailEl.textContent}`);
};

loadUser();
