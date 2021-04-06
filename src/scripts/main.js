gsap.set(".Site", {autoAlpha:1});

let opacityDuration = .3;

const logoWrap = document.getElementById('pmwLogoWrap');
const logo = document.getElementById('pmwLogo');



function updateClasses(data) {
  let bodyClass = document.body.className;
  const nextBodyClass = data.next.namespace;
  if (nextBodyClass) {
    document.body.classList = document.body.className.replace(bodyClass,nextBodyClass);
  }

  const menu = document.querySelector('.menu');
  const currentClass= 'active';
  const currentItem = menu.querySelector('.'+currentClass);
  const nextPath = data.next.url.path;
  const nextItem = menu.querySelector('a[href$="'+nextPath+'"] ');

  if (nextItem !== null) {
    if (currentItem !== null) {
      currentItem.classList.remove( currentClass );
    }
    if (nextPath !== '/') {
      nextItem.parentNode.classList.add( currentClass );
    }
  }

//console.log(currentClass);
//console.log(currentItem);
//console.log(nextItem);
//console.log(nextBodyClass);
}


function marquees() {
  const target = document.getElementById('areas');
  const marquee = document.querySelector('.marquee__inner');
  const marquee_style = getComputedStyle(document.getElementById('areas'));
  let itemCount = marquee_style.getPropertyValue("--no_items");
  let itemDisplay = marquee_style.getPropertyValue("--item-display");
  let itemWidth = 100 / itemDisplay;
  let moveFinal = itemCount * itemWidth * -1 - 50;

  let areasOffset = target.offsetTop;
  const marqueeHeight = marquee.offsetHeight;
  const headerHeight = document.getElementById('Site-header').offsetHeight;

  /*
  if(areasOffset + headerHeight + marqueeHeight >= window.innerHeight) {
    areasOffset = areasOffset - marqueeHeight
  }
  */


  //console.log(s_areas_style);
  console.log(marquee_style);
  console.log(itemCount);
  console.log(itemDisplay);
  console.log(itemWidth);
  console.log("offset"+target.offsetTop);

  let tl = gsap.timeline({
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: marquee,
        //start: "bottom bottom-=50px",
        //start: "top " + target.offsetTop + "-10px",
        //start: "top "+areasOffset,
        start: "top 60%",
        endTrigger: ".map",
        end: "bottom 10%",
        scrub: 0.2,
        pin: true,
        anticipatePin: 1,
        pinSpacing: false 
      }
    });

  tl.to(marquee, {xPercent: moveFinal})
    //.to(".S-areas .marquee__inner", {opacity: 0})

}
//marquees();
function map() {
  let tl = gsap.timeline({
      // yes, we can add it to an entire timeline!
      ease: "none",
      scrollTrigger: {
        trigger: ".map",
        pin: true,   // pin the trigger element while active
        start: "center center", // when the top of the trigger hits the top of the viewport
        end: "center top", // end after scrolling 500px beyond the start
        scrub: .2, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        snap: "labels",
      }
    });

  // add animations and labels to the timeline
  tl.from(".map .highlight", {fill: "rgba(240,229,224,.1)", stagger: 0.03})
    .from(".map text", {autoAlpha: 0, stagger: 0.1})
    .addLabel("end");
}

function circles() {
  gsap.from('.encircle', {
      duration: opacityDuration * 2,
      scale: 0, 
      y: 60,
      ease: "power2",
      stagger: function(index, target, list) {
        // your custom logic here. Return the delay from the start (not between each)
        return index * 0.1;
      }
  });
}

function fadeOut(data) {
  return gsap.to(data.current.container, { 
        autoAlpha: 0,
        duration: opacityDuration
      });
}

function fadeIn(data) {
  return gsap.from(data.next.container, { 
        autoAlpha: 0,
        duration: opacityDuration
      });
}


/*
gsap.from(".map text, .map circle", {
  opacity: 0,
  ease: "none",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".map",
    start: "top top",
    //end: "right right",
    scrub: false,
    pin: true,
    anticipatePin: 1,
    pinSpacing: false
    //horizontal: true
  }
});
*/


function preLoader() {

  //https://codepen.io/Mamboleoo/pen/obWGYr
  
  gsap.set(logoWrap, { 
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1C1B1B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999

  });
  
}


function enterAnimation(next) {
  //preLoader();
}

function gridLeaveAnimation(data) {
  const container = data.current.container;
  const gridItemHR = container.querySelectorAll('.text-grid hr');
  const gridItemText = container.querySelectorAll('.text-grid h2, .text-grid .section-body');
  const header = container.querySelector('.page-header');
  
  gsap.set(gridItemHR, {transformOrigin: '0 0'})
  const tl = gsap.timeline({});
  tl.to([gridItemText,header], {autoAlpha: 0, duration: opacityDuration, ease: 'none'});
  //tl.to(gridItemHR, {scaleY: 2, duration: .3});
  tl.to(gridItemHR, {scaleX: 0, duration: opacityDuration, ease:'power2.inOut'});

  return tl;
}

function gridEnterAnimation(data) {
  const container = data.next.container;
  const gridItemHR = container.querySelectorAll('.text-grid hr');
  const gridItemText = container.querySelectorAll('.text-grid h2, .text-grid .section-body');
  const header = container.querySelector('.page-header');
  
  gsap.set(gridItemHR, {transformOrigin: '0 0'})
  const tl = gsap.timeline({});
  tl.from(gridItemHR, {scaleX: 0, duration: opacityDuration, ease:'power2.inOut'});
  tl.from([gridItemText,header], {autoAlpha: 0, duration: opacityDuration, ease: 'none'});

  return tl;
}

/*
function expEnterAnimation(next) {
  const container = next.container;
  const circles = container.querySelectorAll('.encircle');
  //const map = container.querySelectorAll('.map svg');
  const header = container.querySelector('.S-text');

  const tl = gsap.timeline({});
  tl.from(header, {autoAlpha: 0, duration: opacityDuration, ease: 'none'});
  //tl.from(map, {opacity: 0, duration: .5, ease: 'none'});
  tl.from(circles, {
      duration: opacityDuration * 2,
      scale: 0, 
      y: 60,
      ease: "power1.inOut",
      stagger: 0.1
  }, "<");


  return tl;
}
*/


barba.hooks.beforeEnter( (data) => {
    updateClasses(data);
});


barba.init({
  preventRunning: true,
  debug: true,
  transitions: [{
    sync: false,
    once(data) { // when you first load the website.
      fadeIn(data);
    },
    async leave(data) {
      const leave = await fadeOut(data);
      return leave;
    },
    enter(data) {
      fadeIn(data);
    }
  },
  {
    name: 'gridInOut',
    to: {
      namespace: [
        'about',
        'services'
      ]
    },
    from: {
      namespace: [
        'about',
        'services'
      ]
    },
    async leave(current) {
      const leave = await gridLeaveAnimation(current);
      return leave;
    },
    enter(next) {
      gridEnterAnimation(next);
    }
  },
  {
    name: 'gridOut',
    from: {
      namespace: [
        'about',
        'services'
      ]
    },
    async leave(current) {
      const leave = await gridLeaveAnimation(current);
      return leave;
    },
    enter(data) {
      fadeIn(data);
    }
  },
  {
    name: 'gridIn',
    to: {
      namespace: [
        'about',
        'services'
      ]
    },
    async leave(data) {
      const leave = await fadeOut(data);
      return leave;
    },
    enter(next) {
      gridEnterAnimation(next);
    }
  }
  ],
  views: [{
    namespace: 'experience',
    afterEnter() {
      // do something before entering the `contact` namespace
      marquees();
      map();
      circles();
      console.log('on exp page');
    }
  }],
});


