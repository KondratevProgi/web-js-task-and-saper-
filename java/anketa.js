const form = document.forms["form"];
const button = form.elements["button"];
const inputArr = Array.from(form);
const validInputArr = [];

inputArr.forEach((elem) => {
    if(elem.hasAttribute("data-reg")) {
        elem.setAttribute("is-valid", "0");
        validInputArr.push(elem);
    }
});


form.addEventListener("input", inputHandler)
button.addEventListener("click",buttonHandler);

function inputHandler({target}) {
    if (target.hasAttribute("data-reg")) {
        inputCheck(target);
    }
}

function inputCheck(elem) {
    const inputValue = elem.value;
    const inputReg = elem.getAttribute("data-reg");
    const reg = new RegExp(inputReg);

    if(reg.test(inputValue)) {
        elem.style.background = "rgb(87,222,9)";
        elem.setAttribute("is-valid", "1");
    }
    else {
        elem.style.background = "rgba(148,3,3,0.94)";
        elem.setAttribute("is-valid","0");
    }
}

function buttonHandler(e) {
    const isAllValid = [];
    validInputArr.forEach((elem) => {
        isAllValid.push(elem.getAttribute("is-valid"));
    });
    const isValid = isAllValid.reduce((acc, current) => {
        return acc && current;
    });
    console.log(isValid);

    if(!Boolean(Number(isValid))) {
        e.preventDefault();
    }
}

var check = function(elem) {
    if (document.getElementById('p1').value ==
        document.getElementById('p2').value) {
        document.getElementById('message').style.background = 'green';
        document.getElementById('message').innerHTML = 'пароль совпал';
        elem.setAttribute("is-valid", "1");
    } else {
        document.getElementById('message').style.background = 'red';
        document.getElementById('message').innerHTML = 'пароль не совпал';
        elem.setAttribute("is-valid", "0");
    }
}
