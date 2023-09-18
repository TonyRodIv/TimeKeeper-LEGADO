// Antony (@TonyRodIv)
let head = document.getElementById('head')
let title = document.getElementById('title')
let mainGrid = document.getElementById('mainGrid')
let subInfo = document.getElementById('subInfo')
let descriptionText = document.getElementById('descriptionText')
let category = document.getElementById('category')
let wrapperButton = document.getElementById('wrapperButton');

fetch('../src/data.json')
    .then(response => response.json())
    .then(infoAulas => {
        let i = localStorage.getItem("cardDetail")
        let horario = localStorage.getItem("horario")
        let color = infoAulas[i].cor
        if (color == "dark") {
            head.style.backgroundImage = "url('../img/Cards/Icons\ bg\ -\ header.svg')"
        } else {
            head.style.backgroundImage = `url('../img/Cards/${color}.svg')`
        }
        let atribuicao = infoAulas[i].atribuicao
        if (atribuicao > 0) {
            atribuicao = "Pendente"
        } else {
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

        mainGrid.innerHTML += `
        <article class="cardM" onclick="AbrirModal()">
                        <img src="../img/Icons/Atribuição.svg" class="${color}S" alt="">
                        <p class="cardTitle">
                            Atribuição
                            <span class="cardContent">
                            ${atribuicao}
                            </span>
                        </p>
                    </article>
        <article class="cardM">
                        <img src="../img/Icons/Clock.svg" class="${color}S" alt="">
                        <p class="cardTitle">
                            Duração
                            <span class="cardContent">
                            ${infoAulas[i].duracao}
                            </span>
                        </p>
                    </article>
        <article class="cardM">
                        <object data="../img/Icons/Clock.svg" class="${color}S" type="image/svg+xml"></object>
                        <p class="cardTitle">
                            Começa às
                            <span class="cardContent">
                            ${horario}
                            </span>
                        </p>
                    </article>
        `
        subInfo.innerHTML = `
        <artigle class="subCard ${color}">
        <p>SALA: ${infoAulas[i].sala}</p>
    </artigle>
        <artigle class="subCard ${color}">
        <p>ANDAR: ${infoAulas[i].andar}</p>
    </artigle>
        <artigle class="subCard ${color}">
        <p>BLOCO: ${infoAulas[i].bloco}</p>
    </artigle>
        `
        descriptionText.innerHTML = `
        ${infoAulas[i].descricao}
        `
        wrapperButton.innerHTML = `
         <button class="entrega">Entregar até <br> quarta-feira</button>
                <button class="professor ${color} " > Entrar em contato <br> 
com Professor </button>
        `;
        for (let x = 0; x < 3; x++) {
            category.innerHTML += `
            <article class="subCard2 color${x}">
            ${infoAulas[i].categorias[x]}
                    </article>
            `
        }
    });







// Função para abrir o modal
function AbrirModal() {
    setTimeout(function () {
        document.getElementById("modal1").style.display = "flex";
    }, 200); // 1000 milissegundos (1 segundo)
}

// Função para fechar o modal
function FecharModal() {
    document.getElementById("modal1").style.display = "none";
}

// Função para alternar entre abrir e fechar o modal
function AlternarModal() {
    var modal = document.getElementById("modal1");
    if (modal.style.display === "flex") {
        FecharModal(); // Se o modal estiver aberto, fecha
    } else {
        AbrirModal(); // Se o modal estiver fechado, abre
    }
}

// Adicione um ouvinte de evento de clique ao elemento raiz do documento
document.addEventListener("click", function (event) {
    var modal = document.getElementById("modal1");
    // Verifique se o clique ocorreu fora do modal
    if (event.target !== modal && modal.style.display === "flex") {
        FecharModal(); // Fecha o modal se o clique foi fora do modal e o modal está aberto
    }
});






function AbrirModal2() {
    setTimeout(function () {
        document.getElementById("modal2").style.display = "flex";
    }, 200); // 1000 milissegundos (1 segundo)
}

// Função para fechar o modal
function FecharModal2() {
    document.getElementById("modal2").style.display = "none";
}

// Função para alternar entre abrir e fechar o modal
function AlternarModal2() {
    var modal = document.getElementById("modal2");
    if (modal.style.display === "flex") {
        FecharModal2(); // Se o modal estiver aberto, fecha
    } else {
        AbrirModal2(); // Se o modal estiver fechado, abre
    }
}

// Adicione um ouvinte de evento de clique ao elemento raiz do documento
document.addEventListener("click", function (event) {
    var modal = document.getElementById("modal2");
    // Verifique se o clique ocorreu fora do modal
    if (event.target !== modal && modal.style.display === "flex") {
        FecharModal2(); // Fecha o modal se o clique foi fora do modal e o modal está aberto
    }
});