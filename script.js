// Script para funcionalidade da página inicial do Projeto Letras de Hip Hop

document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirectButton');

    // Adiciona evento de clique para redirecionar para a página de letras
    redirectButton.addEventListener('click', () => {
        window.location.href = 'letras/letrashiphop.html';
    });

    // Efeito de suavização ao carregar a página
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s';
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});
