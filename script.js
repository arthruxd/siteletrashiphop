document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirectButton');

    // Adicionando o evento de clique ao botão
    redirectButton.addEventListener('click', () => {
        window.location.href = 'letras/letrashiphop.html'; // Substitua pela URL real
    });

    function createParticles() {
        const container = document.createElement('div');
        container.classList.add('background-particles');
        document.body.appendChild(container);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
            
            container.appendChild(particle);
        }
    }
    createParticles();
});
function createNotes() {
    const container = document.querySelector('.background-notes');

    const notes = ['♪', '♫', '♬', '♩']; // Notas musicais
    for (let i = 0; i < 30; i++) { // Número de notas a serem criadas
        const note = document.createElement('div');
        note.classList.add('note');
        note.innerText = notes[Math.floor(Math.random() * notes.length)];

        // Posiciona a nota em um lugar aleatório na tela
        note.style.left = `${Math.random() * 100}vw`;
        note.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duração aleatória da animação

        container.appendChild(note);
    }
}

// Chama a função para criar as notas
createNotes();
// Linha do tempo, foda
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.timeline-content').classList.add('active');
            } else {
                entry.target.querySelector('.timeline-content').classList.remove('active');
            }
        });
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
