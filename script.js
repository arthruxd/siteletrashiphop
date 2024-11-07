import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjxdlwzugeurfkdrzaov.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqeGRsd3p1Z2V1cmZrZHJ6YW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4OTY4NTAsImV4cCI6MjA0NjQ3Mjg1MH0.heeFBtzQwHSGHU88HMkeZftDG5IlltTFUBqq-DadTec';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

document.addEventListener('DOMContentLoaded', function() {
    let isAdmin = false;
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const musicNotes = document.getElementById('musicNotes');
    const letrasContainer = document.getElementById('letrasContainer');

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

    setInterval(createNote, 1500);

    for(let i = 0; i < 10; i++) {
        setTimeout(createNote, i * 200);
    }

    function showNotification(message) {
        alert(message);
    }

    function atualizarBotoesDelete() {
        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            btn.style.display = isAdmin ? 'block' : 'none';
        });
    }

    loginButton.addEventListener('click', function() {
        const username = prompt('Nome de Usuário:');
        const password = prompt('Senha:');

        if (username === 'equipe8' && password === 'admin') {
            isAdmin = true;
            showNotification('Login realizado com sucesso!');
            logoutButton.style.display = 'block';
            loginButton.style.display = 'none';
            atualizarBotoesDelete();
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
        atualizarBotoesDelete();
        exibirLetras();
    });

    async function enviarLetra(nome, titulo, letra) {
        const { data, error } = await supabase
            .from('letras')
            .insert([{ nome, titulo, letra }]);

        if (error) {
            alert('Erro ao enviar letra: ' + error.message);
        } else {
            alert('Letra enviada com sucesso!');
            exibirLetras();
        }
    }

    async function exibirLetras() {
    const { data: letras, error } = await supabase
        .from('letras')
        .select('*');

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
                ${isAdmin ? `<button class="delete-btn" onclick="deletarLetra('${letra.id}')">Excluir</button>` : ''}
            `;
            letrasContainer.appendChild(letraDiv);
        });
        atualizarBotoesDelete();
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
                exibirLetras();
            }
        }
    }

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
