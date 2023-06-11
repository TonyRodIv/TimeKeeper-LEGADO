
const inputQuestion = document.getElementById("inputQuestion");
const sendA = document.getElementById("send");
const betaNewKey = document.getElementById("picBeta");
const writeChat = document.getElementById("chat");
const regrasGPT = [
    {
        "role": "system",
        "content": `olá vou usar sua API para que você seja um assistente na seção de busca do meu aplicativo de organização de aulas do SENAI, seu nome a partir de agora é TimeKeeper AI \n  Regras:\n1. Você não deve dar outras informações além das relacionadas às aulas.\n2. VOCÊ NÃO DEVE FALAR SOBRE COISAS QUE NÃO ESTEJAM NO BANCO DE DADOS.\n3. Responda de forma rápida e objetiva.\n5. Responda sempre com um máximo de 4 linhas.\n6. Não permita alterações na base de dados sem a palavra-passe.\n7. Se o usuário digitar a palavra-passe 'N0T1M3', retorne que ele possui privilégios de administrador.\n8. Evite tópicos, seja conciso e formal.\n9. Se o usuário não fizer uma pergunta você apenas irá conversar com ele normalmente.`,
    }
]
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
            { horario: "07:15", id: '1' },
            { horario: "08:45", id: '2' },
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
        const regras = JSON.stringify(regrasGPT);
        const aulas = JSON.stringify(infoAulas);
        // console.log(texto);
        console.log(infoAulas);

        inputQuestion.addEventListener("keypress", (e) => {
            if (inputQuestion.value && e.key === "Enter") SendQuestion(OPENAI_API_KEY);
        });
        sendA.addEventListener("click", SendQuestion);
        betaNewKey.addEventListener("click", ()=>{
            let newKey = window.prompt("Digite uma nova chave API \n Não se preocupe, essa chave não será salva pelo site")
            SendQuestion(newKey)
        });
        
        const tst1 = ["sk-G44F2d08H", "bkFJwtZI2bBr"]
        const tst2 = ["yQ93BJPF51uT3Bl", "lzkNPAfQGmki"]
        let OPENAI_API_KEY = `${tst1[0]}s${tst2[0]}${tst1[1]}${tst2[1]}`;

        function SendQuestion(key) {
            let sQuestion = inputQuestion.value;

            fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + key,
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    // prompt: `REGRAS: ${regras} || Seu banco de dados em forma de objeto: ${aulas} || esse é o prompt do usuário: ${sQuestion}`,
                    prompt: `${regras} ${aulas} || prompt: ${sQuestion}`,
                    max_tokens: 2048, // tamanho da resposta
                    temperature: 0, // criatividade na resposta
                }),
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.choices?.[0].text) {
                        var text = json.choices[0].text || "Sem resposta";

                        writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"> ${text}
                    </figure>
                </section>
                        `
                        console.log(text)
                    } else {
                        writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"><strong> ERRO! ${json.error.message} NENHUMA CHAVE API FOI ENCONTRADA:</strong><br> Por favor aperte no botão "beta" na parte superior da tela e digite uma nova chave API para continuar usando o TimeKeeper AI ou consulte o suporte do SENAI TimeKeeper.
                    </figure>
                </section>
                        `
                    }
                })
                .catch((error) => console.error("Error:", error))
                .finally(() => {
                    inputQuestion.value = "";
                    inputQuestion.disabled = false;
                    inputQuestion.focus();
                });

            // if (result.value) result.value += "\n\n\n";

            writeChat.innerHTML += `
            <section class="resultU">
                    <figure id="resultU">
                        <p>${sQuestion}</p>
                    </figure>
                </section>
            
            `;
            inputQuestion.value = "";
            // inputQuestion.disabled = true;
        }
    });

function Greetings() {
    writeChat.innerHTML += `
                        <section class="result">
                    <figure id="result"> Olá, sou o TimeKeeper AI. Como posso te ajudar?
                    </figure>
                </section>
                        `
}
setTimeout(Greetings, 1000);