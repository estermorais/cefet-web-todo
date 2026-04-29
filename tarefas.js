const tarefas = [
  { nome: 'Comprar leite', categoria: 'compras', realizada: false },
  { nome: 'Escutar chimbinha', categoria: 'lazer', realizada: true }
]

const listaTarefasEl = document.querySelector('#lista-tarefas')
const novaTarefaNomeEl = document.querySelector('#nova-tarefa-nome')
const novaTarefaCategoriaEl = document.querySelector('#nova-tarefa-categoria')
const incluirNovaTarefaEl = document.querySelector('#incluir-nova-tarefa')
const filtroDeCategoriaEl = document.querySelector('#filtro-de-categoria')

function insereTarefaNaPagina(tarefa) {
  const itemEl = document.createElement('li')
  itemEl.classList.add('item-tarefa')
  itemEl.classList.add(`categoria-${tarefa.categoria}`)
  if (tarefa.realizada) {
    itemEl.classList.add('marcado')
  }
  itemEl.textContent = tarefa.nome

  const filtroAtual = filtroDeCategoriaEl.value
  if (filtroAtual !== '' && filtroAtual !== tarefa.categoria) {
    itemEl.classList.add('retido-no-filtro')
  }

  itemEl.addEventListener('click', () => {
    tarefa.realizada = !tarefa.realizada
    itemEl.classList.toggle('marcado')
  })

  listaTarefasEl.appendChild(itemEl)
}

function carregaTarefasExistentes() {
  listaTarefasEl.innerHTML = ''
  for (const tarefa of tarefas) {
    insereTarefaNaPagina(tarefa)
  }
}

function incluiNovaTarefa() {
  const nome = novaTarefaNomeEl.value.trim()
  if (nome === '') {
    return
  }

  const novaTarefa = {
    nome,
    categoria: novaTarefaCategoriaEl.value,
    realizada: false
  }
  tarefas.push(novaTarefa)
  insereTarefaNaPagina(novaTarefa)

  novaTarefaNomeEl.value = ''
  novaTarefaNomeEl.focus()
}

function aplicaFiltroDeCategoria() {
  const categoriaSelecionada = filtroDeCategoriaEl.value
  const itensEl = listaTarefasEl.querySelectorAll('.item-tarefa')

  itensEl.forEach((itemEl, indice) => {
    const tarefa = tarefas[indice]
    const retido = categoriaSelecionada !== '' && tarefa.categoria !== categoriaSelecionada
    itemEl.classList.toggle('retido-no-filtro', retido)
  })
}

incluirNovaTarefaEl.addEventListener('click', incluiNovaTarefa)

novaTarefaNomeEl.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    incluiNovaTarefa()
  }
})

filtroDeCategoriaEl.addEventListener('change', aplicaFiltroDeCategoria)

carregaTarefasExistentes()
