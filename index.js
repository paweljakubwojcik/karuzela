
let interval = 4000;
let intervalId;

let pictures = [];
let index = 0

const image = document.querySelector('.image')
const background = document.querySelector('.background')
const container = document.querySelector('.container')


fetch(`https://cms-strapi-weronika-wojcik.herokuapp.com/folders`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(folder => {
            let sources = folder.Pics.map(pic => `https://cms-strapi-weronika-wojcik.herokuapp.com${pic.url}`)
            pictures = pictures.concat(sources)
            console.log(pictures)

        });

        intervalId = setInterval(changeBackgrounds, interval)

        image.addEventListener('load', () => {
            let oldBackgrounds = document.querySelectorAll('.background--old')
            oldBackgrounds.forEach(oldBackground => {
                oldBackground.style.opacity = '0'
            })
        })
    })
    .catch(err => console.log(err));




const changeBackgrounds = () => {

    let oldBackgrounds = container.querySelectorAll('.background')
    oldBackgrounds.forEach(oldBackground => {
        oldBackground.classList.add('background--old')
        oldBackground.addEventListener('transitionend', () => {
            oldBackground.remove()
        })
    })


    let newBackground = document.createElement('div')
    newBackground.classList.add('background')
    newBackground.style.backgroundImage = `URL(${new URL(pictures[index]).href})`
    container.appendChild(newBackground)

    image.src = pictures[index]

    index = Math.floor(Math.random() * pictures.length);
}


const intervalControls = document.querySelectorAll('.intervalControl__control')
intervalControls.forEach(intervalControl => {
    intervalControl.addEventListener('change', () => {

        if (intervalControl.checked) {
            clearInterval(intervalId)
            interval = intervalControl.value
            console.log(interval)
            intervalId = setInterval(changeBackgrounds, interval)
        }
    })
})


let optionButton = document.querySelector('.options__button')
let optionsList = document.querySelector('.options__list')
optionButton.addEventListener('click', () => {
    optionsList.classList.toggle('hidden')
})
