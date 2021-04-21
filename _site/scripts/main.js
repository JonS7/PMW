//gsap.set(".Site", {autoAlpha:1});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});


let opacityDuration = .3;

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
      nextItem.classList.add( currentClass );
    }
  }
}


function marquees() {
  
  ScrollTrigger.matchMedia({
    "(orientation: landscape) and (min-width: 768px)": function() {

      const target = document.getElementById('areas');
      const marquee = target.querySelector('.marquee-inner');
      const marquee_style = getComputedStyle(target);
      let itemCount = marquee_style.getPropertyValue("--no_items");
      let itemDisplay = marquee_style.getPropertyValue("--item-display");
      let itemWidth = 100 / itemDisplay;
      let moveFinal = itemCount * itemWidth * -1;
      //scrollTrigger.refresh();

      let tl = gsap.timeline({
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: marquee,
            start: "top 60%",
            //endTrigger: ".map",
            //end: "bottom top",
            endTrigger: ".Site",
            end: "bottom bottom",
            scrub: .5,
            pin: true,
            pinSpacing: false,
          }
        });


      tl.to(marquee, {xPercent: moveFinal})
    }
  });

  ScrollTrigger.matchMedia({
    "(orientation: portrait) and (min-width: 768px)": function() {

      const target = document.getElementById('areas');
      const marquee = target.querySelector('.marquee-inner');
      const marquee_style = getComputedStyle(target);
      let itemCount = marquee_style.getPropertyValue("--no_items");
      let itemDisplay = marquee_style.getPropertyValue("--item-display");
      let itemWidth = 100 / itemDisplay;
      let moveFinal = itemCount * itemWidth * -1;

      gsap.set(marquee,{paddingTop: "30%",paddingBottom: "5%"})
      //gsap.set(target,{minHeight: "60vh"})

      let tl = gsap.timeline({
        ease: 'power2.inOut',
          scrollTrigger: {
            //trigger: marquee,
            //start: "top 60%",
            trigger: '.Site',
            start: "top top",
            //trigger: target,
            //start: "top " + target.offsetTop,
            //endTrigger: ".map",
            //end: "bottom top",
            endTrigger: ".Site",
            end: "bottom 60%",
            scrub: .5,
            pin: true,
            pinSpacing: true,
          }
      });
      // add animations and labels to the timeline
      tl.to(marquee, {xPercent: moveFinal})
      .from(".map .highlight", {fill: "rgba(240,229,224,.1)", stagger: 0.03}, "<")
      .from(".map text", {opacity: 0, stagger: 0.1},"<")
      .from(".map circle", {opacity: 0},">-1")
      .from(".S-c2a", {opacity: 0, y:100},"<")
      .addLabel("end");
    }
  });
}


function map() {

  ScrollTrigger.matchMedia({
    "(max-width: 767px)": function() {

      // get map width instead of 75%

      let tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: ".Site",
          pin: false,
          start: "top top",
          end: "bottom bottom",
          scrub: 2
          //snap: "labels",
        }
      });

      //gsap.set('.map text, .map circle', {autoAlpha: 0});
      tl.from(".map .highlight", {fill: "rgba(240,229,224,.1)"})
      .from(".map text", {opacity: 0}, 0)
      .from(".map circle", {opacity: 0}, 0)
      .to(".map", {xPercent: -75,}, 0)
      .addLabel("end");
    }
  });
  

  ScrollTrigger.matchMedia({
    "(orientation: landscape) and (min-width: 768px)": function() {

      let tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: ".map",
          pin: true,
          start: "center center", 
          //end: "center top",
          endTrigger: ".Site",
          end: "bottom bottom",
          scrub: true,
          snap: "labels",
          anticipatePin: 1,
          pinSpacing: false
        }
      });
      // add animations and labels to the timeline
      tl.addLabel("start")
        .from(".map .highlight", {fill: "rgba(240,229,224,.1)", stagger: 0.03})
        .from(".map text", {opacity: 0, stagger: 0.1})
        .from(".map circle", {opacity: 0})
        //.from(".agency-logo", {autoAlpha: 0, scale: 0, stagger: 0.1})
        .addLabel("end");
    }
  });

  /*ScrollTrigger.matchMedia({
    "(orientation: portrait) and (min-width: 768px)": function() {

      let tl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: ".map",
          pin: false,
          start: "center center", 
          endTrigger: ".Site",
          end: "bottom top",
          scrub: true,
          //snap: "labels",
          anticipatePin: 1,
          pinSpacing: false
        }
      });
      // add animations and labels to the timeline
      tl.addLabel("start")
        .from(".map .highlight", {fill: "rgba(240,229,224,.1)", stagger: 0.03})
        .from(".map text", {opacity: 0, stagger: 0.1})
        .from(".map circle", {opacity: 0})
        //.from(".agency-logo", {autoAlpha: 0, scale: 0, stagger: 0.1})
        .addLabel("end");
    }
  });*/
  
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
        opacity: 0,
        duration: opacityDuration
      });
}

function fadeIn(data) {
  return gsap.from(data.next.container, { 
        opacity: 0,
        duration: opacityDuration
      });
}

function gridLeaveAnimation(data) {
  const container = data.current.container;
  const gridItemHR = container.querySelectorAll('.text-grid hr');
  const gridItemText = container.querySelectorAll('.text-grid h2, .text-grid .section-body');
  const header = container.querySelector('.page-header');
  gsap.set(gridItemHR, {transformOrigin: '0 0'})
  const tl = gsap.timeline({});
  tl.to([gridItemText,header], {opacity: 0, duration: opacityDuration, ease: 'none'});
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
  tl.from([gridItemText,header], {opacity: 0, duration: opacityDuration, ease: 'none'});
  return tl;
}


barba.hooks.beforeLeave((data) => {
  const scrollElement = window.document.scrollingElement || window.document.body || window.document.documentElement;
  //ScrollTrigger.disable();
  ScrollTrigger.getAll().forEach(ST => ST.disable());
  gsap.to(scrollElement, {scrollTop: 0, duration: opacityDuration, ease:'power2.inOut'})
  //ScrollTrigger.getAll().forEach(t => t.kill());
  
});

barba.hooks.beforeEnter( (data) => {
  updateClasses(data);
  ScrollTrigger.refresh();
});

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

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
      //data.current.container.remove();
    },
    /*async beforeEnter(data) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      },*/
    async enter(data) {
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
    async enter(next) {
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
      //data.current.container.remove();
    },
    /*async beforeEnter(data) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      },*/
    async enter(data) {
      fadeIn(data);
      //ScrollTrigger.refresh();
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
    async enter(next) {
      gridEnterAnimation(next);
    }
  }
  ],
  views: [{
    namespace: 'experience',
    afterEnter() {
      // do something before entering the `contact` namespace
      //ScrollTrigger.getAll().forEach(t => t.kill());
      //ScrollTrigger.refresh();
      marquees();
      map();
      circles();
      console.log('on exp page');
    }
  }],
});


