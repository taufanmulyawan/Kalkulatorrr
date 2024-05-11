function getHistory(){
    return document.getElementById('history-value').innerText;
}
function printHistory(num){
    document.getElementById("history-value").innerText=num;
}
function getOutput(){
    return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    } 
}
function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}
// Fungsi untuk menambahkan angka atau operator ke ekspresi
function addToExpression(value) {
    let output = document.getElementById("output-value");
    output.innerText += value;
}

// Event listener untuk tombol-tombol keyboard
document.addEventListener("keydown", function(event) {
    // Cek jika tombol yang ditekan adalah angka atau operator
    if (event.key.match(/[0-9+\-*\/%]/)) {
        // Jika iya, tambahkan ke ekspresi
        addToExpression(event.key);
    } else if (event.key === "Enter") {
        // Jika tombol Enter ditekan, evaluasi ekspresi
        evaluateExpression();
    } else if (event.key === "Backspace") {
        // Jika tombol Backspace ditekan, hapus karakter terakhir dari ekspresi
        removeLastCharacter();
    }
});

// Fungsi untuk mengevaluasi ekspresi
function evaluateExpression() {
    let expression = document.getElementById("output-value").innerText;
    let result = eval(expression); // Menggunakan fungsi eval() hati-hati, gunakan cara yang aman di lingkungan produksi
    document.getElementById("output-value").innerText = result;
}

// Fungsi untuk menghapus karakter terakhir dari ekspresi
function removeLastCharacter() {
    let output = document.getElementById("output-value");
    let currentExpression = output.innerText;
    output.innerText = currentExpression.substring(0, currentExpression.length - 1);
}

var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else{
            var output = getOutput();
            var history = getHistory();
            if(output=="" && history!=""){

                if(isNaN(history[history.length-1])){
                    history = history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                output = output=="" ? output : reverseNumberFormat(output);
                history = history+output;
                if(this.id=="="){
                    var result=eval(history);
                    printOutput(result);
                    printHistory("");
                }

                else if(this.id=="%"){
                    var n = reverseNumberFormat(getOutput());
                    var percent = n / 100;
                    printOutput(percent.toFixed(4));
                }
                else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput());
        //if output is a number
        if(output!=NaN){
            output=output+this.id;
            printOutput(output);
            
        }
    });
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change',function(){
    if(this.checked){
        document.documentElement.setAttribute('data-theme','dark');
    }else{
        document.documentElement.setAttribute('data-theme','light');
    }
})