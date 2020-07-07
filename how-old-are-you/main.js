if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js', { scope: './' })
}

function saveDate() {
	document.getElementById("change").style.display = "block";
	document.getElementById("answer").style.display = "block";
	document.getElementById("input").style.display = "none";
	localStorage.setItem("date", document.getElementById("date").value);
	fillAnswer();
}

function showDateInput() {
	document.getElementById("change").style.display = "none";
	document.getElementById("answer").style.display = "none";
	document.getElementById("input").style.display = "block";
}

function fillAnswer() {
	var date = localStorage.getItem("date");
	if (!date) {
		showDateInput();
		return;
	}

	document.getElementById("change").style.display = "block";
	document.getElementById("answer").style.display = "block";
	document.getElementById("input").style.display = "none";

	document.getElementById("date").value = date;

	var period = new Date(Date.now() - new Date(date));
	y = period.getFullYear() - 1970;
	m = period.getMonth();
	d = period.getDay();

	document.getElementById("answerYear").innerText =
		"Вам " + y;
	document.getElementById("answerEtc").innerText =
		m + " месяц(а/ев) и " + d + " д(ня/ней/ень)";
}
fillAnswer();
