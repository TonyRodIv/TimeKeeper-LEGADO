const usuarios = [
    {
        usuario: 'Aluno@es.estudante.senai.br',
        senha: '12345678'
    },
    {
        usuario: 'leticia@leticia.com',
        senha: 'leticia654321'
    },
    {
        usuario: 'bruno@bruno.com',
        senha: 'bruno987654'
    },
]
document.getElementById('form').addEventListener('submit',
    function validate(event) {
        event.preventDefault();

        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        let passColor = document.getElementById('password')
        let emailColor = document.getElementById('email')

        let errorEmail = document.getElementById('errorEmail')
        let errorPass = document.getElementById('errorPass')

        passColor.style.border = "none";
        errorPass.style.display = 'none';
        emailColor.style.border = "none";
        errorEmail.style.display = 'none';
        for (let i = 0; i < usuarios.length; i++) {
            if (email == usuarios[i].usuario && pass == usuarios[i].senha) {
                console.log('login efetuado')
                localStorage.setItem('Login', email)
                window.location.href = '../pages/home.html'
                i=5
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