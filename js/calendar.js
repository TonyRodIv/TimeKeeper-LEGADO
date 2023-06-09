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
        if(element.innerHTML.toLowerCase() === mesAtual ) {
          botoesMes[index].click()
        }
      });
    })
    .catch(error => console.error(error));
}

// Chamada da função para carregar os dados
carregarDados();
// Chamada da função para carregar os dados
carregarDados();


var data = new Date(); // cria um objeto de data com a data 15/02/2021
var opcoes = { month: 'long', year: 'numeric', day: 'numeric' }; // define as opções de formato
var dataFormatada = data.toLocaleString('pt-BR', opcoes); // formata a data para o idioma português do Brasil
console.log(dataFormatada); // mostra a data formatada no console

