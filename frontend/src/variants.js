export const mainAnimate = {
    hidden: {opacity: 0,
    transition: {
        duration: 1.2,
        ease: [0.83, 0, 0.17, 1]
        }
    },
    show: {opacity: 1,
    transition: {
      duration: 1,
    }},
  }

export const demoAnimate = {
    hidden: {opacity: 0,
    },
    show: {opacity: 1,
    transition: {
      duration: 1,
    }}
  }

  export const stylerChangePage = {
    next: {x:[0,-2000,2000,0],opacity:[1,0,0,1],
      transition: {duration:1}
    },
    back: {x:[0,2000,-2000,0],opacity:[1,0,0,1],
      transition: {duration:1}
      },
    tryAgain: {y:[0,2000,-2000,0],opacity:[1,0,0,1],
      transition: {duration:1}
      },
    stay: {x: 0}
  }