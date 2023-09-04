// Glaucos (@BigGlaucos)
let mesAnterior = null;
let diaAnterior = null;

fetch("../src/data.json")
  .then((response) => response.json())
  .then((infoAulas) => {
    // Função para criar o carrossel de meses
    function criarCarrosselMeses() {
      const mesesCarousel = document.querySelector(".meses-carousel");
      const diasCarousel = document.querySelector(".dias-carousel");

      const dataAtual = new Date();
      const mesAtual = dataAtual.getMonth();
      const meses = {
        anterior: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
          new Date(dataAtual.getFullYear(), mesAtual - 1)
        ),
        atual: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
          new Date(dataAtual.getFullYear(), mesAtual)
        ),
        proximo: new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
          new Date(dataAtual.getFullYear(), mesAtual + 1)
        ),
      };

      for (const mes in meses) {
        const elemento = document.createElement("button");
        elemento.classList.add("mes");
        elemento.textContent = meses[mes];
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

          const diasMes = obterDiasMes(mes);
          const diaAtual = new Date().getDate();

          // Calcula a data do dia atual e o intervalo de dias a exibir
          const dataDia = new Date(
            dataAtual.getFullYear(),
            dataAtual.getMonth(),
            diaAtual
          );
          const diaInicio = new Date(dataDia);
          diaInicio.setDate(diaInicio.getDate() - 3); // 5 dias anteriores
          const diaFim = new Date(dataDia);
          diaFim.setDate(diaFim.getDate() + 3); // 5 dias posteriores

          for (const dia of diasMes) {
            // Verifica se o dia está dentro do intervalo desejado
            if (dia >= diaInicio.getDate() && dia <= diaFim.getDate()) {
              const diaElemento = document.createElement("div");
              diaElemento.classList.add("dia");
              diaElemento.textContent = dia;
              diaElemento.setAttribute("data-dia", dia);
              diasCarousel.appendChild(diaElemento);

              diaElemento.addEventListener("click", function () {
                // Remove os estilos do botão de dia anteriormente clicado
                if (diaAnterior) {
                  diaAnterior.style.backgroundColor = "";
                  diaAnterior.style.color = "";
                }

                // Aplica os estilos ao botão de dia atualmente clicado
                if (diaAtual) {
                  this.style.backgroundColor = "#363636"; // exemplo de cor de fundo
                  this.style.color = "#ffffff"; // exemplo de cor do texto
                }

                // Armazena a referência do botão de dia anteriormente clicado
                diaAnterior = this;

                // Lógica para executar ação quando o botão de dia for clicado
                console.log("Você clicou no dia:", dia);
                const date = new Date();
                if (dia != date.getDate()) {
                  sorteio();
                } else {
                  dataAtualS(infoAulas);
                }
                // Adicione aqui a lógica para estilizar ou fazer alterações no botão de dia clicado
              });
            }
          }
        });
      }
    }

    // Função para obter os dias do mês
    function obterDiasMes(mes) {
      const dataAtual = new Date();
      const mesAtual = dataAtual.getMonth();
      const mesAnterior = new Date(dataAtual.getFullYear(), mesAtual - 1);
      const proximoMes = new Date(dataAtual.getFullYear(), mesAtual + 1);
      const diasAnterior = new Date(
        mesAnterior.getFullYear(),
        mesAnterior.getMonth() + 1,
        0
      ).getDate();
      const diasAtual = new Date(
        dataAtual.getFullYear(),
        mesAtual + 1,
        0
      ).getDate();
      const diasProximo = new Date(
        proximoMes.getFullYear(),
        proximoMes.getMonth() + 1,
        0
      ).getDate();

      switch (mes) {
        case "anterior":
          return Array.from({ length: diasAnterior }, (_, i) => i + 1);
        case "atual":
          return Array.from({ length: diasAtual }, (_, i) => i + 1);
        case "proximo":
          return Array.from({ length: diasProximo }, (_, i) => i + 1);
        default:
          return [];
      }
    }
    // Função para carregar os dados do arquivo JSON e criar o carrossel
    function carregarDados() {
      fetch("../src/calendar.json")
        .then((response) => response.json())
        .then((data) => {
          const meses = data.meses;
          const dias = data.dias;

          criarCarrosselMeses();

          // Obter data atual
          const dataAtual = new Date();
          const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });

          // Percorrer os botões de mês para encontrar o correspondente à data atual
          const botoesMes = document.querySelectorAll(".mes");

          botoesMes.forEach((element, index) => {
            if (element.innerHTML.toLowerCase() === mesAtual) {
              element.click(); // Clica no botão de mês atual

              // Obtém o botão de dia atual
              const botaoDiaAtual = document.querySelector(
                ".dia[data-dia='" + dataAtual.getDate() + "']"
              );
              if (botaoDiaAtual) {
                botaoDiaAtual.click(); // Clica no botão de dia atual
              }
            }
          });
        })
        .catch((error) => console.error(error));
    }

    // FAZ A SCROLLBAR IR ATÉ O MÊS E DIA ATUAL
    window.addEventListener("load", function () {
      const mesesScroll = document.getElementById("mesesCarousel");
      const dataAtual = new Date();
      const mesAtual = dataAtual.getMonth();
      const posicaoDesejadaMes = 96.5 * mesAtual;
      mesesScroll.scrollLeft = posicaoDesejadaMes;
    });

    window.addEventListener("load", function () {
      const dataAtual = new Date();
      const diasScroll = document.getElementById("diasCarousel");
      const diaAtual = dataAtual.getDate();
      const posicaoDesejadaDia = 16 * diaAtual;
      diasScroll.scrollLeft = posicaoDesejadaDia;
    });

    // Chamada da função para carregar os dados
    carregarDados();

    //ESCRITA DOS CARDS
    let writeCard = document.getElementById("writeCards");

    const numerosSorteados = [];
    function sorteio() {
      while (numerosSorteados.length) {
        numerosSorteados.pop();
      }
      console.log(numerosSorteados);

      while (numerosSorteados.length < 6) {
        const numero = Math.floor(Math.random() * 6);
        if (!numerosSorteados.includes(numero)) {
          numerosSorteados.push(numero);
        }
      }
      console.log(numerosSorteados);
      localStorage.setItem("localRandomNum", numerosSorteados);
      loadCards();
    }
    function dataAtualS() {
      while (numerosSorteados.length) {
        numerosSorteados.pop();
      }
      for (let i = 0; i < 6; i++) {
        numerosSorteados.push(localStorage.getItem(`CardOrder${i}`));
      }
      console.log(numerosSorteados, "carregando data atual");
      localStorage.setItem("localRandomNum", numerosSorteados);
      loadCards(infoAulas);
    }

    function loadCards() {
      const horarios = [
        { horario: "07:15", id: "1" },
        { horario: "08:45", id: "2" },
        { horario: "10:30", id: "3" },
        { horario: "12:30", id: "4" },
        { horario: "14:15", id: "5" },
        { horario: "15:45", id: "6" },
      ];
      for (let i = 0; i < infoAulas.length; i++) {
        infoAulas[numerosSorteados[i]].id = horarios[i].id;
        infoAulas[numerosSorteados[i]].horario = horarios[i].horario;
      }

      infoAulas.sort((a, b) => a.id - b.id);
      writeCard.innerHTML = "";
      for (let i = 0; i < infoAulas.length; i++) {
        writeCard.innerHTML += `
        <figure class="${infoAulas[i].cor}" id="normalBigCard" onclick="card${numerosSorteados[i]}()">
          <div class="cardImgBG">
            <article class="infoCard">
              <p class="titleCardC">
                ${infoAulas[i].nomeDaAula}
              </p>
              <p class="infoClassC ">
                SALA: <span class="infoClassSpan">${infoAulas[i].sala}</span> <br>
                ANDAR: <span class="infoClassSpan">${infoAulas[i].andar}</span> <br>
                BLOCO: <span class="infoClassSpan">${infoAulas[i].bloco}</span> <br>
                DURAÇÃO: <span class="infoClassSpan">${infoAulas[i].duracao}</span>
              </p>
              <p class="textBoldCard horarioB">
                Hoje às <br> <span> ${infoAulas[i].horario} </span>
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
    }
    console.log(infoAulas);
  });

const horarios = [
  { horario: "07:15", id: "1" },
  { horario: "08:45", id: "2" },
  { horario: "10:30", id: "3" },
  { horario: "12:30", id: "4" },
  { horario: "14:15", id: "5" },
  { horario: "15:45", id: "6" },
];
let numerosSorteadosDetail = localStorage.getItem("localRandomNum");
numerosSorteadosDetail = numerosSorteadosDetail.split(",");
console.log(numerosSorteadosDetail);

function card0() {
  localStorage.setItem("cardDetail", 0);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[0]].horario);
  window.location.href = "./taskDetail.html";
}
function card1() {
  localStorage.setItem("cardDetail", 1);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[1]].horario);
  window.location.href = "./taskDetail.html";
}
function card2() {
  localStorage.setItem("cardDetail", 2);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[2]].horario);
  window.location.href = "./taskDetail.html";
}
function card3() {
  localStorage.setItem("cardDetail", 3);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[3]].horario);
  window.location.href = "./taskDetail.html";
}
function card4() {
  localStorage.setItem("cardDetail", 4);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[4]].horario);
  window.location.href = "./taskDetail.html";
}
function card5() {
  localStorage.setItem("cardDetail", 5);
  localStorage.setItem("horario", horarios[numerosSorteadosDetail[5]].horario);
  window.location.href = "./taskDetail.html";
}
