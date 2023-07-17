//Importa os elementos do html
const botao = document.getElementById("calcular");
const dia_saida = document.getElementById("day-output");
const dia_aviso = document.getElementById("day-atention");
const mes_saida = document.getElementById("month-output");
const mes_aviso = document.getElementById("month-atention");
const ano_saida = document.getElementById("year-output");
const ano_aviso = document.getElementById("year-atention");
const aviso_geral = document.getElementById("aviso-geral");
const label_day = document.getElementById("label-day");
const label_month = document.getElementById("label-month");
const label_year = document.getElementById("label-year");

//Aplica a cor vermelha quando algum dado é inserido incorretamente
function mudaCor(id, idLabel) {
  document.getElementById(id).style.borderColor = "hsl(0, 100%, 67%)";
  document.getElementById(idLabel).style.color = "hsl(0, 100%, 67%)";
}

//Volta a cor inicial
function resetaCor(id, idLabel) {
  document.getElementById(id).style.borderColor = "hsl(0, 1%, 44%)";
  document.getElementById(idLabel).style.color = "hsl(0, 1%, 44%)";
}

function resetaSaida() {
  dia_saida.textContent = "--";
  mes_saida.textContent = "--";
  ano_saida.textContent = "--";
}

function msgAviso(nome, mensagem) {
  nome.textContent = mensagem;
}

function calcularIdade() {
  const dia_entrada = document.getElementById("day").value;
  const mes_entrada = document.getElementById("month").value;
  const ano_entrada = document.getElementById("year").value;

  //Verifica se os campos foram preenchidos
  if (
    ano_entrada === "" ||
    ano_entrada == 0 ||
    mes_entrada === "" ||
    mes_entrada == 0 ||
    dia_entrada === "" ||
    dia_entrada == 0
  ) {
    aviso_geral.textContent = "Por favor, adicione uma data completa";
    resetaSaida();
    return;
  }

  //Coleta os dados dos imputs e guarda numa função de Data
  const data_entrada = `${ano_entrada}-${mes_entrada}-${dia_entrada}`;
  const data_nascimento = new Date(data_entrada);
  const dia = data_nascimento.getDate() + 1;
  const mes = data_nascimento.getMonth() + 1;
  const ano = data_nascimento.getFullYear();

  //Coleta a data atual e guarda em variáveis
  const data_atual = new Date();
  const dia_atual = data_atual.getDate();
  const mes_atual = data_atual.getMonth() + 1;
  const ano_atual = data_atual.getFullYear();

  if (ano_entrada > ano_atual) {
    mudaCor("year", "label-year");
    msgAviso(ano_aviso, "Ano inválido");
    resetaSaida();
    return;
  } else {
    resetaCor("year", "label-year");
    msgAviso(ano_aviso, "");
  }

  if (mes_entrada > 12 || (mes > mes_atual && ano_entrada == ano_atual)) {
    mudaCor("month", "label-month");
    msgAviso(mes_aviso, "Mês inválido");
    resetaSaida();
    return;
  } else {
    resetaCor("month", "label-month");
    msgAviso(mes_aviso, "");
  }

  if (!(Number.isInteger(dia) && dia >= 1 && dia <= 31)) {
    mudaCor("day", "label-day");
    msgAviso(dia_aviso, "Dia inválido");
    resetaSaida();
    return;
  } else {
    resetaCor("day", "label-day");
    msgAviso(dia_aviso, "");
  }

  let ano_idade = ano_atual - ano;
  let mes_idade = mes_atual - mes;
  let dia_idade = dia_atual - dia;

  if (mes > mes_atual || (mes === mes_atual && dia > dia_atual)) {
    mes_idade += 12;
    ano_idade--;
  }

  if (dia_atual < dia) {
    mes_idade--;
    dia_idade += 31;
  }

  dia_saida.textContent = dia_idade;
  mes_saida.textContent = mes_idade;
  ano_saida.textContent = ano_idade;
}

botao.addEventListener("click", calcularIdade);

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
  // muda o atributo de data-theme do body
  document.body.dataset.theme = checkbox.checked ? 'dark' : null;
});