//selection d'éléments html
const nameError = document.querySelector('#nameError');
const emailError = document.querySelector('#emailError');
const inputNom = document.querySelector('#nom');
const inputEmail = document.querySelector('#email');
const mainDisplay = document.querySelector('#mainDisplay');
const questionDisplay = document.querySelector('#questionsFrame');
const questionTitle = document.querySelector('.title-question');
const questionCount = document.querySelector('.question-count');
const btnQuitter = document.querySelector("#quit");
const btnNext = document.querySelector("#next");
const timer = document.querySelector(".timer");
const radioConteneur = document.querySelector('.radio-container');
const progressDiv = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progressBar");
const score = document.querySelector(".scores");
const resultName = document.querySelector(".result-name");
const resultMail = document.querySelector(".result-mail");
const displayResult = document.querySelector(".display-result");
const resultImage = document.querySelector(".successOrFailed");
const resultButton = document.querySelector("#btn-accueil");
btnNext.disabled=true;

let interval = null; //création de la variable intervalle pour ma fonction timer
const minute = 59; //création et initialisation du debut du timer
let i = 0; //création de mon d'indice pour les parcours des tableaux
let scores = 0;//ma variable de calcul des scores

//validation des champs nom et email
function nameValidate() { //fonction de la validation du nom
    if (!nom.trim() || nom.trim().length < 2) {
        if (!nom.trim()) {
            nameError.innerText = "N’oubliez pas de renseigner votre nom avant de commencer le Quiz.";
        } else {
            nameError.innerText = "Votre nom doit contenir au moins 2 caractères";
        }
        nameError.classList.add("redColor");
        inputNom.classList.add("redBorder");
    } else {
        nameError.innerText = "";
        inputNom.classList.remove("redBorder");
    }
}
function emailValidate() {//fonction de la validation de l'email
    if (!mail.trim() || !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))) {
        if (!mail) {
            emailError.innerText = "N’oubliez pas de renseigner votre Email avant de commencer le Quiz.";
        } else {
            emailError.innerText = "Ecrivez un Email valide";
        }
        emailError.classList.add("redColor");
        inputEmail.classList.add("redBorder");
    } else {
        emailError.innerText = "";
        inputEmail.classList.remove("redBorder");
    }
}
//ma fonction qui appelle les deux validations
function allValidation() {
    nameValidate();
    emailValidate();
}
//fonction de changement des couleurs au cas où le bouton est activé ou desactivé
function btnColor() {
    if (btnNext.disabled === true) {
        btnNext.style.backgroundColor = "rgba(2, 138, 61, 0.42)";
    } else {
        btnNext.style.backgroundColor = "rgba(2, 138, 61, 1)";
    }
}
//on écoute l'événément de soumission du formulaire
mainDisplay.addEventListener('submit', function (e) {
    e.preventDefault();
    nom = document.querySelector("#nom").value;
    mail = document.querySelector("#email").value;
    if (nom.trim() && mail.trim() && nom.trim().length >= 2 && /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
        showContent(); //si toutes les conditions sont bonnes on affiche la page suivante questions et réponses à choix multiple
    } else {
        allValidation(); //sinon on fait appel à la validation
    }
});


//création et initialisation des tableaux représentants les questionnaires et reponses du jeu
const questions = ["Quel est le type d'un fichier javascript ?",
                   "Comment afficher le message 'Hello World' à l'écran ?", 
                   "Laquelle de ces syntaxes est correcte ?",
                   "Quelle syntaxe est valide pour sélectionner les classes dans le DOM?",
                   "Quelle méthode n'existe pas dans le DOM ?",
                   "Laquelle de ces propositions est un nom de variable valide en JavaScript ?",
                   "Comment passer à l'itération suivante dans une boucle for() ?",
                   "var iNum = 12; iNum %= 2; A la suite de cette expression, combien vaut iNum ?",
                   "Quelle méthode permet de comparer deux chaînes texte ?",
                   "Quel opérateur est utilisé pour concaténer des chaînes de caractères ? ",
                   "Qu'affiche String.fromCharCode(65) ?",
                   "Pour tester de nombreuses conditions sur la même variable on utilise :",
                   "Comment supprimer les espaces en début et fin de la chaîne ch1 ?",
                   "Comment mettre un commentaire sur plusieurs lignes ?",
                   "Que fais T1.push(3) sur le tableau T1 ?"
                ];
const replies = [[".ts", ".jsx", ".js", ".j"], 
                 ["msg('Hello World');", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"], 
                 ["if (a != 2) {}", "if a != 2 {}", "if (a <> 2) {}", "if a <> 2 {}"],
                 ["document.getElementByclass", "document.ElementByCLASS", "document.getElementByclassName", "document.getElementBylistClass"],
                 ["document.getElementsByClassName", "document.getElementsByTagName", "document.getElementsByAttribute", "document.getElementById"],
                 ["nom", "2a", "NaN", ",b"],
                 ["continue", "break", "next", "return"],
                 ["6", "14", "0.12", "0"],
                 ["charAt()", "charCodeAt()", "indexOf()", "localeCompare()"],
                 ["add()", "+", "&", "."],
                 ["true", '1', "A", "erreur"],
                 ["switch()", "if()", "while()", "for()"],
                 ["supprespaces(ch1)", "ch1.trim()", "trim(ch1)", "ch1.supprespaces()"],
                 ["// //", "\\ \\", "/* */", "<!-- -->"],
                 ["retire les 3 derniers éléments", "décale tous les indices de 3 positions", "ajoute l'élément 3", "retire l'élément en 3ème position"]
                ];

const goodReplies = [".js", "alert('Hello World');", "if (a != 2) {}", "document.getElementByclassName","document.getElementsByAttribute", "nom", "continue", "0", "localeCompare()", "+", 'A', "switch()", "ch1.trim()","/* */", "ajoute l'élément 3"];
//fonction de temps qui permet de repondre dans le 60secondes 
function timerCount(duration, display) {
    clearInterval(interval)
    let timer = duration, seconds
    interval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            timer = duration;
            clearInterval(interval)
            btnNext.disabled = false;
            btnNext.click();   
        }
    }, 1000);
}
//la fonction d'affichage des questions
function questionsContent() {
    questionTitle.textContent = questions[i];
    questionCount.textContent = `Question ${i + 1}/${questions.length}`;
    timerCount(minute, timer);
}
//la fonction d'affichage de la prémière occurence des réponses à choix multiple
function answersContent() {
    btnColor();
    replies[i].forEach(function (answer) {
        const radiosInput = document.createElement("input");
        radiosInput.setAttribute("type", "radio");
        radiosInput.setAttribute("name", "answer");
        const radioDiv = document.createElement("div");
        radioDiv.addEventListener("click", function () {
            radiosInput.click();
            btnNext.disabled = false;
            btnColor();
        });
        radioDiv.setAttribute("class", "radio-answers");
        const labelTitle = document.createElement("label");
        labelTitle.classList.add("answer-label");
        radiosInput.setAttribute("value", answer);
        labelTitle.textContent = answer;
        radioDiv.appendChild(radiosInput);
        radioDiv.appendChild(labelTitle);
        radioConteneur.append(radioDiv);
    })
}
//fonction pour les questions suivantes
function nextQuestionsContent() {
    i++;
    if (i < replies.length) {
        btnNext.disabled = true;
        btnColor();
        questionsContent();
        replies[i].forEach(function () {
            labelTitle = document.querySelectorAll(".answer-label");
            radiosInput = document.querySelectorAll("[type='radio']");
            for (let j = 0; j < labelTitle.length; j++) {
                labelTitle[j].textContent = replies[i][j];
                radiosInput[j].setAttribute("value", replies[i][j]);
            }
        })
        if (i == replies.length - 1) {
            btnNext.textContent = "Terminer";
        }
    } else {
        showResult(nom, mail);
    }
}
//fonction qui affiche la page des questions et réponses
function showContent() {
    mainDisplay.style.display = "none";
    questionDisplay.style.display = "block";
    if (i < questions.length) {
        questionsContent();
        answersContent();
        btnNext.disabled = true;
    }
}
//fonction qui vérifie si on choisit la réponse si la réponse est bonne , on sauvegarde le score
function checkedAnswer() {
    let inputChecked = document.querySelector('input[name="answer"]:checked');
    if (inputChecked) {
    if (inputChecked.value == goodReplies[i]) {
        scores++;
    }   
    } else {
      scores=scores;  
    }
}
//fonction d'affichage des résultats 
function showResult(name, mail) {
    score.textContent = `${scores}/${questions.length}`;
    resultName.textContent = name;
    resultMail.textContent = mail;
    questionDisplay.style.display = "none";
    displayResult.style.display = "block";
    if (scores >= replies.length / 2) {
        resultImage.innerHTML = `<i class="fa-regular fa-circle-check">`;
    } else {
        resultImage.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
    }
    
}

//les événéments de mes boutons
btnNext.addEventListener("click", function (e) {
    e.preventDefault();
    progressBar.remove();
    progressDiv.appendChild(progressBar);
    timerCount(minute, timer);
    checkedAnswer();
    nextQuestionsContent();
    questionDisplay.reset();
});
btnQuitter.addEventListener("click", function (e) {
    e.preventDefault();
    showResult(nom, mail);
});
resultButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
});
