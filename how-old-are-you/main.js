if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: './'})
}

function saveDate() {
    let v =
        document.getElementById("day").value + "-" +
        document.getElementById("month").value + "-" +
        document.getElementById("year").value;
    localStorage.setItem("date", v);
    fillAnswer();
}

function showDateInput() {
    document.getElementById("answer-change").style.display = "none";
    document.getElementById("answer").style.display = "none";
    document.getElementById("input").style.display = "flex";
    document.getElementById("input-label").style.display = "flex";
    document.getElementById("input-save").style.display = "flex";
}

function fillAnswer() {
    let date = localStorage.getItem("date");
    if (!date) {
        showDateInput();
        return;
    }

    document.getElementById("answer-change").style.display = "flex";
    document.getElementById("answer").style.display = "flex";
    document.getElementById("input").style.display = "none";
    document.getElementById("input-label").style.display = "none";
    document.getElementById("input-save").style.display = "none";

    date = date.split("-");
    document.getElementById("day").value = date[0];
    document.getElementById("month").value = date[1];
    document.getElementById("year").value = date[2];

    let now = new Date();
    let y = now.getFullYear() - date[2];
    let m = (now.getMonth() + 1) - date[1];
    if (m < 0) {
        m += 12;
        y -= 1;
    }
    let d = now.getDate() - date[0];
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

function share() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(function () {
        console.log('Copying to clipboard was successful, text: ' + url);
        UIkit.notification("Ссылка скопирована в буфер обмена");
    }, function (e) {
        console.error('Could not copy text: ', e);
        UIkit.notification("Ошибка копирования в буфер обмена, ссылка: " + url);
    });
}

fillAnswer();
