const weatherform = document.querySelector('form')
const search = document.querySelector('form input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')



weatherform.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) { 
                messageOne.textContent = data.error;
                return messageTwo.textContent = '';
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast;
        })
    })
})