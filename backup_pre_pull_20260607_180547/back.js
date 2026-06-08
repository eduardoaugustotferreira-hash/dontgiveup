let despesas = [];

// Lista de cards pré-definidos
const categoriasPreDefinidas = [
  { nome: "Água", emoji: "💧" },
  { nome: "Luz", emoji: "💡" },
  { nome: "Internet", emoji: "🌐" },
  { nome: "Mercado", emoji: "🛒" },
  { nome: "Aluguel", emoji: "🏠" },
  { nome: "Gás", emoji: "🔥" },
  { nome: "Transporte", emoji: "🚌" },
  { nome: "Gasolina", emoji: "⛽" },
  { nome: "Faculdade", emoji: "📚" },
  { nome: "Reserva", emoji: "🛡️" },
  { nome: "Lazer", emoji: "🎮" }
];

// ==================== CARREGAR NOME ====================
function carregarNomeUsuario() {
  const nome = localStorage.getItem('nomeUsuario');
  if (nome) document.getElementById('nome-exibido').textContent = nome;
  else window.location.href = "login.html";
}

// ==================== SALVAR RENDA ====================
function salvarRenda() {
  const valorInput = document.getElementById('renda-mensal').value;
  if (!valorInput) return alert("Digite o valor da sua renda mensal.");

  const renda = parseFloat(valorInput);
  localStorage.setItem('rendaMensal', renda);

  document.getElementById('secao-resumo').style.display = 'block';
  
  criarTodosCardsPreDefinidos(renda);
  calcularResumoFinanceiro(renda);

  alert(`✅ Renda salva: R$ ${renda.toFixed(2)}`);
}

// ==================== CRIAR TODOS OS CARDS AUTOMATICAMENTE ====================
function criarTodosCardsPreDefinidos(renda) {
  const container = document.getElementById('container-despesas');
  container.innerHTML = '';   // Limpa para recriar
  despesas = [];              // Reseta array

  const qtdPersonalizadas = 0; // Por enquanto só pré-definidos
  let reservaPercent = 15;

  const valorNecessidades = renda * 0.60;
  const valorPorNecessidade = (valorNecessidades / 9).toFixed(2); // 9 categorias de necessidade

  const valorReserva = (renda * (reservaPercent / 100)).toFixed(2);
  const valorLazer   = (renda * 0.05).toFixed(2);

  categoriasPreDefinidas.forEach(cat => {
    let valorSugerido = "";

    if (cat.nome === "Reserva") {
      valorSugerido = valorReserva;
    } else if (cat.nome === "Lazer") {
      valorSugerido = valorLazer;
    } else {
      valorSugerido = valorPorNecessidade;   // As demais ficam dentro dos 60%
    }

    criarCartaoDespesa(cat.nome, cat.emoji, valorSugerido, cat.nome === "Lazer");
  });
}

// ==================== CRIAR CARTÃO ====================
function criarCartaoDespesa(nome, emoji, valor = "", personalizado = false) {
  const container = document.getElementById('container-despesas');

  const cartao = document.createElement('div');
  cartao.className = 'cartao-despesa';
  cartao.innerHTML = `
    <div class="emoji">${emoji}</div>
    <h4>${nome}</h4>
    <input type="number" value="${valor}" placeholder="0,00" step="0.01" class="valor-despesa">
    <small style="color: #666;">mensal ${personalizado ? '(Lazer)' : ''}</small>
  `;

  despesas.push({ nome, personalizado });
  container.appendChild(cartao);
}

// ==================== CÁLCULO DO RESUMO ====================
function calcularResumoFinanceiro(renda) {
  const qtdPersonalizadas = despesas.filter(d => d.personalizado).length;
  let reservaPercent = Math.max(5, 15 - (qtdPersonalizadas * 3));

  const calculos = {
    necessidades: (renda * 0.60).toFixed(2),
    reserva: (renda * (reservaPercent / 100)).toFixed(2),
    investimentos: (renda * 0.10).toFixed(2),
    objetivos: (renda * 0.10).toFixed(2),
    lazer: (renda * 0.05).toFixed(2)
  };

  document.getElementById('resumo-conteudo').innerHTML = `
    <div class="resumo-grid">
      <div class="resumo-item"><h4>Necessidades (60%)</h4><div class="valor">R$ ${calculos.necessidades}</div></div>
      <div class="resumo-item"><h4>Reserva (${reservaPercent}%)</h4><div class="valor">R$ ${calculos.reserva}</div></div>
      <div class="resumo-item"><h4>Investimentos (10%)</h4><div class="valor">R$ ${calculos.investimentos}</div></div>
      <div class="resumo-item"><h4>Objetivos (10%)</h4><div class="valor">R$ ${calculos.objetivos}</div></div>
      <div class="resumo-item"><h4>Lazer (5%)</h4><div class="valor">R$ ${calculos.lazer}</div></div>
    </div>
    <p style="text-align:center; margin-top:15px; color:#666;">Total: <strong>R$ ${renda.toFixed(2)}</strong></p>
  `;
}

function adicionarDespesaPersonalizada() {
  const nome = prompt("Nome da despesa personalizada:");
  if (nome && nome.trim()) {
    criarCartaoDespesa(nome.trim(), "📌", "", true);
    // Atualiza resumo
    const rendaSalva = localStorage.getItem('rendaMensal');
    if (rendaSalva) calcularResumoFinanceiro(parseFloat(rendaSalva));
  }
}

function sair() {
  localStorage.clear();
  window.location.href = "login.html";
}

// ==================== INICIALIZAR ====================
window.onload = function() {
  carregarNomeUsuario();
  const rendaSalva = localStorage.getItem('rendaMensal');
  if (rendaSalva) {
    document.getElementById('renda-mensal').value = rendaSalva;
    document.getElementById('secao-resumo').style.display = 'block';
    criarTodosCardsPreDefinidos(parseFloat(rendaSalva));
    calcularResumoFinanceiro(parseFloat(rendaSalva));
  }
};