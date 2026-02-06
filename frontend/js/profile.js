const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const descEl = document.getElementById('description');
const avatar = document.getElementById('avatar');
const avatarInput = document.getElementById('avatarInput');
const bgInput = document.getElementById('bgInput');
const header = document.getElementById('header');

async function api(method, body) {
    const res = await fetch('http://localhost:3000/api/profile', {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        body: body ? JSON.stringify(body) : null
    });
    return res.json();
}

async function load() {
    const user = await fetch('http://localhost:3000/api/profile/me', {
        headers: { Authorization: 'Bearer ' + token }
    }).then(r => r.json());

    usernameEl.textContent = user.username || '';
    emailEl.textContent = user.email;
    descEl.textContent = user.description || '';

    if (user.avatar) avatar.style.backgroundImage = `url(${user.avatar})`;
    if (user.background) header.style.backgroundImage = `url(${user.background})`;

    if (user.theme === 'dark') document.body.classList.add('dark');
}

function save(data) {
    api('PUT', data);
}

usernameEl.onblur = () => save({ username: usernameEl.textContent.trim() });
descEl.onblur = () => save({ description: descEl.textContent.trim() });

avatar.onclick = () => avatarInput.click();
avatarInput.onchange = () => upload(avatarInput, 'avatar', avatar);

document.getElementById('changeBg').onclick = () => bgInput.click();
bgInput.onchange = () => upload(bgInput, 'background', header);

function upload(input, field, target) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        target.style.backgroundImage = `url(${reader.result})`;
        save({ [field]: reader.result });
    };
    reader.readAsDataURL(file);
}

document.getElementById('toggleTheme').onclick = () => {
    document.body.classList.toggle('dark');
    save({ theme: document.body.classList.contains('dark') ? 'dark' : 'light' });
};

document.getElementById('logout').onclick = () => {
    localStorage.removeItem('token');
    location.href = 'index.html';
};

load();
