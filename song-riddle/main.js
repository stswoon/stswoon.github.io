async function translate() {
    let text = document.getElementById("from").text;
    text = await restTranslate(text, "ru", "en");
    text = await restTranslate(text, "en", "ru");
    document.getElementById("to").text = text;
}

//https://libretranslate.com/?source=ru&target=en&q=%25D0%259A%25D0%25B0%25D0%25BA%2520%25D0%25B4%25D0%25B5%25D0%25BB%25D0%25B0%3F
async function restTranslate(text, fromLang, toLang) {
    try {
        let res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({ q: text, source: fromLang, target: toLang, format: "text", api_key: "" }),
            headers: { "Content-Type": "application/json" }
        });
        res = await res.json();
    } catch (e) {
        console.error("Fail to translate.", e);
        console.error(e);
        alert("Fail to translate.")
    }
    return res.translatedText;
}

async function read() {
    const text = document.getElementById("to").text;
    const url = restRead(text);
    new Audio(url).play();
}

//also maybe https://cloud.google.com/text-to-speech/docs/voices
//https://ttsmp3.com/text-to-speech/Russian/
async function restRead(text) {
    try {
        const formData = new FormData();
        formData.append('msg', text);
        formData.append('lang', 'Maxim');
        formData.append('source', 'ttsmp3');
        let res = await fetch("https://ttsmp3.com/makemp3_new.php", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        res = await res.json();
    } catch (e) {
        console.error("Fail to read.", e);
        console.error(e);
        alert("Fail to read.")
    }
    return res.URL;
}