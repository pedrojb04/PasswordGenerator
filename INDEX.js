const inputE1 = document.querySelector('#password')
const uppercaseCharsE1 = document.querySelector('#uppercase-check')
const numbersCharsE1 = document.querySelector('#number-check')
const symbolCharsE1 = document.querySelector('#symbol-check')
const securityIndicatorbarE1 = document.querySelector('#security-indicator-bar')
let passwordLenght = 16
//CRIANDO A SENHA
function generatePassword() {
  let password = ''
  let chars = 'abcdefghjklmnpqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const numbersChars = '123456789'
  const symbolChars = '?!@$[].*'
  if (uppercaseCharsE1.checked) {
    chars += uppercaseChars
  }
  if (numbersCharsE1.checked) {
    chars += numbersChars
  }
  if (symbolCharsE1.checked) {
    chars += symbolChars
  }

  for (let i = 0; i < passwordLenght; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  const inputE1 = document.querySelector('#password')
  inputE1.value = password
  calculateQuality()
  calculateFontsize()
}
function calculateQuality() {
  const percent = Math.round(
    (passwordLenght / 64) * 35 +
      (uppercaseCharsE1.checked ? 15 : 0) +
      (numbersCharsE1.checked ? 20 : 0) +
      (symbolCharsE1.checked ? 30 : 0)
  )
  securityIndicatorbarE1.style.width = `${percent}%`
  if (percent > 69) {
    securityIndicatorbarE1.classList.remove('critical')
    securityIndicatorbarE1.classList.remove('warning')
    securityIndicatorbarE1.classList.add('safe')
  } else if (percent > 50) {
    securityIndicatorbarE1.classList.remove('critical')
    securityIndicatorbarE1.classList.remove('safe')
    securityIndicatorbarE1.classList.add('warning')
  } else if (percent < 50) {
    securityIndicatorbarE1.classList.remove('safe')
    securityIndicatorbarE1.classList.remove('warning')
    securityIndicatorbarE1.classList.add('critical')
  }
  if (percent >= 100) {
    securityIndicatorbarE1.classList.add('completed')
  } else {
    securityIndicatorbarE1.classList.remove('completed')
  }
}
function calculateFontsize() {
  if (passwordLenght > 45) {
    inputE1.classList.remove('font-xs')
    inputE1.classList.remove('font-sm')
    inputE1.classList.add('font-xxs')
  } else if (passwordLenght > 32) {
    inputE1.classList.remove('font-xxs')
    inputE1.classList.remove('font-sm')
    inputE1.classList.add('font-xs')
  } else if (passwordLenght > 22) {
    inputE1.classList.remove('font-xs')
    inputE1.classList.remove('font-xxs')
    inputE1.classList.add('font-sm')
  } else {
    inputE1.classList.remove('font-xs')
    inputE1.classList.remove('font-sm')
    inputE1.classList.remove('font-xxs')
  }
}
//FUNÇÃO BOTAO COPIAR
function copy() {
  navigator.clipboard.writeText(inputE1.value)
}
//MUDANDO TAMANHO DA SENHA
let passwordLenghtE1 = document.querySelector('#password-lenght')
passwordLenghtE1.addEventListener('input', function () {
  passwordLenght = passwordLenghtE1.value
  document.querySelector('#password-lenght-text').innerText = passwordLenght
  generatePassword()
})

//Configurando Click Dos Botoes
uppercaseCharsE1.addEventListener('click', generatePassword)
numbersCharsE1.addEventListener('click', generatePassword)
symbolCharsE1.addEventListener('click', generatePassword)
//COPIANDO SENHA
document.querySelector('#copy2').addEventListener('click', function () {
  copy()
})
document.querySelector('#copybutton').addEventListener('click', function () {
  copy()
})
document.querySelector('#renew').addEventListener('click', generatePassword)

generatePassword()
