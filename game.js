

const Ultimo_nivel = 4

class Juego {

  constructor() {

    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const btnEmpezar = document.getElementById('btnEmpezar')
    this.inicializar()
    setTimeout(() => {
      this.generarSec()
      this.sigNivel()
    }, 2000)


  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this) //esto es para tener el this del juego y no del boton
    this.toogleEmpezar()
    this.nivel = 4

    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }
  toogleEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
    btnEmpezar.classList.add('hide')
    }
  }

  generarSec() {

    this.secuencia = new Array(Ultimo_nivel).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  sigNivel() {
    this.subNivel = 0
    this.iluminarSec()
    this.agregarClick()
  }

  agregarClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }
  EliminarEvent() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(event) {

    const nombreColor = event.target.dataset.color
    const numeroColor = this.colorNum(nombreColor)
    
    this.iluminarColor(nombreColor)

    if (numeroColor === this.secuencia[this.subNivel]) {
      this.subNivel++
      if (this.subNivel == this.nivel) {
        this.nivel++
        this.EliminarEvent()
        if (this.nivel == (Ultimo_nivel + 1)) {
          this.gano()
        } else {
          this.sigNivel();
        }
      }
    } else {
      this.perdio()
    }

  }
  gano() {
    swal('Simon Colors', 'Ganaste!', 'success')
    this.inicializar()
  }
  perdio() {
    swal('Simon Colors', 'perdiste!', 'error')
    this.EliminarEvent()
    this.inicializar()
  }

  numColor(numero) {
    switch (numero) {
      case 0: return 'celeste'
      case 1: return 'violeta'
      case 2: return 'naranja'
      case 3: return 'verde'
    }
  }

  colorNum(color) {
    switch (color) {
      case 'celeste': return 0
      case 'violeta': return 1
      case 'naranja': return 2
      case 'verde': return 3
    }
  }

  iluminarSec() {
    for (let i = 0; i < this.nivel; i++) {
      let color = this.numColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)

    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 350)
  }
  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }
}

function empezarJuego() {


  window.juego = new Juego()

}
