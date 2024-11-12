// Create a single supabase client for interacting with your database
const supabase = createClient('https://qjxdlwzugeurfkdrzaov.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqeGRsd3p1Z2V1cmZrZHJ6YW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4OTY4NTAsImV4cCI6MjA0NjQ3Mjg1MH0.heeFBtzQwHSGHU88HMkeZftDG5IlltTFUBqq-DadTec')
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Agora, o supabase está configurado e disponível para uso no seu script.js

let isAdmin = false;
const letrasContainer = document.getElementById('letrasContainer');
const musicNotes = document.getElementById('musicNotes');

function showNotification(message) {
    alert(message);
}

function atualizarBotoesDelete() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.style.display = isAdmin ? 'block' : 'none';
    });
}

async function enviarLetra(nome, titulo, letra) {
    const { error } = await supabase
        .from('letras')
        .insert([{ nome, titulo, letra }]);

    if (error) {
        alert('Erro ao enviar letra: ' + error.message);
    } else {
        alert('Letra enviada com sucesso!');
        await exibirLetras();
    }
}

// Declare fora de outras funções para garantir que esteja no escopo global
async function exibirLetras() {
    const { data: letras, error } = await supabase.from('letras').select('*');

    if (error) {
        console.error('Erro ao carregar letras:', error.message);
        alert('Erro ao carregar letras');
    } else {
        letrasContainer.innerHTML = '';
        letras.forEach(letra => {
            const letraDiv = document.createElement('div');
            letraDiv.className = 'letra-salva';
            letraDiv.innerHTML = `
                <div class="letra-titulo">${letra.titulo}</div>
                <div class="letra-autor">por ${letra.nome}</div>
                <div class="letra-conteudo">${letra.letra}</div>
            `;

            // Adiciona o botão "Editar" se o usuário for o criador (ou com base no critério desejado)
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editarLetra(letra));
            letraDiv.appendChild(editBtn);

            // Adiciona o botão "Excluir" se o usuário for administrador
            if (isAdmin) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.textContent = 'Excluir';
                deleteBtn.addEventListener('click', () => deletarLetra(letra.id));
                letraDiv.appendChild(deleteBtn);
            }

            letrasContainer.appendChild(letraDiv);
        });
        atualizarBotoesDelete();
    }
}

function editarLetra(letra) {
    // Exibe prompts para o usuário editar os dados da letra
    const novoTitulo = prompt("Edite o título:", letra.titulo);
    const novaLetra = prompt("Edite a letra:", letra.letra);

    // Verifica se o usuário inseriu novos valores
    if (novoTitulo && novaLetra) {
        atualizarLetra(letra.id, novoTitulo, novaLetra);
    }
}

async function atualizarLetra(id, titulo, letra) {
    const { error } = await supabase
        .from('letras')
        .update({ titulo, letra })
        .eq('id', id);

    if (error) {
        alert('Erro ao atualizar letra: ' + error.message);
    } else {
        alert('Letra atualizada com sucesso!');
        await exibirLetras(); // Atualiza a lista de letras após a edição
    }
}


async function deletarLetra(id) {
    if (!isAdmin) return;

    if (confirm('Tem certeza que deseja excluir esta letra?')) {
        const { error } = await supabase
            .from('letras')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Erro ao excluir letra: ' + error.message);
        } else {
            alert('Letra excluída com sucesso!');
            await exibirLetras();
        }
    }
}

function createNote() {
    const notes = ['♪', '♫', '♬', '♩'];
    const note = document.createElement('span');
    note.className = 'note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * 100 + 'vw';
    note.style.animationDuration = (15 + Math.random() * 10) + 's';
    note.style.transform = `rotate(${Math.random() * 360}deg)`;
    musicNotes.appendChild(note);

    note.addEventListener('animationend', () => {
        note.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    setInterval(createNote, 1500);
    for (let i = 0; i < 10; i++) {
        setTimeout(createNote, i * 200);
    }

    loginButton.addEventListener('click', function() {
        const username = prompt('Nome de Usuário:');
        const password = prompt('Senha:');

        if (username === 'equipe8' && password === 'admin') {
            isAdmin = true;
            showNotification('Login realizado com sucesso!');
            logoutButton.style.display = 'block';
            loginButton.style.display = 'none';
            exibirLetras();
        } else {
            showNotification('Credenciais inválidas!');
        }
    });

    logoutButton.addEventListener('click', function() {
        isAdmin = false;
        showNotification('Você saiu com sucesso.');
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        exibirLetras();
    });

    document.getElementById('letraForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const titulo = document.getElementById('titulo').value;
        const letra = document.getElementById('letra').value;

        enviarLetra(nome, titulo, letra);
        this.reset();
    });

    exibirLetras();
});
