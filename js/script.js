const previousOperationText = document.querySelector("#previousOperation");
const currentOperationText = document.querySelector("#currentOperation");
const buttons = document.querySelectorAll("#buttonsContainer button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText; //valores impressos na tela
    this.currentOperationText = currentOperationText; //valores impressos na tela
    this.currentOperation = " "; //valor que a pessoa vai digitar na tela
  }
  //addDigit adiciona os dígitos ao visor
  addDigit(digit){ 
    //check if current operation already has a dot ou em port:verifique se a operação atual já tem um ponto
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
    } 
    this.currentOperation = digit;
    this.updateScream();
  }
  //process all calculator Operations
  processOperation(operation) {
    //Check if currentValue is empty port: Verifique se currentValue está vazio
    if (currentOperationText.innerText === "" && operation !== "C") {
         //Change operation 
      if (previousOperationText.innerText !== ""){
        this.changeOperation(operation);
      }
      return 
    } 



    // get current and previous value ou em portugues: obter valor atual e anterior
    let operationValue //esse é let pois seu valor pde ser alterado, ja os outros dois (const) o valor não é alterado
    const previous = +this.previousOperationText.innerText.split(" ")[0];   // previous = anterior
    const  current = +this.currentOperationText.innerText;     //current = atual
   
    switch (operation) { //switch = trocar

        case "+" :     //caso
        operationValue = previous + current;
        this.updateScream(operationValue, operation, current, previous);
        break;    //quebrar 

        case "-" :    
        operationValue = previous - current;
        this.updateScream(operationValue, operation, current, previous);
        break;  

        case "÷" :   
        operationValue = previous / current;
        this.updateScream(operationValue, operation, current, previous);
        break;   

        case "x" :    
        operationValue = previous * current;
        this.updateScream(operationValue, operation, current, previous);
        break;    

        case "DEL" :    
       
        this.delOperation()
        break;    

        case "C" :    

        this.fullDellOperation() //deleta tudo tanto de baixo quanto de cima 
        break;    

       
        case "CE" :    
  
        this.delFullOperation()
        break;  

        case "=" :    
        this.processEqualOperation()
        break; 


        default:     //padrão
        return;     //retornar 
      }
  }

    //mudar valores da tela da calculadora 
  updateScream(
    operationValue = null,  //todos os valores vão ser nulos no começo da operação!
    operation = null, 
    current = null, 
    previous = null) {

    console.log(operationValue, operation, current, previous)

    if(operationValue === null){
        this.currentOperationText.innerText += this.currentOperation;
    }else {
        //check if value is zero, if it is just add current value
        if(previous === 0){
            operationValue = current;
        }
            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
       
    }
  }
    // Change math operation 
    changeOperation(operation){
      const mathOperations = ["x", "÷", "+", "-"]
      if (!mathOperations.includes(operation)) {
        return
      }

      this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;

    }
    //precisa deletar um dígito
    delOperation() {
      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //precisa deletar toda a operação
    delFullOperation(){
      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(Infinity)
    }
    //deleta tudo 
    fullDellOperation(){
      this.currentOperationText.innerText = ""
      this.previousOperationText.innerText = ""
    }
    //process an operation (=)
    processEqualOperation(){
      const operation = previousOperationText.innerText.split(" ")[1]
      this.processOperation(operation)
    }

}

const calc = new Calculator(previousOperationText, currentOperationText); //criamos uma nova instante calculator e posteriormente vamos executar os métodos que temos de entrada na aqui: lógica console.log(value); e aqui: console.log("Op:" + value); 





buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {//(e) é basicamente uma abreviaçao de evento em JS
    const value = e.target.innerText; // com este comando pegamos o texto que esta sendo exibido em cada button e a partir disso fazemos nossas operações

    if (+value >= 0 || value === ".") {//se o valor for maior ou igual a 0 vou querer fazer alguma coisa (||) e tambem se o (value) for igual === ao "." vou querer fazer alguma coisa tbm

        calc.addDigit(value)

     // console.log(value); // //esses valores são tratados como números


    } else {
      calc.processOperation(value); //com este procedimento o else cai diretamente lá no (processOperation)
      //console.log("Op:" + value);// //esse é um console.log das operações
    } // utilizando este if e este else posemos identificar se o User utilizou um número ou uma Operação
  });
});
