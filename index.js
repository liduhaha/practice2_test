class ViewData {
    number = 0;     //номер питання
    correct = 0;    //к-ть правильних відповідей
    guestAnsw = []; //відповіді користувача
    answers = [];   //правильні відповіді
    container = document.querySelector(".container");

    //запуск методів у потрібній послідовності
    all() {
        this.saveCorrectAnswers();        
        this.showQuestionNumbers();
        this.checkAnswers();
    }

    //створює і заповнює блок з номерами питань
    showQuestionNumbers() {
        let numbBlock = document.querySelector(".numberContainer");
        for (let i = 0; i < data.length; i++)
            numbBlock.innerHTML += `<div class="number" data-n="n${i}">${i + 1}</div>`;

        this.showQuestion(this.number); // перше питання буде автоматично показуватись коли ще не натиснув на номери питань

        document.querySelectorAll(".number").forEach(el => {
            el.addEventListener("click", (e) => {
                this.number = e.target.textContent - 1;
                this.showQuestion(this.number);
            });
        })
    }

    // Вивід питання
    showQuestion(numb) {
        this.container.innerHTML = '';
        this.container.innerHTML += `<div class="questionText">${numb+1}. ${data[numb]["question"]}</div>`

        for (const iterator of data[numb]["variants"]) {
            this.container.innerHTML += `<label>
                                    <input type="radio" name="numb${numb}" value=${iterator["letter"]}>${iterator["text"]}
                                    </label><br>`;
        }

        this.container.innerHTML += `<button type="button" id="btnSave">Зберегти відповідь</button>`;
        this.container.innerHTML += `<button type="button" id="btnLater">Відповісти пізніше</button>`;

        // Збереження обраного варіанту
        if (this.guestAnsw[numb]) {
            const checkedInp = document.querySelector(`input[value=${this.guestAnsw[numb]}]`)
            checkedInp.setAttribute("checked", true);
        }

        const btnSubmit = document.querySelector("#submit");
        btnSubmit.style.display = "inline"
        
        this.setBtn(this.number);
    }

    //записуємо правильні відповідь з масиву даних
    saveCorrectAnswers() {
        for (const questn of data) {
            for (const vars of questn.variants) {
                if (vars.answer == true)
                    this.answers.push(vars.letter);
            }
        }
    }

    //перевіряємо тест, порівнюючи два масива
    checkAnswers() {
        const btnSubmit = document.querySelector("#submit");
        const result = document.querySelector(".result");

        btnSubmit.addEventListener("click", () => {
            
            // Записуємо відповіді користувача у масив під відповідним індексом
            for (let i = 0; i < this.answers.length; i++) {
                if (this.guestAnsw[i] == this.answers[i]) this.correct++;
            }

            let percent = parseInt(this.correct * 100 / this.answers.length);
            result.innerHTML = '';
            if (percent >= 70) {
                result.setAttribute("id", "passed");
                result.innerHTML += `Правильних відповідей: ${this.correct} / ${percent}%<br> Тест пройдено`;
            } else {
                result.setAttribute("id", "failed");
                result.innerHTML += `Правильних відповідей: ${this.correct} / ${percent}%<br> Тест не пройдено`;
            }
        })
    }

    // Встановлення подій на кнопки "Зберегти відповідь" та "Відповісти пізніше"
    setBtn(numb) {
        const nBlock = document.querySelector(`[data-n="n${numb}"]`);
        const btnSave = document.getElementById("btnSave");
        const btnLater = document.getElementById("btnLater");

        btnSave.addEventListener("click", () => {
            const input = document.querySelector("input:checked");
            if (input == null) {
                alert("Оберіть відповідь");
            } else if (input.value) {
                this.guestAnsw[numb] = input.value;
                nBlock.style.backgroundColor = "#debfb7";
                nBlock.style.color = "black";
                nBlock.style.outline = "2px solid #b9a5a5";
            } 
        })

        btnLater.addEventListener("click", () => {
            nBlock.style.backgroundColor = "grey"
        })
    }
}
