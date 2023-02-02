// navbar
const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navLinks = document.querySelectorAll('.nav__link')

// skills
const skillsContents = document.querySelectorAll('.skills__content')
const skillsHeaders = document.querySelectorAll('.skills__header')

// qualification
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

// services
const servicesBtns = document.querySelectorAll('.services__button')
const modals = document.querySelectorAll('.services__modal')
const modalBtnsClose = document.querySelectorAll('.services__modal-close')

// sections
const sections = document.querySelectorAll('section[id]')

// theme
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// navbar logic
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

function linkAction() {
  navMenu.classList.remove('show-menu')
}

if (navLinks) {
  navLinks.forEach(link => link.addEventListener('click', linkAction))
}

// skills logic
function toggleSkill(skill) {
  if (skill.classList.contains('skills__open')) {
    skill.classList.remove('skills__open')
    skill.classList.add('skills__close')
  } else {
    skill.classList.remove('skills__close')
    skill.classList.add('skills__open')
  }
}

function toggleSkills(e) {
  const skillHeaderSelected = e.currentTarget

  skillsContents.forEach(content => {
    if (content == skillHeaderSelected.parentNode)
      toggleSkill(content)
    else {
      content.classList.remove('skills__open')
      content.classList.add('skills__close')
    }
  })
}

skillsHeaders.forEach(header => header.addEventListener('click', toggleSkills))

// Qualification tabs logic

function changeTab(e) {
  tabs.forEach(tab => tab.classList.remove('qualification__active'))
  const tabSelected = e.currentTarget
  tabSelected.classList.add('qualification__active')

  tabContents.forEach(tabContent => {
    tabContent.classList.remove('qualification__active')
    if (tabContent.id === tabSelected.dataset['tabTarget'])
      tabContent.classList.add('qualification__active')
  })
}

tabs.forEach(tab => tab.addEventListener('click', changeTab))

// Services logic
function showModal(modal) {
  modals[modal].classList.add('active-modal')
}

function hideModal(modal) {
  modals[modal].classList.remove('active-modal')
}

servicesBtns.forEach((serviceBtn, i) => serviceBtn.addEventListener('click', () => { showModal(i) }))
modalBtnsClose.forEach((btnClose, i) => btnClose.addEventListener('click', () => { hideModal(i) }))

// Portfolio swiper logic
const portfolioSwiper = new Swiper(".swiper-container-portfolio", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});


// Testimonial swiper logic
const testimonialSwiper = new Swiper(".swiper-container-testimonial", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    }
  }
});

// Scroll sections active link logic
function scrollActive() {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 50
    const sectionId = section.getAttribute('id')
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
      document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add('active-link')
    else
      document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove('active-link')
  })
}

window.addEventListener('scroll', scrollActive)

// Change background header logic
function scrollHeader(e) {
  const header = document.getElementById('header')
  const { currentTarget } = e

  if (currentTarget.scrollY >= 80) header.classList.add('scroll-header')
  else header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

// scroll up logic
function scrollUp(e) {
  const scrollUp = document.getElementById('scroll-up')
  const { currentTarget } = e
  if (currentTarget.scrollY >= 560) scrollUp.classList.add('show-scroll')
  else scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

// dark / light theme logic
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

function toggleTheme() {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
}

themeButton.addEventListener('click', toggleTheme)