if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: './'})
}

function saveDate() {
    document.getElementById("change").style.display = "block";
    document.getElementById("answer").style.display = "block";
    document.getElementById("input").style.display = "none";
    var v = document.getElementById("day").value + "-" +
        document.getElementById("month").value + "-" +
        document.getElementById("year").value;
    localStorage.setItem("date", v);
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

    date = date.split("-");
    document.getElementById("day").value = date[0];
    document.getElementById("month").value = date[1];
    document.getElementById("year").value = date[2];

    var now = new Date();
    y = now.getFullYear() - date[2];
    m = (now.getMonth() + 1) - date[1];
    if (m < 0) {
        m += 12;
        y -= 1;
    }
    d = now.getDate() - date[0];
    if (d < 0) {
        m -= 1;
    }
	if (m < 0) {
		m += 12;
		y -= 1;
	}

    document.getElementById("answerYear").innerText =
        "Вам " + y;
    document.getElementById("answerEtc").innerText =
    	"и " + m + " месяц(а/ев)";
    // 	m + " месяц(а/ев) и " + d + " д(ня/ней/ень)";
}

fillAnswer();
