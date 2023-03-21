export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Загрузка...',
            success: 'Спасибо! скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так, попробу=уйте снова'
        };
        this.patch = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(item => {
            item.value = '';
        })
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: gray;
                `;
                form.parentNode.appendChild(statusMessage);
                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.patch, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        statusMessage.textContent = this.message.failure;
                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000)
                    })
            })
        });
    }
}