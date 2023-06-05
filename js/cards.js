let writeCard = document.getElementById('writeCards')
let writeGreetings = document.getElementById('writeGreetings')

fetch('../src/data.json')
  .then(response => response.json())
  .then(infoAulas => {
    const numerosSorteados = [];
    while (numerosSorteados.length < 6) {
      const numero = Math.floor(Math.random() * 6);
      if (!numerosSorteados.includes(numero)) {
        numerosSorteados.push(numero);
      }
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
        <figure class="${infoAulas[i].cor} normalCard">
          <div class="cardImg">
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
              <img src="../img/Pfp/aluno/pfp - alice.png" class="teacherImg" alt="" srcset="">
            </article>
          </div>
        </figure>
      `;
    }
    writeGreetings.innerHTML = `<p>
    <span class="greetings">
        Bom dia, Alice!! <br>
    </span>
    Sua <span class="blueWelcome">Primeira aula</span> será no bloco <span
        class="blueWelcome">${infoAulas[0].bloco}</span>👍🏼
</p>`
    console.log(infoAulas);
    localStorage.setItem('CardOrder', numerosSorteados)
  });