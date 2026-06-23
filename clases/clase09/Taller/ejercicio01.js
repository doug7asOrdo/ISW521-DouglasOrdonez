for (let indice = 1; indice <= 30; indice++ ) {
    if (indice % 3 === 0 && indice % 5 === 0) {
        console.log("FizzBuzz");
    } else if ( indice % 3 === 0 ) {
        console.log("Fizz");
    } else if ( indice % 5 === 0 ) {
        console.log("Buzz");
    } else {
        console.log(indice);
    }
}