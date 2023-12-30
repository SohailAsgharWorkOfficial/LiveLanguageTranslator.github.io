document.addEventListener('DOMContentLoaded', function () {
    let langOptions = document.querySelectorAll('select');
    let fromText = document.querySelector('.fromtext');
    let transText = document.querySelector('.toTranslate');
    let fromVoice = document.querySelector('.from');
    let toVoice = document.querySelector('.to');
    let copyBtn = document.querySelector('.bx-copy');
    let countValue = document.querySelector('.code_length');
    let exchangeLang = document.querySelector('.bx-transfer');

    // Sample language object for demonstration
    const languages = {
        "la-VA": "Latin",
        "fr-FR": "French",
        "tr-TR": "Turkish",
        "bn-IN": "Bengali",
        "am-ET": "Amharic",
        "ar-SA": "Arabic",
        "be-BY": "Bielarus",
        "bem-ZM": "Bemba",
        "bi-VU": "Bislama",
        "bjs-BB": "Bajan",
        "bo-CN": "Tibetan",
        "br-FR": "Breton",
        "bs-BA": "Bosnian",
        "ca-ES": "Catalan",
        "cop-EG": "Coptic",
        "cs-CZ": "Czech",
        "cy-GB": "Welsh",
        "da-DK": "Danish",
        "dz-BT": "Dzongkha",
        "de-DE": "German",
        "dv-MV": "Maldivian",
        "el-GR": "Greek",
        "en-GB": "English",
        "es-ES": "Spanish",
        "et-EE": "Estonian",
        "eu-ES": "Basque",
        "fa-IR": "Persian",
        "fi-FI": "Finnish",
        "fn-FNG": "Fanagalo",
        "fo-FO": "Faroese",
        "gl-ES": "Galician",
        "gu-IN": "Gujarati",
        "ha-NE": "Hausa",
        "he-IL": "Hebrew",
        "hi-IN": "Hindi",
        "hr-HR": "Croatian",
        "hu-HU": "Hungarian",
        "id-ID": "Indonesian",
        "is-IS": "Icelandic",
        "it-IT": "Italian",
        "ja-JP": "Japanese",
        "kk-KZ": "Kazakh",
        "km-KM": "Khmer",
        "kn-IN": "Kannada",
        "ko-KR": "Korean",
        "ku-TR": "Kurdish",
        "ky-KG": "Kyrgyz",
        "lo-LA": "Lao",
        "lv-LV": "Latvian",
        "men-SL": "Mende",
        "mg-MG": "Malagasy",
        "mi-NZ": "Maori",
        "ms-MY": "Malay",
        "mt-MT": "Maltese",
        "my-MM": "Burmese",
        "ne-NP": "Nepali",
        "niu-NU": "Niuean",
        "nl-NL": "Dutch",
        "no-NO": "Norwegian",
        "ny-MW": "Nyanja",
        "ur-PK": "Pakistani",
        "pau-PW": "Palauan",
        "pa-IN": "Panjabi",
        "ps-PK": "Pashto",
        "pis-SB": "Pijin",
        "pl-PL": "Polish",
        "pt-PT": "Portuguese",
        "rn-BI": "Kirundi",
        "ro-RO": "Romanian",
        "ru-RU": "Russian",
        "sg-CF": "Sango",
        "si-LK": "Sinhala",
        "sk-SK": "Slovak",
        "sm-WS": "Samoan",
        "sn-ZW": "Shona",
        "so-SO": "Somali",
        "sq-AL": "Albanian",
        "sr-RS": "Serbian",
        "sv-SE": "Swedish",
        "sw-SZ": "Swahili",
        "ta-LK": "Tamil",
        "te-IN": "Telugu",
        "tet-TL": "Tetum",
        "tg-TJ": "Tajik",
        "th-TH": "Thai",
        "ti-TI": "Tigrinya",
        "tk-TM": "Turkmen",
        "tl-PH": "Tagalog",
        "tn-BW": "Tswana",
        "to-TO": "Tongan",
        "uk-UA": "Ukrainian",
        "uz-UZ": "Uzbek",
        "vi-VN": "Vietnamese",
        "wo-SN": "Wolof",
        "xh-ZA": "Xhosa",
        "yi-YD": "Yiddish",
        "zu-ZA": "Zulu"
        // Add more languages as needed
    };

    langOptions.forEach((select, index) => {
        for (let code in languages) {
            let selected = index === 0 && code === "en-GB" ? "selected" : "";
            let option = `<option value="${code}" ${selected}>${languages[code]}</option>`;
            select.insertAdjacentHTML('beforeend', option);
        }
    });

    fromText.addEventListener('input', function () {
        let content = fromText.value;
        let fromContent = langOptions[0].value;
        let transContent = langOptions[1].value;

        let transLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

        fetch(transLink)
            .then(response => response.json())
            .then(data => {
                transText.value = data.responseData.translatedText;
            });
    });

    fromVoice.addEventListener('click', function () {
        let fromTalk = new SpeechSynthesisUtterance(fromText.value);
        fromTalk.lang = langOptions[0].value;
        speechSynthesis.speak(fromTalk);
    });

    toVoice.addEventListener('click', function () {
        let toTalk = new SpeechSynthesisUtterance(transText.value);
        toTalk.lang = langOptions[1].value;
        speechSynthesis.speak(toTalk);
    });

    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(transText.value);
    });

    fromText.addEventListener('keyup', function () {
        countValue.innerHTML = `${fromText.value.length}/5,000`;
    });

    exchangeLang.addEventListener('click', function () {
        let tempText = fromText.value;
        fromText.value = transText.value;
        transText.value = tempText;

        let tempOpt = langOptions[0].value;
        langOptions[0].value = langOptions[1].value;
        langOptions[1].value = tempOpt;
    });
});
