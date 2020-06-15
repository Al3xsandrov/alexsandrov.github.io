window.radio = '0';
window.lang = 'en';
window.useDigits = 0;

const languages = {
    en: {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
        s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    },
    ru: {
        а: 1, б: 2, в: 3, г: 4, д: 5, е: 6, ё: 7, ж: 8, з: 9,
        и: 1, й: 2, к: 3, л: 4, м: 5, н: 6, о: 7, п: 8, р: 9,
        с: 1, у: 2, ф: 3, х: 4, ц: 5, ч: 6, ш: 7, щ: 8,
        ъ: 1, ы: 2, ь: 3, э: 4, ю: 5, я: 6
    },
    sp: {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
        j: 1, k: 2, l: 3, m: 4, n: 5, ñ: 6, o: 7, p: 8, q: 9,
        r: 1, s: 2, t: 3, u: 4, v: 5, w: 6, x: 7, y: 8, z: 9,
        á: 1, í: 9, é: 5, ó: 7, ú: 4
    },
    eu: {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, 
        j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
        s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
        ä: 1, å: 1, ü: 2, ö: 6
    },
}

const reg = {
    allCharDig: /[^абвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789abcdefghijklmnopqrstuvwxyzäåüöñáíéóú]/gmi,
    onlyLetters: /[0123456789\s_{}!@#$%^&*()-+='"|.,?¿]/gmi,
    onlyDigits: /[^0123456789]/gmi,
    onlyConson: /[^бвгджзйклмнпрстфхцчшщъьbcdfghjklmnpqrstvwxzñ]/gmi,         // согласные
    onlyVowel: /[^аеёиоуыэюяaeiouyäåüöáíéóú]/gmi,                             // гласные
    getRegEx: function(i) {
        switch (i) {
            case '0':
                return this.allCharDig;
                break;
            case '1':
                return this.onlyLetters;
                break;
            case '2':
                return this.onlyDigits;
                break;
            case '3':
                return this.onlyConson;
                break;
            case '4':
                return this.onlyVowel;
                break;
        }
    }
}

const querSum = {
    querResult: function(num) {
        let arr = new String(num).split('');
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            result += Number(arr[i]);
        }
        return String(result);
    },
    stringQuersumme: function(value) {
        const strArr = value.replace(reg.getRegEx('1'), '').toLowerCase().split('');
        if (strArr.length === 0) {
            errorHandler.emptyArr() ;
            return undefined;
        }
        const arr = [];
        for (let i = 0; i < strArr.length; i++) {
            let letter = strArr[i];
            if (!languages[lang][letter]) {
                errorHandler.language();
                return undefined;
            }
            let dig = languages[lang][letter];
            arr.push(dig);
        }
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            result += Number(arr[i]);
        }
        return String(result);
    },
    numberQuersumme: function(value) {
        const arr = value.replace(reg.getRegEx('2'), '').split('');
        let res = 0;
        for (let i = 0; i < arr.length; i++) {
            res += Number(arr[i]);
        }
        document.getElementById('result').innerHTML = 'check input value';
        return String(res);
    },
    strNumQuersumme: function(value) {
        let str = 0;
        const strLen = value.replace(reg.getRegEx('1'), '').length;
        if (strLen !== 0) str = Number(this.stringQuersumme(value)) || 0;
        const num = Number(this.numberQuersumme(value)); 
        return String(str + num);
    },
    consonantQuersumme: function(value) {
        const strArr = value.replace(reg.getRegEx('3'), '').toLowerCase().split('');
        const arr = [];
        for (let i = 0; i < strArr.length; i++) {
            let letter = strArr[i];
            if (!languages[lang][letter]) {
                errorHandler.language();
                return undefined;
            }
            let dig = languages[lang][letter];
            arr.push(dig);
        }
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            result += Number(arr[i]);
        }
        if (result == 0) errorHandler.emptyConsonant();
        return String(result);
    },
    vowelQuersumme: function(value) {
        const strArr = value.replace(reg.getRegEx('4'), '').toLowerCase().split('');
        const arr = [];
        for (let i = 0; i < strArr.length; i++) {
            let letter = strArr[i];
            if (!languages[lang][letter]) {
                errorHandler.language();
                return undefined;
            }
            let dig = languages[lang][letter];
            arr.push(dig);
        }
        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            result += Number(arr[i]);
        }
        if (result == 0) errorHandler.emptyVowel();
        return String(result);
    },
    numVowelQuersumme: function(value) {
        const str = Number(this.vowelQuersumme(value)) || 0;
        const num = Number(this.numberQuersumme(value)); 
        return String(str + num);
    },
    numConsonantQuersumme: function(value) {
        const str = Number(this.consonantQuersumme(value)) || 0;
        const num = Number(this.numberQuersumme(value)); 
        return String(str + num);
    },
    getQuerSum: function(value) {
        switch (window.radio) {
            case '0':
                return this.strNumQuersumme(value);
                break;
            case '1':
                return this.stringQuersumme(value);
                break;
            case '2':
                return this.numberQuersumme(value);
                break;
            case '3':
                if (window.useDigits == 1) {
                    return this.numConsonantQuersumme(value);
                    break;
                }
                return this.consonantQuersumme(value);
                break;
            case '4':
                if (window.useDigits == 1) {
                    return this.numVowelQuersumme(value);
                    break;
                }
                return this.vowelQuersumme(value);
                break;
        }
    }

}



function сalculate() {
    const elem = document.getElementById('calcInput');
    if (getStrLength(elem.value)) {
        errorHandler.length();
        return;
    }

    let quersumme = querSum.getQuerSum(elem.value) || 0;
    if (quersumme == 0) {
        return;
    }
    let res = quersumme;

    while (String(quersumme).length > 1) {
        quersumme = querSum.querResult(quersumme);
        res += ` → ${quersumme}`;
    }

    const result = document.getElementById('result');
    result.innerHTML = res;
    
}


function getStrLength(str) {
    return str.length >= 200;
}

function setRadio() {
    window.radio = document.querySelector('input[name="check"]:checked').value;
    const checkBox = document.querySelector('input[name="digit"]');
    if (radio == '3' || radio == '4') {
        checkBox.disabled = false;
    } else {
        checkBox.disabled = true;
        checkBox.checked = false;
    }
}

function setCheckBox() {
    const elem = document.querySelector('input[name="digit"]');
    window.useDigits = (elem.checked) ? 1 : 0;
}


function chooseLang(elem) {
    window.lang = elem.options[elem.selectedIndex].value  
}

const errorHandler = {
    errorConstructor: function(str) {
        let message = '';
        switch (str) {
            case 'LanguageError':
                message = '*check the keyboard layout';
                break;
            case 'lengthError':
                message = '*you entered more than 200 characters';
                break;
            case 'emptyArr':
                message = '*check your input';
                break;
            case 'emptyConsonant':
                message = '*there are no consonantal letters';
                break;
            case 'emptyVowel':
                message = '*there are no vowels letters';
                break;
            default:
                message = '*something goes wrong';
                break;
        }
        if (document.getElementsByClassName('error').length === 0) {
            let error = document.createElement('label');
            error.htmlFor = 'calcInput';
            error.classList.add('error');
            error.innerHTML = message;
            error.style.color = 'red';
            calcInput.after(error);
            window.setTimeout(function () {
                    error.remove();
                }, 3000);
         }
         return;
    },
    language: function() {
        this.errorConstructor('LanguageError');
    },
    length: function() {
        this.errorConstructor('lengthError');
    },
    emptyArr: function() {
        this.errorConstructor('emptyArr');
    },
    emptyConsonant: function() {
        this.errorConstructor('emptyConsonant');
    },
    emptyVowel: function() {
        this.errorConstructor('emptyVowel');
    },
}
