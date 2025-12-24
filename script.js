
const dadosAgendamento = [];
const form = document.getElementById('agendamento-form');

const agendarBtn = document.getElementById('agendar-btn');
const mensagemConfirmacao = document.getElementById('confirmação-mensagem');
const listaAgendamentos = document.getElementById('agendamentos-lista');
agendarBtn.addEventListener('click', function () {
    try {
        const nome = document.getElementById('nome').value;
        const consulta = document.getElementById('consulta').value;
        const data = document.getElementById('dataConsulta').value;
        const hora = document.getElementById('horaConsulta').value;
        const telefone = document.getElementById('telefone').value;
        const medico = document.getElementById('medico').value;
        const convenio = document.getElementById('convenio').value;
        const validacoes = {
            nome: function (valor) {
                return valor.trim().length > 0;
            },
            consulta: function (valor) {
                return valor.trim().length > 0;
            },
            data: function (valor) {
                return valor.trim().length > 0;
            },
            hora: function (valor) {
                return valor.trim().length > 0;
            },
            telefone: function (valor) {
                return valor.trim().length > 0;
            },
            medico: function (valor) {
                return valor.trim().length > 0;
            },
            convenio: function (valor) {
                return valor.trim().length > 0;
            }
        };
        if (validacoes.nome(nome) && validacoes.consulta(consulta) && validacoes.data(data) && validacoes.hora(hora) && validacoes.telefone(telefone) && validacoes.medico(medico) && validacoes.convenio(convenio)) {
            if (convenio === "select") {
                mensagemConfirmacao.textContent = 'Por favor, selecione um convênio válido.';
                return;
            }
            if (telefone.startsWith("0")) {
                mensagemConfirmacao.textContent =
                "O número de telefone não pode começar com zero.";
                return;
            }
            if (!/^\d{10,11}$/.test(telefone)) {
                mensagemConfirmacao.textContent = 'Por favor, insira um número de telefone válido (10 ou 11 dígitos).';
                return;
            }
            if (new Date(data + ' ' + hora) < new Date()) {
                mensagemConfirmacao.textContent = 'A data e hora da consulta devem ser futuras.';
                return;
            }
            if (data === "" || hora === "") {
                mensagemConfirmacao.textContent = 'Por favor, insira uma data e hora válidas.';
                return;
            }
            if (data < '2024-01-01' || data > '2025-12-31') {
                mensagemConfirmacao.textContent = 'A data da consulta deve estar entre 01/01/2024 e 31/12/2025.';
                return;
            }
            if (hora < '08:00' || hora > '18:00') {
                mensagemConfirmacao.textContent = 'O horário da consulta deve estar entre 08:00 e 18:00.';
                return;
            }
            if (!/^[a-zA-Z\s]+$/.test(medico)) {
                mensagemConfirmacao.textContent = 'O nome do médico deve conter apenas letras e espaços.';
                return;
            }
            if (!/^[a-zA-Z\s]+$/.test(nome)) {
                mensagemConfirmacao.textContent = 'O nome do paciente deve conter apenas letras e espaços.';
                return;
            }
            if (!/^[a-zA-Z\s]+$/.test(consulta)) {
                mensagemConfirmacao.textContent = 'O tipo de consulta deve conter apenas letras e espaços.';
                return;
            }
            if (dadosAgendamento.some(agendamento => agendamento.data === data && agendamento.hora === hora && agendamento.medico === medico)) {
                mensagemConfirmacao.textContent = 'Já existe um agendamento para este médico, data e hora.';
                return;
            }
            if (dadosAgendamento.some(agendamento => agendamento.telefone === telefone && agendamento.data === data && agendamento.hora === hora)) {
                mensagemConfirmacao.textContent = 'Você já possui um agendamento para esta data e hora.';
                return;
            }
            if (dadosAgendamento.length >= 50) {
                mensagemConfirmacao.textContent = 'Número máximo de agendamentos atingido.';
                return;
            };
        
            const agendamento = { nome, consulta, data, hora, telefone, medico, convenio };
            dadosAgendamento.push(agendamento);
            mensagemConfirmacao.textContent = 'Agendamento realizado com sucesso!';
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `Nome: ${nome} | Consulta: ${consulta} | Data: ${data} | Hora: ${hora} | Telefone: ${telefone} | Médico: ${medico} | Convênio: ${convenio}`;
            listaAgendamentos.appendChild(itemLista);
            alert('Agendamento realizado com sucesso!');
            form.reset();
            console.log(dadosAgendamento);
        } else {
            mensagemConfirmacao.textContent = 'Por favor, preencha todos os campos.';
        }
    } catch (error) {
        mensagemConfirmacao.textContent = 'Ocorreu um erro inesperado. Tente novamente.';
        console.error(error);
    }
});

function validarFormulario() {
  if (nome && consulta && data && hora && telefone && medico && convenio) {
    return true;
  } else {
    return false;
  }
};

function salvarAgendamentos() {
    localStorage.setItem('agendamentos', JSON.stringify(dadosAgendamento));
};
function carregarAgendamentos() {
    const agendamentosSalvos = localStorage.getItem('agendamentos');
    if (agendamentosSalvos) {
        const agendamentosArray = JSON.parse(agendamentosSalvos);
        agendamentosArray.forEach(agendamento => {
            dadosAgendamento.push(agendamento);
            const itemLista = document.createElement('li');
            itemLista.innerHTML = `Nome: ${agendamento.nome} | Consulta: ${agendamento.consulta} | Data: ${agendamento.data} | Hora: ${agendamento.hora} | Telefone: ${agendamento.telefone} | Médico: ${agendamento.medico} | Convênio: ${agendamento.convenio}`;
            listaAgendamentos.appendChild(itemLista);
        });
    }       
};
window.onload = carregarAgendamentos;
window.onbeforeunload = salvarAgendamentos;