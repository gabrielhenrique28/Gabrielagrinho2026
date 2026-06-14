document.addEventListener("DOMContentLoaded", function () {
    
    // Pega todas as seções que começam escondidas no CSS
    const estacoes = document.querySelectorAll('.esconder');
    
    // Configura o efeito para ativar quando 15% da seção aparecer na tela
    const configuracao = {
        root: null, 
        threshold: 0.15 
    };

    // Cria o observador que faz o efeito do scroll acontecer
    const observador = new IntersectionObserver(function (entradas, observador) {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('mostrar'); // Mostra o conteúdo com fade-in
                observador.unobserve(entrada.target); // Desliga o observador para rodar só uma vez
            }
        });
    }, configuracao);

    // Aplica o monitoramento em cada uma das seções
    estacoes.forEach(estacao => {
        observador.observe(estacao);
    });
});

// Abre e fecha o menu lateral de acessibilidade
function toggleMenuAcessibilidade() {
    const menu = document.getElementById("menu-acessibilidade");
    const botao = document.querySelector(".btn-menu-acessibilidade");
    
    menu.classList.toggle("ativo"); // Ativa/desativa a caixinha
    botao.classList.toggle("aberto"); // Transforma as 3 linhas em um 'X'
}

// 1. Função para trocar as cores (Modo Escuro / Claro)
function alternarTema() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Guarda a escolha do usuário para não perder ao atualizar a página
    if(body.classList.contains('dark-mode')) {
        localStorage.setItem('tema', 'dark');
    } else {
        localStorage.setItem('tema', 'light');
    }
}

// Carrega o tema salvo se o usuário já visitou o site antes
if(localStorage.getItem('tema') === 'dark') {
    document.body.classList.add('dark-mode');
}

// 2. Aumentar e diminuir a letra do site
let tamanhoFonteAtual = 100; 

function mudarFonte(direcao) {
    // Controla o limite para não quebrar o layout do site (entre 80% e 140%)
    if (direcao === 1 && tamanhoFonteAtual < 140) {
        tamanhoFonteAtual += 10;
    } else if (direcao === -1 && tamanhoFonteAtual > 80) {
        tamanhoFonteAtual -= 10;
    }
    document.documentElement.style.fontSize = tamanhoFonteAtual + '%';
}