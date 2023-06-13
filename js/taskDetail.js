let title = document.getElementById('title')
let mainGrid = document.getElementById('mainGrid')
let subInfo = document.getElementById('subInfo')
let descriptionText = document.getElementById('descriptionText')
let category = document.getElementById('category')

fetch('../src/data.json')
    .then(response => response.json())
    .then(infoAulas => {
        let i = localStorage.getItem("cardDetail")
        let horario = localStorage.getItem("horario")



        let atribuicao = infoAulas[i].atribuicao
        if(atribuicao>0){
            console.log("teste")
            atribuicao = "Pendente"
        }else{
            console.log("tes")
            atribuicao = "Nenhuma"
        }

        title.innerHTML = `
    <p class="taskTitle">
    ${infoAulas[i].nomeDaAula}
    <span class="taskSubtitle">
        Com ${infoAulas[i].professor}
    </span>
</p>
    `
        
        mainGrid.innerHTML +=`
        <article class="cardM">
                        <img src="../img/Icons/Atribuição.svg" alt="">
                        <p class="cardTitle">
                            Atribuição
                            <span class="cardContent">
                            ${atribuicao}
                            </span>
                        </p>
                    </article>
        <article class="cardM">
                        <img src="../img/Icons/Clock.svg" alt="">
                        <p class="cardTitle">
                            Duração
                            <span class="cardContent">
                            ${infoAulas[i].duracao}
                            </span>
                        </p>
                    </article>
        <article class="cardM">
                        <img src="../img/Icons/Clock.svg" alt="">
                        <p class="cardTitle">
                            Começa às
                            <span class="cardContent">
                            ${horario}
                            </span>
                        </p>
                    </article>
        `
        subInfo.innerHTML = `
        <artigle class="subCard">
        <p>SALA: ${infoAulas[i].sala}</p>
    </artigle>
        <artigle class="subCard">
        <p>ANDAR: ${infoAulas[i].andar}</p>
    </artigle>
        <artigle class="subCard">
        <p>BLOCO: ${infoAulas[i].bloco}</p>
    </artigle>
        `
        descriptionText.innerHTML = `
        ${infoAulas[i].descricao}
        `
        for(let x = 0;x<3;x++){
            category.innerHTML += `
            <article class="subCard2 color${x}">
            ${infoAulas[i].categorias[x]}
                    </article>
            `
        }
    });

