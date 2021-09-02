AOS.init();
window.addEventListener('click', e => {
  if (dropdown = document.querySelector('.dropdown-menu.show')) {
    const dropdownToggle = document.querySelector('.dropdown-toggle.show');
    const eventPath = [...e.path];
    if (dropdownToggle)
      if (!eventPath.includes(dropdownToggle) && !eventPath.includes(dropdown)) {
        dropdownToggle.classList.remove('show');
        dropdown.classList.remove('show');
      }
      else
        if (eventPath.includes(dropdown))
          dropdown.classList.remove('show');
  };
})
document.querySelectorAll('.dropdown-toggle').forEach(toggler => toggler.onclick = e => {
  toggler.classList.toggle('show');
  if (toggler.previousElementSibling) toggler.previousElementSibling.classList.toggle('show');
  else if (toggler.nextElementSibling) toggler.nextElementSibling.classList.toggle('show');
});

document.querySelectorAll('.navbar-toggler-custom').forEach(toggler => toggler.onclick = e => {
  toggler.classList.toggle('show');
  toggler.nextElementSibling.classList.toggle('show');
})
document.querySelectorAll('.navbar-toggler-cross').forEach(toggler => toggler.onclick = e => {
  document.querySelector('.navbar-toggler').click();
})

const bannerText = slidr.create('banner-text', {
  breadcrumbs: false,
  controls: 'border',
  direction: 'v',
  fade: false,
  keyboard: true,
  overflow: false,
  pause: true,
  theme: '#000000',
  timing: { 'cube': '0.5s ease-in' },
  touch: true,
  transition: 'cube'
})?.start();

const banner = slidr.create('banner', {
  after: (function (e) {
    const slideNo = e.in.slidr;
    if (slideNo === "3")
      banner.auto(7000, 'left', 3);
    else if (slideNo === "1")
      banner.auto(7000, 'right', 1)
  }),
  before: function (e) {
    if (Number.parseInt(e.in.slidr) > Number.parseInt(e.out.slidr))
      bannerText.slide('down');
    else 
      bannerText.slide('up');
  },
  breadcrumbs: true,
  controls: 'border',
  direction: 'h',
  fade: false,
  keyboard: true,
  overflow: false,
  pause: true,
  theme: '#fff',
  timing: { 'cube': '0.5s ease-in' },
  touch: true,
  transition: 'cube'
})?.auto(7000, 'right', 1);

const review = slidr.create('review',{
  after: (function (e) {
    const slideNo = e.in.slidr;
    if (slideNo === "4")
      review.auto(7000, 'left', 4);
    else if (slideNo === "1")
      review.auto(7000, 'right', 1)
  }),
  breadcrumbs: false,
  controls: 'border',
  direction: 'h',
  fade: false,
  keyboard: true,
  overflow: false,
  pause: true,
  theme: '#fff',
  timing: { 'cube': '0.5s ease-in' },
  touch: true,
  transition: 'cube'
})?.auto();

  // Loop over them and prevent submission
Array.prototype.slice.call(document.querySelectorAll('.needs-custom-validation'))
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('validated');
      document.activeElement.blur();
    }, false)
  })
Array.prototype.slice.call(document.querySelectorAll('.animated-path'))
  .forEach(function (path) {
    const pathLen = path.getTotalLength();
    path.style.setProperty('--dasharray', pathLen);
  })


const menuBookObserver = new IntersectionObserver((entries, observer)=>{
  const menuBookTag = document.getElementsByName('menu-book');
  entries.forEach(e=>{
    if(e.target.id == "book-arrow"){
      if(e.isIntersecting) {
        menuBookTag.forEach(tag => {
          tag.style.opacity = "0";
          tag.style.transform = `translate(${-tag.getBoundingClientRect().right + e.target.getBoundingClientRect().right - e.target.clientWidth / 2}px,${e.target.getBoundingClientRect().bottom}px)`;
        });
      }
      else {
        menuBookTag.forEach(tag=> {
          tag.style.opacity="1";
          tag.style.transform = `translate(0px,0px)`;
        });
      }
    } 
    else if (e.target.id="book-form"){
      if (e.isIntersecting) {
        menuBookTag.forEach(tag => {
          tag.style.opacity = "0";
          tag.style.transform = `translate(${-tag.getBoundingClientRect().right + e.target.getBoundingClientRect().right - e.target.clientWidth / 2}px,${e.target.getBoundingClientRect().bottom}px)`;
        });
      }
      else {
        menuBookTag.forEach(tag => {
          tag.style.opacity = "1";
          tag.style.transform = `translate(0px,0px)`;
        });
      }
    }
  })
}, { rootMargin: `-${parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.125}px 0px 0px 0px`});



const upDownArrow = document.querySelector('.up-down-wave-animation');
const sectionScroll = new IntersectionObserver((entries,observer) => {
  entries.forEach(entry => {
    if (entry.target.id === "front" && entry.isIntersecting){
      scrollTo(0, 0);
      upDownArrow.classList.add('up-down-wave-animation');
    }
    if (entry.target.id === "rest" && entry.isIntersecting){
      scrollTo(0,document.getElementById('front').clientHeight+1);
      upDownArrow.classList.remove('up-down-wave-animation');
    }
  })
})



window.onload = function () {
  [...document.querySelectorAll('.text-letter-up-down-transition')].forEach(tag => {
    tag.innerHTML = tag.innerHTML.split('').map(l => l !== " " ? `<span class="d-inline-block">${l}</span>` : "&nbsp;").join('');
  })
}
// sectionScroll?.observe(document.getElementById('rest'));
// sectionScroll?.observe(document.getElementById('front'));
menuBookObserver?.observe(document.getElementById('book-arrow'));
menuBookObserver?.observe(document.getElementById('book-form'));