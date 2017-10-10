var sStatus = "ON";
function toggleLight(){
	if (sStatus == "ON") {
		sStatus = "OFF";
		document.getElementById("sOn").style.visibility = "hidden";
		document.getElementById("sOff").style.visibility = "visible";
		document.body.style.backgroundColor = "black";
	} else {
		document.getElementById("sOn").style.visibility = "visible";
		document.getElementById("sOff").style.visibility = "hidden";
		document.body.style.backgroundColor = "white";
		sStatus = "ON";
	}
}