(function(){
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query)

    interface veiculo {
        nome: string;
        placa: string;
        entrada: Date | string;
    }

    function caltempo(mil: number){
        const min = Math.floor(mil / 60000)
        const seg = Math.floor((mil % 60000) / 1000)
        return `${min}m e ${seg}s`
    }

    function patio (){
        function ler(): veiculo[]{
            return localStorage.patio ? JSON.parse(localStorage.patio) : []
        }

        function salvar(veiculos: veiculo[]){
            localStorage.setItem('patio', JSON.stringify(veiculos))
        }

        function remover(placa: string){
            {/*const entrada = ler().find(veiculo => veiculo.placa === placa)
        const nome = ler().find(veiculo => veiculo.placa === placa)*/}
            const {entrada, nome} = ler().find((veiculo) => veiculo.placa === placa)

            const tempo = caltempo(new Date().getTime() - new Date(entrada).getTime())

            if(!confirm(`O Veiculo ${nome}. tempo de permanencia ${tempo}`)) return;

            salvar(ler().filter(veiculo => veiculo.placa !== placa))
            render()
        }

        function adicionar(veiculo: veiculo, salva?: boolean){
            const row = document.createElement('tr')

            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="deletar" data-placa=${veiculo.placa}>X</button>
                </td>
            `

            row.querySelector('.deletar')?.addEventListener('click',
                function() {
                    remover(this.dataset.placa)
                }
            )

            $('#patio')?.appendChild(row)
            if(salva) salvar([...ler(), veiculo])
        }

        

        function render(){
            $('#patio')!.innerHTML = ""
            const patio = ler()

            if(patio.length){
                patio.forEach(veiculo => adicionar(veiculo))
            }
        }
        return {ler, remover, adicionar, salvar, render}
    }
    patio().render()
    $('#cadastrar')?.addEventListener("click", () => {
        const nome = $('#nome')?.value
        const placa = $('#placa')?.value

        if(!nome || !placa){
            alert("Campo nome e placa é obrigatorio!");
            return;
        }
        patio().adicionar({nome, placa, entrada: new Date().toISOString()}, true)
    })

}())