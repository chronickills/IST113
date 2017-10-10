var num = 0;
var guess = 0;
var guesses = 1;

function d(vari) {
	return document.getElementById(vari);
}

window.onload = function what(){
d('textF').innerHTML = 'Please enter a number';
};

function acceptBtn() {
	
	
	if (num == 0) {
		d('accept').innerText = "Accept";
		num = parseInt(d("e").value);
		d("e").value = undefined;
		d('e').setAttribute("type", "number");
		d('textF').innerHTML = 'Please guess the number';
	} else {
		guess = d("e").value;
		if (guess == num) {
			d('textF').innerHTML = 'Winner with ' + guesses + ' guesses!';
			d('accept').innerText = 'Play Again?';
		} else if (guess > num) {
			d('textF').innerHTML = 'Guess is too high, guess lower';
			guesses +=1;
		} else if (guess < num) {
			d('textF').innerHTML = 'Guess is to low, guess higher';
			guesses +=1;
		}
	}
	
	if (d('accept').innerText == "Play Again?"){
		num = 0;
		d("e").value = undefined;
		d('e').setAttribute("type", "password");
		d('textF').innerHTML = d('textF').innerHTML + "\nIf you wish to play again please enter the new number.";
	}
}