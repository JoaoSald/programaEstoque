const inputBusca= document.getElementById('input-busca')
const inputTobody = document.getElementById('tbody1')

inputBusca.addEventListener('keyup', ()=>{
    let expressao = inputBusca.value

    if(expressao.length === 1){
        return
    }
    let linhas = inputTobody.getElementsByTagName('tr')

    for(let posicao in linhas){
        if(true === isNaN(posicao)){
            continue;
        }
        let conteudoDaLinha = linhas[posicao].innerHTML.toLowerCase()

        if(true === conteudoDaLinha.includes(expressao)){
            linhas[posicao].style.display = '';
        } else{
            linhas[posicao].style.display  = 'none'
        }
    }
})