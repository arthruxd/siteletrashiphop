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
