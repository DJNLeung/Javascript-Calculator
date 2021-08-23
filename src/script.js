class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOutputTextElement = previousOutputTextElement
    this.currentOutputTextElement = currentOutputTextElement
    this.clear()
  }

  clear() {
    this.currentOutput = ''
    this.previousOutput = ''
    this.operation = undefined
  }

  //Lets us chop off the last number that was recently inputted.
  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1)
    //Slice lets us chop off the end number from what was currently inputted
  }

  appendNumber(number) {
    if (number === '.' && this.currentOutput.includes('.')) return
    this.currentOutput = this.currentOutput.toString() + number.toString()
  }


  //This function and the compute() function is the bread and butter of our Calculator
  chooseOperation(operation) {
    if (this.currentOutput === '') return
    if (this.previousOutput !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOutput = this.currentOutput
    this.currentOutput = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOutput)
    const current = parseFloat(this.currentOutput)

    // isNaN = Not a Number
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break

        //Default is for if none of the previous operations occur
        //then it is most likely invalid, so we will "Return" it
        // ie. Stopping the execution of the function
      default:
        return
    }

    //This allows us to be able to compute numbers now from what is
    //implmented
    this.currentOutput = computation
    this.operation = undefined
    this.previousOutput = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        //Means there can never be any decimal places after the
        //integerDigits Value when it gets converted into a string with a bunch of commas..
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOutputTextElement.innerText =
      this.getDisplayNumber(this.currentOutput)

    if (this.operation != null) {
      this.previousOutputTextElement.innerText =
        `${this.getDisplayNumber(this.previousOutput)} ${this.operation}`
    } else {
      this.previousOutputTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOutputTextElement = document.querySelector('[data-previous-output]')
const currentOutputTextElement = document.querySelector('[data-current-output]')

const calculator = new Calculator(previousOutputTextElement, currentOutputTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

//This allows us to remove one number from the back of what was inputted
//each time we click the Delete Button
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
