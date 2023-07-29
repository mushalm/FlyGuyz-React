/**
 * !=========================================
 *  Reset Navbar on Click Start
 * !=========================================
 */

// nav-links array
const navLinks = document.getElementsByClassName('nav-link');
const checkBox = document.getElementById('flexCheckDefault');
for(navLink of navLinks) {
  navLink.addEventListener('click', () => {
    checkBox.checked = false;
  });
}

/**
 * !=========================================
 *  Reset Navbar on Click End
 * !=========================================
 */

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'js/particles/particles.json', function () { });

// Document Ready Function Start
jQuery(function () {
  jQuery('.team-slider').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          autoplay: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  jQuery('.animating').slick({
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          autoplay: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});
// Document Ready Function End

/**
 * !=======================================================
 * * Slider for Roadmap Start
 * !=======================================================
 */

let windowWidth = window.innerWidth;
// console.log(windowWidth);

if (windowWidth >= 1200) {
  var Slider = function () {
    var total, $slide, $slider, sliderWidth, increment = 120;
    var on = function () {
      $slider = $('.slider');
      $slide = $('.slide');
      sliderWidth = $slider.width();
      total = $slide.length;
      position();
    }
  
    var position = function () {
      var sign, half = $('.active').index(), x = 0, z = 0, zindex, scaleX = 1.3, scaleY = 1.3, transformOrigin;
      $slide.each(function (index, element) {
        scaleX = scaleY = 1;
        transformOrigin = sliderWidth / 2;
        if (index < half) {
          sign = 1;
          zindex = index + 1;
          x = sliderWidth / 2 - increment * (half - index + 1);
          z = -increment * (half - index + 1);
        } else if (index > half) {
          sign = -1
          zindex = total - index;
          x = sliderWidth / 2 + increment * (index - half + 1);
          z = -increment * (index - half + 1);
        } else {
          sign = 0;
          zindex = total;
          x = sliderWidth / 2;
          z = 1;
          scaleX = scaleY = 1.2;
          transformOrigin = 'initial';
        }
        $(element).css(
          {
            'transform': 'translate3d(' + calculateX(x, sign, 300) + 'px, 0,' + z + 'px) scale3d(' + scaleX + ',' + scaleY + ', 1)',
            'z-index': zindex,
            'transform-origin-x': transformOrigin
          }
        );
      });
    };
  
    var calculateX = function (position, sign, width) {
      switch (sign) {
        case 1:
        case 0: return position - width / 2;
        case -1: return position - width / 2;
      }
    }
  
    var imageSize = function () {
      return $slider.width() / 3;
    }
  
    var recalculateSizes = function () {
      sliderWidth = $slider.width();
      position();
    }
  
    var clickedImage = function () {
      $('.active').removeClass('active');
      $(this).addClass('active');
      position();
    }
  
    var addEvents = function () {
      $(window).resize(recalculateSizes);
      $(document).on('click', '.slide', clickedImage);
    }
  
    return {
      init: function () {
        on();
        addEvents();
      }
    };
  }();
  $(function () {
    var slider = Slider.init();
  })
}
/**
 * !=======================================================
 * * Slider for Roadmap End
 * !=======================================================
 */

/**
 * !=======================================================
 * * Pie Chart Start
 * !=======================================================
 */

const data = {
  labels: [
    "Ecosystem",
    "Liquidity",
    "Seed Sale",
    "Private Sale 1",
    "Private Sale 2",
    "Team & Advisors",
    "Development",
    "Public Sale",
    "Marketing",
    "Airdrop"
  ],
  datasets: [{
    label: 'Tokenomics',
    data: [35, 11, 5, 5, 5, 7, 10, 11, 10, 1],
    backgroundColor: [
      'rgba(255, 0, 0, 0.75)',
      'rgba(255, 191, 0, 0.75)',
      'rgba(255, 255, 0, 0.75)',
      'rgba(0, 255, 64, 0.75)',
      'rgba(0, 255, 255, 0.75)',
      'rgba(0, 128, 255, 0.75)',
      'rgba(0, 0, 255, 0.75)',
      'rgba(255, 0, 255, 0.75)',
      'rgba(255, 0, 128, 0.75)',
      'rgba(253, 246, 241, 0.75)'
    ],
    borderColor: 'rgba(255, 124, 110, 0.1)',
    hoverOffset: 4
  }]
};

const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: true
  }
};

const myChart = new Chart(
  document.getElementById('tokenomicsChart'),
  config
);

/**
 * !=======================================================
 * * Pie Chart End
 * !=======================================================
 */

