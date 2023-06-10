let mesAnterior = null;
let diaAnterior = null;

// Função para criar o carrossel de meses
function criarCarrosselMeses(meses, dias) {
  const mesesCarousel = document.querySelector(".meses-carousel");
  const diasCarousel = document.querySelector(".dias-carousel");

  for (const mes in meses) {
    const elemento = document.createElement("button");
    elemento.classList.add("mes");
    elemento.textContent = mes;
    mesesCarousel.appendChild(elemento);

    elemento.addEventListener("click", function () {
      // Remove os estilos do botão de mês anteriormente clicado
      if (mesAnterior) {
        mesAnterior.style.fontSize = "";
        mesAnterior.style.color = "";
      }

      // Aplica os estilos ao botão de mês atualmente clicado
      this.style.color = "#000"; // exemplo de cor do texto
      this.style.fontSize = "40px";
      // Armazena a referência do botão de mês anteriormente clicado
      mesAnterior = this;

      // Remove os botões de dia anteriores
      while (diasCarousel.firstChild) {
        diasCarousel.firstChild.remove();
      }

      const diasMes = meses[mes];

      for (const dia of diasMes) {
        const diaElemento = document.createElement("div");
        diaElemento.classList.add("dia");
        diaElemento.textContent = dia;
        diasCarousel.appendChild(diaElemento);

        diaElemento.addEventListener("click", function () {
          // Remove os estilos do botão de dia anteriormente clicado
          if (diaAnterior) {
            diaAnterior.style.backgroundColor = "";
            diaAnterior.style.color = "";
          }

          // Aplica os estilos ao botão de dia atualmente clicado
          this.style.backgroundColor = "#363636"; // exemplo de cor de fundo
          this.style.color = "#ffffff"; // exemplo de cor do texto

          // Armazena a referência do botão de dia anteriormente clicado
          diaAnterior = this;

          // Lógica para executar ação quando o botão de dia for clicado
          console.log("Você clicou no dia:", dia);
          // Adicione aqui a lógica para estilizar ou fazer alterações no botão de dia clicado
        });
      }
    });
  }
}

// Função para carregar os dados do arquivo JSON e criar o carrossel
function carregarDados() {
  fetch('../src/calendar.json')
    .then(response => response.json())
    .then(data => {
      criarCarrosselMeses(data.meses, data.dias);

      // Obter data atual
      const dataAtual = new Date();
      const mesAtual = dataAtual.toLocaleString('pt-BR', { month: 'long' });


      // Percorrer os botões de mês para encontrar o correspondente à data atual
      const botoesMes = document.querySelectorAll(".mes");

      botoesMes.forEach((element, index) => {
        if (element.innerHTML.toLowerCase() === mesAtual) {
          botoesMes[index].click()
        }
      });
    })
    .catch(error => console.error(error));
}
// FAZ A SCROLLBAR IR ATÉ O MêS e dia ATUAL
window.addEventListener('load', function () {
  console.log("mês")
  const mesesScroll = document.getElementById('mesesCarousel');
  const dataAtual = new Date();
  let mesAtual = dataAtual.getMonth();
  mesAtual += 1;
  let posicaoDesejadaMes = 96.5*mesAtual;
  mesesScroll.scrollLeft = posicaoDesejadaMes;
});
window.addEventListener('load', function () {
  console.log("dia")
  const dataAtual = new Date();
  const diasScroll = document.getElementById('diasCarousel');
  let diaAtual = dataAtual.getDate();
  console.log(diaAtual)
  let posicaoDesejadaDia = 43.5*diaAtual;
  diasScroll.scrollLeft = posicaoDesejadaDia;
});


// Chamada da função para carregar os dados
carregarDados();



let writeCard = document.getElementById('writeCards')
let writeGreetings = document.getElementById('writeGreetings')

fetch('../src/data.json')
  .then(response => response.json())
  .then(infoAulas => {
    const numerosSorteados = [];
    console.log(numerosSorteados)
    for (let i = 0; i < 6; i++) {
      numerosSorteados.push(localStorage.getItem(`CardOrder${i}`))
      // localStorage.setItem(`CardOrder${i}`, numerosSorteados[i])
    }
    const horarios = [
      { horario: "7:15", id: '1' },
      { horario: "8:45", id: '2' },
      { horario: "10:30", id: '3' },
      { horario: "12:30", id: '4' },
      { horario: "14:15", id: '5' },
      { horario: "15:45", id: '6' }
    ];
    for (let i = 0; i < infoAulas.length; i++) {
      infoAulas[numerosSorteados[i]].id = horarios[i].id;
      infoAulas[numerosSorteados[i]].horario = horarios[i].horario;
    }

    infoAulas.sort((a, b) => a.id - b.id);
    for (let i = 0; i < infoAulas.length; i++) {
      writeCard.innerHTML += `
        <figure class="${infoAulas[i].cor}" id="normalBigCard">
          <div class="cardImgBG">
            <article class="infoCard">
              <p class="titleCard">
                ${infoAulas[i].nomeDaAula}
              </p>
              <p class="infoClass">
                SALA: <span class="infoClassSpan">${infoAulas[i].sala}</span> <br>
                ANDAR: <span class="infoClassSpan">${infoAulas[i].andar}</span> <br>
                BLOCO: <span class="infoClassSpan">${infoAulas[i].bloco}</span> <br>
                DURAÇÃO: <span class="infoClassSpan">${infoAulas[i].duracao}</span>
              </p>
              <p class="textBoldCard">
                Hoje as ${infoAulas[i].horario}
              </p>
            </article>
            <article class="infoBar">
              <p class="textBoldCard">
              ${infoAulas[i].professor}
              </p>
              <img src="${infoAulas[i].icon}" class="teacherImg" alt="" srcset="">
            </article>
          </div>
        </figure>
      `;
    }
    console.log(infoAulas)
  });

