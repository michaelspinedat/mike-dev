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

tabs.forEach(tab => {
  tab.addEventListener('click', changeTab)
})