const modalERR = document.getElementById("modalERR");
let goAway = document.getElementById('goAway')
screenTest()
function screenTest() {
    let screenWidth = window.innerWidth;
    if(screenWidth>800){
        modalERR.style.display = 'inline-flex'
    }else{
        modalERR.style.display = 'none'
    }
}
goAway.addEventListener('click',()=>{
    modalERR.style.display = 'none'
})
window.addEventListener("resize", screenTest);

const usuarios = [
    {
        usuario: 'email@email.com',
        senha: 'senha1234'
    },
    {
        usuario: 'aluno@es.estudante.senai.br',
        senha: '12345678'
    }
]

let email = document.getElementById('email').value
let pass = document.getElementById('password').value
let passColor = document.getElementById('password')
let emailColor = document.getElementById('email')

let googleFast = document.getElementById('googleFast')
let errorEmail = document.getElementById('errorEmail')
let errorPass = document.getElementById('errorPass')

googleFast.addEventListener('click',()=>{
    email = 'aluno@es.estudante.senai.br'
    pass = '12345678'
})

document.getElementById('form').addEventListener('submit',
    function validate(event) {
        event.preventDefault();

        passColor.style.border = "none";
        errorPass.style.display = 'none';
        emailColor.style.border = "none";
        errorEmail.style.display = 'none';
        for (let i = 0; i < usuarios.length; i++) {
            if (email == usuarios[i].usuario && pass == usuarios[i].senha) {
                i=5
                console.log('login efetuado')
                localStorage.setItem('Login', email)
                window.location.href = '../pages/home.html'
            }
            else {
                if (pass == usuarios[i].senha) {
                    console.log(`SENHA ${i}`)
                    passColor.style.border = "green solid 3px";
                    errorPass.style.display = 'none';
                    i=5
                } else {
                    console.log(`senha ${i}`)
                    passColor.style.border = "red solid 3px";
                    errorPass.style.display = 'block';
                }
                if (email == usuarios[i].usuario) {
                    console.log(`EMAIL ${i}`)
                    emailColor.style.border = "green solid 3px";
                    errorEmail.style.display = 'none';
                    i=5
                } else {
                    console.log(`email ${i}`)
                    emailColor.style.border = "red solid 3px";
                    errorEmail.style.display = 'block';
                }

            }
        }
    }
)