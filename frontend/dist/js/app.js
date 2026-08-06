// ==========================================================================
// Configuração
// ==========================================================================
const BASE_URL = 'http://localhost:8080/produtos';

// ==========================================================================
// Referências de DOM (centralizadas)
// ==========================================================================
const els = {
  id: document.getElementById('id'),
  nome: document.getElementById('nome'),
  preco: document.getElementById('preco'),
  quantidade: document.getElementById('quantidade'),
  status: document.getElementById('status'),
  lista: document.getElementById('lista-produtos'),
  total: document.getElementById('total-produtos'),
  emptyState: document.getElementById('empty-state'),
  feedback: document.getElementById('feedback'),
  formMode: document.getElementById('form-mode'),
  connDot: document.getElementById('conn-dot'),
  connText: document.getElementById('conn-text'),
};

// ==========================================================================
// Helpers de UI
// ==========================================================================
function mostrarFeedback(mensagem, tipo = 'info') {
  els.feedback.textContent = mensagem;
  els.feedback.className = `feedback ${tipo}`;
}

function setConexao(online) {
  els.connDot.classList.toggle('online', online);
  els.connDot.classList.toggle('offline', !online);
  els.connText.textContent = online ? 'API conectada' : 'API indisponível';
}

function getProdutoFromForm() {
  return {
    nome: els.nome.value.trim(),
    preco: parseFloat(els.preco.value.replace(',', '.')) || 0,
    quantidade: parseInt(els.quantidade.value, 10) || 0,
    status: els.status.value,
  };
}

function validarFormulario({ nome, preco, quantidade }) {
  if (!nome) return 'Informe o nome do produto.';
  if (preco < 0) return 'Preço não pode ser negativo.';
  if (quantidade < 0) return 'Quantidade não pode ser negativa.';
  return null;
}

function limparCampos() {
  els.id.value = '';
  els.nome.value = '';
  els.preco.value = '';
  els.quantidade.value = '';
  els.status.value = '';
  els.formMode.textContent = 'novo registro';
  mostrarFeedback('');
}

// ==========================================================================
// Renderização da lista
// ==========================================================================
function renderLista(produtos) {
  els.lista.innerHTML = '';

  const vazio = !produtos || produtos.length === 0;
  els.emptyState.hidden = !vazio;
  els.lista.hidden = vazio;

  els.total.textContent = `${produtos.length} ${produtos.length === 1 ? 'item' : 'itens'}`;

  produtos.forEach((produto) => {
    const row = document.createElement('li');
    row.className = 'product-row';
    row.dataset.status = produto.status || '';

    row.innerHTML = `
      <span class="product-row__id">#${produto.id}</span>
      <div class="product-row__main">
        <strong>${escapeHtml(produto.nome)}</strong>
        <div class="product-row__meta">R$ ${Number(produto.preco).toFixed(2)} · qtd. ${produto.quantidade}</div>
      </div>
      <span class="status-pill" data-status="${produto.status || ''}">${produto.status || 'sem status'}</span>
      <button type="button" class="product-row__use" data-id="${produto.id}">Editar</button>
    `;

    els.lista.appendChild(row);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

// ==========================================================================
// Chamadas à API
// ==========================================================================
async function listarTodos() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Falha ao listar produtos.');
    const produtos = await response.json();
    setConexao(true);
    renderLista(produtos);
  } catch (erro) {
    setConexao(false);
    mostrarFeedback('Não foi possível carregar a lista. Verifique se a API está rodando.', 'error');
  }
}

async function salvar() {
  const produto = getProdutoFromForm();
  const erro = validarFormulario(produto);
  if (erro) return mostrarFeedback(erro, 'error');

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    });
    if (!response.ok) throw new Error();

    mostrarFeedback('Produto salvo com sucesso.', 'success');
    await listarTodos();
    limparCampos();
  } catch {
    mostrarFeedback('Erro ao salvar o produto.', 'error');
  }
}

async function atualizar() {
  const id = els.id.value.trim();
  if (!id) return mostrarFeedback('Informe o ID do produto a atualizar.', 'error');

  const produto = getProdutoFromForm();
  const erro = validarFormulario(produto);
  if (erro) return mostrarFeedback(erro, 'error');

  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    });
    if (!response.ok) throw new Error();

    mostrarFeedback('Produto atualizado com sucesso.', 'success');
    await listarTodos();
  } catch {
    mostrarFeedback('Erro ao atualizar o produto.', 'error');
  }
}

async function deletar() {
  const id = els.id.value.trim();
  if (!id) return mostrarFeedback('Informe o ID do produto a excluir.', 'error');
  if (!confirm(`Excluir o produto #${id}? Essa ação não pode ser desfeita.`)) return;

  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error();

    mostrarFeedback('Produto excluído.', 'success');
    await listarTodos();
    limparCampos();
  } catch {
    mostrarFeedback('Erro ao excluir o produto.', 'error');
  }
}

async function consultar() {
  const id = els.id.value.trim();
  if (!id) return mostrarFeedback('Informe o ID do produto a consultar.', 'error');

  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error();
    const produto = await response.json();

    els.nome.value = produto.nome ?? '';
    els.preco.value = produto.preco ?? '';
    els.quantidade.value = produto.quantidade ?? '';
    els.status.value = produto.status ?? '';
    els.formMode.textContent = `editando #${id}`;
    mostrarFeedback('Produto carregado no formulário.', 'success');
  } catch {
    mostrarFeedback('Produto não encontrado.', 'error');
  }
}

// ==========================================================================
// Eventos
// ==========================================================================
document.querySelectorAll('[data-action]').forEach((btn) => {
  const acoes = { salvar, atualizar, deletar, consultar, limpar: limparCampos };
  btn.addEventListener('click', () => acoes[btn.dataset.action]?.());
});

els.lista.addEventListener('click', (evt) => {
  const btn = evt.target.closest('.product-row__use');
  if (!btn) return;
  els.id.value = btn.dataset.id;
  consultar();
});

document.addEventListener('DOMContentLoaded', listarTodos);