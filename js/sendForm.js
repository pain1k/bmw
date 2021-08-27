const server = 'https://jsonplaceholder.typicode.com/posts'

const sendData = (data, callback, falseCallBack) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200 || request.status === 201) {
            const response = JSON.parse(request.responseText);
            //            console.log(request.responseText)
            callback(response.id);
        } else {
            falseCallBack(request.status)
            throw new Error(request.status)
        }
    });

    request.send(data)
};

//const dataTest = {
//    name:'Nikita',
//    phone:'+792229993344',
//};
//


const formElems = document.querySelectorAll('.form');

const formHandler = (form) => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {};
        for (const {
                name,
                value
            } of form.elements) {
            if (name) {
                data[name] = value;
            }
        }

        const smallElem = document.createElement('small');


        sendData(JSON.stringify(data),
            (id) => {
                smallElem.innerHTML = 'Ваша заявка №' + id + '!<br>В ближайшее время с вами свяжемся!';
                smallElem.style.color = 'green';
                form.append(smallElem);
                const disableButton = () => {
                    document.querySelector("[data-brackets-id='1801']").disabled = true;
                }
                const enableButton = () => {
                    document.querySelector("[data-brackets-id='1801']").disabled = false;
                }
                disableButton();
                
                setTimeout("document.getElementsByTagName('small')[0].remove()",5000)
                setTimeout(enableButton,5000)
            },
            (err) => {
                smallElem.textContent = 'К сожалению, технические неполадки, попробуйте отправить заявку позже';
                smallElem.style.color = 'red';
                form.append(smallElem);
            });

        form.reset();
    })
};

formElems.forEach(formHandler)
