// Carregar nome do usuário
function carregarNomeUsuario() {
  const nome = localStorage.getItem('nomeUsuario');
  if (nome) {
    document.getElementById('nome-exibido').textContent = nome;
  } else {
    window.location.href = "index.html";
  }
}

// Salvar renda mensal
function salvarRenda() {
  const valor = document.getElementById('renda-mensal').value;
  if (valor) {
    localStorage.setItem('rendaMensal', valor);
    alert(`Renda mensal salva: R$ ${parseFloat(valor).toFixed(2)}`);
  } else {
    alert("Digite um valor para sua renda mensal.");
  }
}

// Categorias padrão
const categoriasPadrao = [
  { nome: "Água", emoji: "💧" },
  { nome: "Luz", emoji: "💡" },
  { nome: "Mercado", emoji: "🛒" },
  { nome: "Gasolina", emoji: "⛽" },
  { nome: "Transporte", emoji: "🚌" },
  { nome: "Lazer", emoji: "🎮" },
  { nome: "Faculdade", emoji: "📚" },
  { nome: "Internet", emoji: "🌐" }
];

function carregarCartoesIniciais() {
  const container = document.getElementById('container-despesas');
  container.innerHTML = '';

  categoriasPadrao.forEach(cat => {
    criarCartaoDespesa(cat.nome, cat.emoji);
  });
}

function criarCartaoDespesa(nome, emoji) {
  const container = document.getElementById('container-despesas');
  
  const cartao = document.createElement('div');
  cartao.className = 'cartao-despesa';
  cartao.innerHTML = `
    <div style="font-size: 2.5rem;">${emoji}</div>
    <h4>${nome}</h4>
    <input type="number" placeholder="0,00" step="0.01" class="valor-despesa">
    <small style="color: #666;">mensal</small>
  `;
  container.appendChild(cartao);
}

function adicionarCartao() {
  const nome = prompt("Nome da nova despesa:");
  if (nome && nome.trim() !== "") {
    criarCartaoDespesa(nome.trim(), "📌");
  }
}

function sair() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Inicializar página
window.onload = function() {
  carregarNomeUsuario();
  carregarCartoesIniciais();
};