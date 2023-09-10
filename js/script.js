//?/* HTML Element Selected Area Start */
let carousel = document.getElementById('mySlide')
let navbar = document.getElementById('navbar')
let special = document.querySelectorAll('.special')
let scrollAnimation = document.querySelectorAll('.scrollAnimation')

// Form elements connect
let myForm = document.getElementById('myForm')
let fname = document.getElementById('name')
let femail = document.getElementById('email')
let fphone = document.getElementById('phone')
let fmessage = document.getElementById('message')
let ErrName = document.getElementById('ErrName')
let ErrEmail = document.getElementById('ErrEmail')
let ErrPhone = document.getElementById('ErrPhone')
let ErrMessage = document.getElementById('ErrMessage')
let counter = document.getElementById('counter')


//?/*/ HTML Element Selected Area End */



//?/*? Carousel Setting Start*/
const newCarusel = new bootstrap.Carousel(carousel, {
    interval: 15000,
    touch: false
})


//? Navbar Setting Scroll
document.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('active')
    }
    else {
        navbar.classList.remove('active')
    }
})


//? Nav-link not close problem
special.forEach((element) => {
    element.addEventListener('click', () => {
        let closeButton = document.querySelector('[data-bs-target="#nav"]')
        setTimeout(() => {
            closeButton.click()
        }, 200)
    })
})



//? Form Setting Start
myForm.addEventListener('submit', (e) => {
    if (!myForm.checkValidity()) {
        e.preventDefault()
        e.stopPropagation()
    }
})

//* Special callBack function to shorten controls
function characterControl(element, ErrElement, callBack) {
    if (!element instanceof HTMLElement) {
        console.log('bu bir HTML elementidir')
    }
    else {
        let text = element.value
        if (text.length == 0) {
            element.classList.remove('is-valid')
            element.classList.add('is-invalid')
            ErrElement.innerHTML = 'No value entered!'
            return false
        }
        else {
            let allValue = callBack(text)
            let rgxCase = allValue[0], msg = allValue[1]
            if (rgxCase) {
                element.classList.remove('is-valid')
                element.classList.add('is-invalid')
                ErrElement.innerHTML = msg
                return false
            }
            else {
                if (text.length < 5) {
                    element.classList.remove('is-valid')
                    element.classList.add('is-invalid')
                    ErrElement.innerHTML = 'The entered expression must consist of at least 5 characters!'
                    return false
                }
                else {
                    element.classList.remove('is-invalid')
                    element.classList.add('is-valid')
                    ErrElement.innerHTML = ''
                    return true
                }
            }
        }
    }
}

//* Name controlled
function shortCut1() {
    characterControl(fname, ErrName, (text) => {
        let rgx = new RegExp(/[^a-zA-ZçğöşıüÇĞÖŞİÜ ]/, 'g')
        let durum = false, durumMesaj = ''
        if (rgx.test(text)) {
            durum = true
            durumMesaj = 'Your name should contain only letters!'
        }
        else {
            durum = false
        }
        let dizi = [durum, durumMesaj]
        return dizi
    })
}

fname.addEventListener('keyup', shortCut1)
fname.addEventListener('blur', shortCut1)


//* Email controlled
function shortCut2() {
    characterControl(femail, ErrEmail, (text) => {
        let rgx = new RegExp(/[\w]+@gmail\.com/, 'g')
        let durum = false, durumMesaj = ''
        if (!rgx.test(text)) {
            durum = true
            durumMesaj = 'Gmail name is not valid!'
        }
        else {
            durum = false
        }
        let dizi = [durum, durumMesaj]
        return dizi
    })
}
femail.addEventListener('keyup', shortCut2)
femail.addEventListener('blur', shortCut2)


//* Phone Controlled
function shortCut3() {
    characterControl(fphone, ErrPhone, (text) => {
        let rgx = new RegExp(/[^0-9]/, 'g')
        let durum = false, durumMesaj = ''
        if (rgx.test(text)) {
            durum = true
            durumMesaj = 'The phone number must consist of numbers only!'
        }
        else {
            durum = false
        }
        let dizi = [durum, durumMesaj]
        return dizi
    })
}
fphone.addEventListener('keyup', shortCut3)
fphone.addEventListener('blur', shortCut3)



//* Message Controlled
function shortCut4() {
    characterControl(fmessage, ErrMessage, (text) => {
        counter.innerText = `${text.length} / 300`
        let rgx = new RegExp(/[^a-zA-ZçğöşıüÇĞÖŞİÜ0-9_\.\?\!\=\+ \-]/, 'g')
        let durum = false, durumMesaj = ''
        if (rgx.test(text)) {
            durum = true
            durumMesaj = 'Message Field must not contain special characters.!'
        }
        else {
            durum = false
        }
        let dizi = [durum, durumMesaj]
        return dizi
    })

   
}
fmessage.addEventListener('keyup', shortCut4)
fmessage.addEventListener('blur', shortCut4)
//? Form Setting End


//? Scroll Animaton Start
const callBack = (entries) =>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('active')
        }
        else{
            entry.target.classList.remove('active')
        }
    })
}
const options = {
    treshold: 0.5
}

const observer = new IntersectionObserver(callBack, options)
scrollAnimation.forEach((element)=>{
    observer.observe(element)
})