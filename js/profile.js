const exit = document.getElementById('exit')

exit.addEventListener('click',()=>{
    localStorage.removeItem('Login')
    window.location.href = '../index.html'
})