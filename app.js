const state = { service: 'Guincho', step: 1 };
const prices = { 'Guincho': 'R$ 189,90', 'Troca de pneu': 'R$ 79,90', 'Bateria': 'R$ 119,90', 'Pane seca': 'R$ 99,90' };
const allowedViews = new Set(['inicio', 'pedir', 'historico', 'indicadores', 'conta']);
const views = [...document.querySelectorAll('.page-view')];
const toast = document.querySelector('.toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function navigate(viewName) {
  if (!allowedViews.has(viewName)) return;
  views.forEach(view => view.classList.toggle('active', view.id === `view-${viewName}`));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === viewName));
  if (viewName !== 'pedir') {
    state.step = 1;
    document.querySelectorAll('.form-step').forEach(step => step.classList.toggle('active', step.dataset.step === '1'));
    document.querySelectorAll('.step').forEach((step, index) => step.classList.toggle('active', index === 0));
  }
  switch (viewName) {
    case 'inicio': window.location.hash = 'inicio'; break;
    case 'pedir': window.location.hash = 'pedir'; break;
    case 'historico': window.location.hash = 'historico'; break;
    case 'indicadores': window.location.hash = 'indicadores'; break;
    case 'conta': window.location.hash = 'conta'; break;
    default: break;
  }
  document.querySelector('.sidebar')?.classList.remove('open');
}

function updateEstimate() {
  document.querySelectorAll('.summary-service').forEach(el => { el.textContent = state.service; });
  document.querySelectorAll('.summary-price, .estimate-price').forEach(el => { el.textContent = prices[state.service]; });
}

document.querySelectorAll('[data-view], [data-view-target]').forEach(element => {
  element.addEventListener('click', event => {
    event.preventDefault();
    navigate(element.dataset.view || element.dataset.viewTarget);
  });
});

document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    state.service = card.dataset.service;
    document.querySelectorAll('.form-step .selectable').forEach(item => item.classList.toggle('selected', item.dataset.service === state.service));
    updateEstimate();
    if (!card.closest('.form-step')) navigate('pedir');
  });
});

function setStep(step) {
  state.step = step;
  document.querySelectorAll('.form-step').forEach(item => item.classList.toggle('active', item.dataset.step === String(step)));
  document.querySelectorAll('.step').forEach((item, index) => item.classList.toggle('active', index < step));
}

document.querySelectorAll('.next-step').forEach(button => button.addEventListener('click', () => setStep(Math.min(3, state.step + 1))));
document.querySelectorAll('.prev-step').forEach(button => button.addEventListener('click', () => setStep(Math.max(1, state.step - 1))));

document.querySelector('#locate')?.addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#origin').value = 'Localização encontrada — Av. Paulista, 1000';
  showToast('Localização atualizada com sucesso.');
});

document.querySelector('.confirm-request')?.addEventListener('click', () => {
  document.querySelector('#tracking-modal').classList.add('show');
  updateEstimate();
});
document.querySelectorAll('.modal-close, .modal-ok').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#tracking-modal').classList.remove('show');
  if (button.classList.contains('modal-ok')) {
    navigate('inicio');
    showToast('Chamado ativo. Avisaremos quando o prestador aceitar.');
  }
}));
document.querySelector('.mobile-menu')?.addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));

const initialView = window.location.hash.replace('#', '');
if (allowedViews.has(initialView)) navigate(initialView);
updateEstimate();
