/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () =>{
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TYPED JS ===============*/
const homeTypedEl = document.getElementById('home-typed')

if(homeTypedEl){
   new Typed('#home-typed', {
      strings: [
         'building async APIs...',
         'scaling WhatsApp gateways...',
         'shipping Go microservices...',
         'debugging production at 2am...'
      ],
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 1500,
      startDelay: 400,
      loop: true
   })
}

/*=============== CHANGE HEADER STYLES ===============*/
const header = document.getElementById('header')

const scrollHeader = () =>{
   if(!header) return
   if(window.scrollY >= 80) header.classList.add('scroll-header')
   else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== WORK CARDS MARQUEE ===============*/
const workTrack = document.getElementById('work-track')

if(workTrack){
   const originalCards = Array.from(workTrack.children)

   originalCards.forEach(card =>{
      const clone = card.cloneNode(true)
      clone.setAttribute('aria-hidden', 'true')
      clone.setAttribute('tabindex', '-1')
      workTrack.appendChild(clone)
   })

   const firstClone = workTrack.children[originalCards.length]

   const setMarqueeMetrics = () =>{
      // exact pixel width of one full set (cards + gaps) — not an approximate
      // percentage — so the loop point lines up with zero drift/jump.
      const shift = firstClone.offsetLeft
      const pxPerSecond = 55
      workTrack.style.setProperty('--work-shift', `${shift}px`)
      workTrack.style.setProperty('--work-duration', `${shift / pxPerSecond}s`)
   }

   setMarqueeMetrics()

   let resizeTimeout
   window.addEventListener('resize', () =>{
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(setMarqueeMetrics, 200)
   })
}

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card')

servicesCards.forEach(card =>{
   const header = card.querySelector('.services__card-header')
   header.addEventListener('click', () =>{
      const isOpen = card.classList.contains('services__card-open')

      servicesCards.forEach(c => c.classList.remove('services__card-open'))

      if(!isOpen) card.classList.add('services__card-open')
   })
})

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = document.getElementById('scroll-up')

const showScrollUp = () =>{
   if(!scrollUp) return
   if(window.scrollY >= 400) scrollUp.classList.add('show-scroll')
   else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', showScrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
   const scrollY = window.scrollY

   sections.forEach(current =>{
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 100
      const sectionId = current.getAttribute('id')
      const sectionLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`)

      if(!sectionLink) return

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         sectionLink.classList.add('active-link')
      } else {
         sectionLink.classList.remove('active-link')
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLLREVEAL ANIMATION ===============*/
if(typeof ScrollReveal !== 'undefined'){
   const sr = ScrollReveal({
      origin: 'bottom',
      distance: '2.5rem',
      duration: 800,
      delay: 100,
      reset: false
   })

   sr.reveal('.home__data', { delay: 200 })
   sr.reveal('.home__terminal', { delay: 400, origin: 'right' })
   sr.reveal('.about__data', {})
   sr.reveal('.work__marquee', {})
   sr.reveal('.services__card', { interval: 100 })
   sr.reveal('.skills__group', { interval: 150 })
   sr.reveal('.contact__data, .contact__links', { interval: 100 })
}

/*=============== PYTHON CARD EASTER EGG ===============*/
document.querySelectorAll('.skills__card').forEach(card =>{
   const name = card.querySelector('.skills__name')
   if(!name || name.textContent.trim() !== 'Python') return

   card.classList.add('skills__card--interactive')
   card.setAttribute('role', 'button')
   card.setAttribute('tabindex', '0')
   card.setAttribute('aria-label', 'Python — click for a surprise')

   let playing = false

   const playSnake = () =>{
      if(playing) return
      playing = true

      const cols = 8
      const rows = 5
      const path = []

      for(let r = 0; r < rows; r++){
         if(r % 2 === 0){
            for(let c = 0; c < cols; c++) path.push({ x: c, y: r })
         } else {
            for(let c = cols - 1; c >= 0; c--) path.push({ x: c, y: r })
         }
      }

      const overlay = document.createElement('div')
      overlay.className = 'snake-overlay'
      card.appendChild(overlay)

      const segLength = 5
      const cellW = 100 / cols
      const cellH = 100 / rows
      const segments = []
      let step = 0

      const tick = () =>{
         if(step >= path.length){
            overlay.classList.add('snake-overlay--fade')
            setTimeout(() =>{
               overlay.remove()
               playing = false
            }, 400)
            return
         }

         segments.unshift(path[step])
         if(segments.length > segLength) segments.pop()

         overlay.innerHTML = ''
         segments.forEach((seg, i) =>{
            const dot = document.createElement('span')
            dot.className = 'snake-segment' + (i === 0 ? ' snake-segment--head' : '')
            dot.style.left = `${(seg.x + 0.5) * cellW}%`
            dot.style.top = `${(seg.y + 0.5) * cellH}%`
            overlay.appendChild(dot)
         })

         step++
         setTimeout(tick, 90)
      }

      tick()
   }

   card.addEventListener('click', playSnake)
   card.addEventListener('keydown', e =>{
      if(e.key === 'Enter' || e.key === ' '){
         e.preventDefault()
         playSnake()
      }
   })
})
