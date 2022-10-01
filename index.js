class ViewData {
    number = 0;
    correct = 0;
    guestAnsw = [];
    answers = [];
    container = document.querySelector(".container");

    all() {
        this.saveCorrectAnswers();        
        this.showQuestionNumbers();
        this.checkAnswers();
    }

    showQuestionNumbers() {
        let numbBlock = document.querySelector(".numberContainer");
        for (let i = 0; i < data.length; i++)
            numbBlock.innerHTML += `<div class="number" data-n="n${i}">${i + 1}</div>`;

        this.showQuestion(this.number);

        document.querySelectorAll(".number").forEach(el => {
            el.addEventListener("click", (e) => {
                this.number = e.target.textContent - 1;
                this.showQuestion(this.number);
            });
        })
    }

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

        if (this.guestAnsw[numb]) {
            const checkedInp = document.querySelector(`input[value=${this.guestAnsw[numb]}]`)
            checkedInp.setAttribute("checked", true);
        }

        const btnSubmit = document.querySelector("#submit");
        btnSubmit.style.display = "inline"
        
        this.setBtn(this.number);
    }

    saveCorrectAnswers() {
        for (const questn of data) {
            for (const vars of questn.variants) {
                if (vars.answer == true)
                    this.answers.push(vars.letter);
            }
        }
    }

    checkAnswers() {
        const btnSubmit = document.querySelector("#submit");
        const result = document.querySelector(".result");

        btnSubmit.addEventListener("click", () => {
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