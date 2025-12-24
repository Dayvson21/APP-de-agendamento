
const dadosAgendamento = [];
const form = document.getElementById('agendamento-form');

const agendarBtn = document.getElementById('agendar-btn');
const mensagemConfirmacao = document.getElementById('confirmação-mensagem');
const listaAgendamentos = document.getElementById('agendamentos-lista');
agendarBtn.addEventListener('click', function () {
    const nome = document.getElementById('nome').value;
    const consulta = document.getElementById('consulta').value;
    const data = document.getElementById('dataConsulta').value;
    const hora = document.getElementById('horaConsulta').value;
    const telefone = document.getElementById('telefone').value;
    const medico = document.getElementById('medico').value;
    const convenio = document.getElementById('convenio').value;
    if (nome && data && hora && telefone && medico && convenio) {
        const agendamento = { nome, data, hora, telefone, medico, convenio };
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
});

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