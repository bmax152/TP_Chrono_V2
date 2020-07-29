var startTime = 0;
var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
var resultat = 0;
var i = 0;
var tourArray = [];
var lastMemo = new Date();
var msec;
var sec;
var min;
var hr;
var tourHtml = document.getElementById("tourMemo");
var chronoHtml = document.getElementById("chronotime");
var regNbr = new RegExp("[0-9]{1,}");


function white() {

	document.getElementById("container").className = "bodyWhite";
	document.getElementById("tours").className = "white";
	document.getElementById("boutons").className = "white";
	document.getElementById("enTete").className = "white";
	document.getElementById("modes").onclick = dark;
	
}

function dark() { 

	document.getElementById("container").className = "bodyDark";
	document.getElementById("tours").className = "dark";
	document.getElementById("boutons").className = "dark";
	document.getElementById("enTete").className = "dark";
	document.getElementById("modes").onclick = white;
}


function chronoStart() {

	document.chronoForm.startstop.value = "Pause";
	document.chronoForm.startstop.onclick = chronoStop;
	document.chronoForm.reset.onclick = chronoReset;

	start = new Date();
	chrono();
}

function chrono() {

	end = new Date();
	diff = end - start;
	diff = new Date(diff);

	msec = diff.getMilliseconds();
	sec = diff.getSeconds();
	min = diff.getMinutes();
	hr = diff.getHours() - 1;

	if (min < 10) {

		min = "0" + min;
	}
	if (sec < 10) {

		sec = "0" + sec;
	}
	if (msec < 10) {

		msec = "00" + msec;
	} else if (msec < 100) {

		msec = "0" + msec;
	}
	resultat = hr + ":" + min + ":" + sec + ":" + msec;
	chronoHtml.innerHTML = resultat;
	timerID = setTimeout("chrono()", 10);
}


function chronoContinue() {

	document.chronoForm.startstop.value = "Pause";
	document.chronoForm.startstop.onclick = chronoStop;
	document.chronoForm.reset.onclick = chronoReset;

	start = new Date() - diff;
	start = new Date(start);
	chrono();
}

function chronoStop() {

	document.chronoForm.startstop.value = "Démarrer";
	document.chronoForm.startstop.onclick = chronoContinue;
	document.chronoForm.reset.onclick = chronoStopReset;
	clearTimeout(timerID);
}

function chronoReset() {

	chronoHtml.innerHTML = "0:00:00:000";
	start = new Date();
	diff = 0;
	tourHtml.innerHTML = "";
	i = 0;
	tourArray = [];
}

function chronoStopReset() {

	chronoHtml.innerHTML = "0:00:00:000";
	document.chronoForm.startstop.onclick = chronoStart;
	diff = 0;
	tourHtml.innerHTML = "";
	i = 0;
	tourArray = [];
}

function memoTours() {

	if (diff === 0) {

		console.log("Le chronomètre n'est pas lancé")
	} else {

		i++;
		if (i === 1) {

			tourHtml.innerHTML = "<tr><td><input type=\"button\" class=\"bouttonTour\" value=\"Tour " + i + "\" onClick=\"rT(this)\"/> : " + resultat + "</tr></td>";
		} else {

			tourHtml.innerHTML += "<tr><td><input type=\"button\" class=\"bouttonTour\" value=\"Tour " + i + "\" onClick=\"rT(this)\"/> : " + resultat + "</tr></td>";
		}

		tourArray.push(diff);
	}
}

function rappelDernierTour() {

	if (tourArray.length === 0) {

		console.log("Il n'y a pas de tour sauvegarder")
	} else {

		document.chronoForm.startstop.value = "Pause";
		document.chronoForm.startstop.onclick = chronoStop;
		document.chronoForm.reset.onclick = chronoReset;

		clearTimeout(timerID);

		start = new Date() - tourArray[tourArray.length - 1];

		chrono();
	}
}

function efface() {

	if (tourArray.length === 0) {

		console.log("Il n'y a pas de tour sauvegarder")
	} else {

		tourArray.pop();
		tourHtml.removeChild(tourHtml.lastElementChild);
	}
}

function rT(choisirTour) {

	document.chronoForm.startstop.value = "Pause";
	document.chronoForm.startstop.onclick = chronoStop;
	document.chronoForm.reset.onclick = chronoReset;

	clearTimeout(timerID);

	start = new Date() - tourArray[choisirTour.value.match(regNbr) - 1];

	chrono();
}
