(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function caltempo(mil) {
        const min = Math.floor(mil / 60000);
        const seg = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${seg}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function remover(placa) {
            { /*const entrada = ler().find(veiculo => veiculo.placa === placa)
        const nome = ler().find(veiculo => veiculo.placa === placa)*/
            }
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = caltempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O Veiculo ${nome}. tempo de permanencia ${tempo}`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="deletar" data-placa=${veiculo.placa}>X</button>
                </td>
            `;
            (_a = row.querySelector('.deletar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function render() {
            $('#patio').innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach(veiculo => adicionar(veiculo));
            }
        }
        return { ler, remover, adicionar, salvar, render };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Campo nome e placa é obrigatorio!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
}());
