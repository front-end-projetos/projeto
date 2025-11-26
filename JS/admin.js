const form = document.getElementById('userForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');
const clearBtn = document.getElementById('clearForm');
const deleteAllBtn = document.getElementById('deleteAll');
const searchInput = document.getElementById('search');

let users = JSON.parse(localStorage.getItem('usuarios')) || [];

function renderList(list) {
    userList.innerHTML = '';
    list.forEach((user, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${user.data} — ${user.nome} — ${user.email}</span>
                        <button class="delete-btn" data-index="${index}">Excluir</button>`;
        userList.appendChild(li);
    });
}

function saveUsers() {
    localStorage.setItem('usuarios', JSON.stringify(users));
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    if(nome && email){
        users.push({ nome, email, data: new Date().toLocaleString() });
        saveUsers();
        renderList(users);
        form.reset();
    }
});

clearBtn.addEventListener('click', () => form.reset());

userList.addEventListener('click', e => {
    if(e.target.classList.contains('delete-btn')){
        users.splice(e.target.dataset.index, 1);
        saveUsers();
        renderList(users);
    }
});

deleteAllBtn.addEventListener('click', () => {
    users = [];
    saveUsers();
    renderList(users);
});

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    renderList(users.filter(u => u.nome.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)));
});

renderList(users);
