import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState({
    imageSrc: "img/eth.svg",
    label: "ETH",
  });

  const handleButtonClick = (imageSrc, label) => {
    setSelectedCurrency({ imageSrc, label });
  };

  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatusMessage("Thanks for your submission!");
        form.reset();
      } else {
        const responseData = await response.json();
        if (responseData.errors) {
          setStatusMessage(
            responseData.errors.map((error) => error.message).join(", ")
          );
        } else {
          setStatusMessage("Oops! There was a problem submitting your form.");
        }
      }
    } catch (error) {
      setStatusMessage("Oops! There was a problem submitting your form.");
    }
  };
  useEffect(() => {
    // $(function () {
    //   $(".team-slider").slick({
    //     dots: true,
    //     infinite: true,
    //     arrows: false,
    //     speed: 300,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 3,
    //           infinite: true,
    //           dots: true,
    //         },
    //       },
    //       {
    //         breakpoint: 768,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1,
    //           arrows: true,
    //           autoplay: false,
    //           dots: false,
    //         },
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //           arrows: true,
    //           dots: false,
    //         },
    //       },
    //       // You can unslick at a given breakpoint now by adding:
    //       // settings: "unslick"
    //       // instead of a settings object
    //     ],
    //   });
    //   $(".animating").slick({
    //     dots: true,
    //     infinite: true,
    //     arrows: false,
    //     speed: 300,
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     responsive: [
    //       {
    //         breakpoint: 1024,
    //         settings: {
    //           slidesToShow: 3,
    //           slidesToScroll: 3,
    //           infinite: true,
    //           dots: true,
    //         },
    //       },
    //       {
    //         breakpoint: 768,
    //         settings: {
    //           slidesToShow: 2,
    //           slidesToScroll: 1,
    //           arrows: true,
    //           autoplay: false,
    //           dots: false,
    //         },
    //       },
    //       {
    //         breakpoint: 480,
    //         settings: {
    //           slidesToShow: 1,
    //           slidesToScroll: 1,
    //           arrows: true,
    //           dots: false,
    //         },
    //       },
    //       // You can unslick at a given breakpoint now by adding:
    //       // settings: "unslick"
    //       // instead of a settings object
    //     ],
    //   });
    // });
    // let windowWidth = window.innerWidth;
    // // console.log(windowWidth);
    // if (windowWidth >= 1200) {
    //   var Slider = (function () {
    //     var total,
    //       $slide,
    //       $slider,
    //       sliderWidth,
    //       increment = 120;
    //     var on = function () {
    //       $slider = $(".slider");
    //       $slide = $(".slide");
    //       sliderWidth = $slider.width();
    //       total = $slide.length;
    //       position();
    //     };
    //     var position = function () {
    //       var sign,
    //         half = $(".active").index(),
    //         x = 0,
    //         z = 0,
    //         zindex,
    //         scaleX = 1.3,
    //         scaleY = 1.3,
    //         transformOrigin;
    //       $slide.each(function (index, element) {
    //         scaleX = scaleY = 1;
    //         transformOrigin = sliderWidth / 2;
    //         if (index < half) {
    //           sign = 1;
    //           zindex = index + 1;
    //           x = sliderWidth / 2 - increment * (half - index + 1);
    //           z = -increment * (half - index + 1);
    //         } else if (index > half) {
    //           sign = -1;
    //           zindex = total - index;
    //           x = sliderWidth / 2 + increment * (index - half + 1);
    //           z = -increment * (index - half + 1);
    //         } else {
    //           sign = 0;
    //           zindex = total;
    //           x = sliderWidth / 2;
    //           z = 1;
    //           scaleX = scaleY = 1.2;
    //           transformOrigin = "initial";
    //         }
    //         $(element).css({
    //           transform:
    //             "translate3d(" +
    //             calculateX(x, sign, 300) +
    //             "px, 0," +
    //             z +
    //             "px) scale3d(" +
    //             scaleX +
    //             "," +
    //             scaleY +
    //             ", 1)",
    //           "z-index": zindex,
    //           "transform-origin-x": transformOrigin,
    //         });
    //       });
    //     };
    //     var calculateX = function (position, sign, width) {
    //       switch (sign) {
    //         case 1:
    //         case 0:
    //           return position - width / 2;
    //         case -1:
    //           return position - width / 2;
    //       }
    //     };
    //     var imageSize = function () {
    //       return $slider.width() / 3;
    //     };
    //     var recalculateSizes = function () {
    //       sliderWidth = $slider.width();
    //       position();
    //     };
    //     var clickedImage = function () {
    //       $(".active").removeClass("active");
    //       $(this).addClass("active");
    //       position();
    //     };
    //     var addEvents = function () {
    //       $(window).resize(recalculateSizes);
    //       $(document).on("click", ".slide", clickedImage);
    //     };
    //     return {
    //       init: function () {
    //         on();
    //         addEvents();
    //       },
    //     };
    //   })();
    //   $(function () {
    //     var slider = Slider.init();
    //   });
    // }
  }, []);
  useEffect(() => {
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
        "Airdrop",
      ],
      datasets: [
        {
          label: "Tokenomics",
          data: [35, 11, 5, 5, 5, 7, 10, 11, 10, 1],
          backgroundColor: [
            "rgba(255, 0, 0, 0.75)",
            "rgba(255, 191, 0, 0.75)",
            "rgba(255, 255, 0, 0.75)",
            "rgba(0, 255, 64, 0.75)",
            "rgba(0, 255, 255, 0.75)",
            "rgba(0, 128, 255, 0.75)",
            "rgba(0, 0, 255, 0.75)",
            "rgba(255, 0, 255, 0.75)",
            "rgba(255, 0, 128, 0.75)",
            "rgba(253, 246, 241, 0.75)",
          ],
          borderColor: "rgba(255, 124, 110, 0.1)",
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
      },
    };

    const myChart = new Chart(
      document.getElementById("tokenomicsChart"),
      config
    );
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <div className="main-root position-relative">
        <div id="particles-js"></div>

        <div className="main-body">
          {/* <!-- Hero Section Start --> */}
          <section id="hero">
            <div className="hero">
              <div className="container h-100">
                <div className="row align-items-center h-100">
                  <div className="col-12">
                    <div className="size-wrap text-center">
                      <h1 className="fs-60 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
                        FlyGuyz
                      </h1>
                      <h1 className="fs-50 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
                        <span className="text-shadow">Gaming</span>
                      </h1>

                      <p className="fs-18 fw-normal text-light mb-4">
                        FlyGuyz is an NFT-based ultimate fighting game that
                        blends traditional gaming and crypto elements. Featuring
                        PvP, Tournaments, Dungeon Questing, and Multiple Realms.
                        The game features a Genesis NFT collection that serves
                        as in-game characters and allows players to mass produce
                        other NFTs.
                      </p>
                      <a
                        href="#targetSection"
                        className="btn btn-blue fs-18 rounded-pill"
                      >
                        Buy $FLYY!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Hero Section End --> */}

          <div
            id="targetSection"
            className="size-wrap text-center"
            style={{ marginTop: "30px" }}
          >
            <h1 className="fs-60 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
              Pre-Sale Starts
            </h1>
            <h1 className="fs-50 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
              <span>Aug. 26 @ 4 PM UTC</span>
            </h1>
          </div>
          {/* <!-- Card Section Start --> */}
          <section
            className="container"
            style={{
              fontSize: "15px",
              width: "70%",
              paddingRight: "var(--bs-gutter-x,.75rem)",
              paddingLeft: "var(--bs-gutter-x,.75rem)",
              marginRight: "auto",
              marginLeft: "auto",
              boxSizing: " border-box",
              fontWeight: "bold",
            }}
          >
            <div className="walletbox">
              <div className="div1" id="uppersection">
                <div className="div2">
                  <div className="rounded-3 time-card text-center">29d</div>
                  <div className="rounded-3 time-card text-center">29h</div>
                  <div className="rounded-3 time-card text-center">29m</div>
                  <div className="rounded-3 time-card text-center">29s</div>
                </div>
                <h4 className="h4" style={{ fontSize: "20px" }}>
                  BUY IN BEFORE PRICE INCREASES!
                </h4>
                <div className="progress my-2">
                  <div className="bar" style={{ width: "0" }}></div>
                  <div className="status">Next round price = $0.020</div>
                </div>
                <p
                  className="mb-2 font-sm-15 fw-semibold"
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginTop: "0",
                  }}
                >
                  USDT Raised: $0 / $4,000,000
                </p>
              </div>

              <div className="p-3 swapArea">
                <p className="text-center mb-3 font-14 dashTitle fw-semibold">
                  1 FLYY = $0.010
                </p>
                <div className="tab-container gap-2">
                  <button
                    id="button-1"
                    onClick={() => handleButtonClick("img/eth.svg", "ETH")}
                    className="btn1 btn-light font-14 text-uppercase d-flex align-items-center justify-content-center ng-star-inserted"
                  >
                    <img src="img/eth.svg" style={{ width: "25px" }} alt="" />

                    <span className="ps-2 font-14">ETH</span>
                  </button>
                  <button
                    id="button-2"
                    onClick={() => handleButtonClick("img/asdt.svg", "USDT")}
                    className="btn1 btn-light font-14 text-uppercase d-flex align-items-center justify-content-center ng-star-inserted"
                  >
                    <img src="img/asdt.svg" style={{ width: "25px" }} alt="" />

                    <span className="ps-2 font-14">USDT</span>
                  </button>
                  <button
                    id="button-3"
                    onClick={() => handleButtonClick("img/card.svg", "CARD")}
                    className="btn1 btn-light font-14 text-uppercase d-flex align-items-center justify-content-center ng-star-inserted"
                  >
                    <img src="img/card.svg" style={{ width: "25px" }} alt="" />

                    <span className="ps-2 font-14">CARD</span>
                  </button>
                </div>
                <app-swap>
                  <div className="swapSection my-3">
                    <div className="body-section ng-star-inserted">
                      <div className="row">
                        <div className="col-md-6 pe-md-1">
                          <div
                            className="d-flex align-items-center justify-content-between mb-2"
                            style={{
                              color: "gray",
                              fontSize: "13px",
                              fontWeight: " 100",
                            }}
                          >
                            <label className="d-block text-grey font-13">
                              Amount in
                              <span
                                id="label-currency"
                                className="text-uppercase fw-bold"
                              >
                                {selectedCurrency.label}
                              </span>
                              you pay
                            </label>
                          </div>
                          <div className="amountField d-flex align-items-start">
                            <input
                              id="input-box"
                              placeholder="0"
                              type="text"
                              className="form-control2"
                            />
                            <div className="amountType">
                              <img
                                id="input-image"
                                src={selectedCurrency.imageSrc}
                                alt="Currency Image"
                                style={{ width: "25px" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-6 ps-md-1"
                          style={{
                            color: "gray",
                            fontSize: " 13px",
                            fontWeight: " 100",
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <label className="d-block text-mid-grey font-13">
                              Amount in
                              <span className="text-uppercase  fw-bold">
                                FLYY
                              </span>
                              you receive
                            </label>
                          </div>
                          <div className="amountField">
                            <input
                              id="input-box"
                              type="text"
                              placeholder="0"
                              className="form-control2"
                            />
                            <div className="amountType">
                              <img
                                src="img/flyguyz-logo.png"
                                style={{ width: "25px", height: "25px" }}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </app-swap>
                <div className="mt-3">
                  <button className="btn2 btn2-black font-14 mb-2 w-100 ng-star-inserted">
                    Buy Now
                  </button>
                  <a
                    href=""
                    className="btn2 btn2-light font-14 text-grey w-100"
                  >
                    How To Buy
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* <script>
                    document.addEventListener("DOMContentLoaded", function () {
                        const button1 = document.getElementById("button-1");
                        const button2 = document.getElementById("button-2");
                        const button3 = document.getElementById("button-3");
                        const inputImage = document.getElementById("input-image");
                        const labelCurrency = document.getElementById("label-currency");

                        // Event listener for button 1
                        button1.addEventListener("click", () => {
                            inputImage.src = "img/eth.svg";

                            labelCurrency.textContent = "ETH";
                        });

                        // Event listener for button 2
                        button2.addEventListener("click", () => {
                            inputImage.src = "img/asdt.svg";

                            labelCurrency.textContent = "USDT";
                        });

                        // Event listener for button 3
                        button3.addEventListener("click", () => {
                            inputImage.src = "img/card.svg";

                            labelCurrency.textContent = "CARD";
                        });
                    });
                </script> */}
          {/* <!-- Card Section End -->

                <!-- Gallery Start --> */}
          <section id="gallery">
            <div className="gallery pt-md-5">
              <div className="container-fluid py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="carousel-wrapper">
                      <div className="carousel animating">
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/01.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/02.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/03.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/04.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/05.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/06.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/07.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        <div className="carousel-photo">
                          <img
                            src="img/ugallery/08.png"
                            alt="carousel photo"
                            className="img-fluid"
                          />
                        </div>
                        {/* <!-- <div className="carousel-photo">
                                                                  <img src="img/4.jpg" alt="carousel photo" className="img-fluid">
                                                                </div>
                                                                <div className="carousel-photo">
                                                                  <img src="img/5.jpg" alt="carousel photo" className="img-fluid">
                                                                </div>
                                                                <div className="carousel-photo">
                                                                  <img src="img/2.jpg" alt="carousel photo" className="img-fluid">
                                                                </div> --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Gallery End -->

                <!-- Why FlyGuyz Start --> */}
          <section id="litepaper">
            <div className="litepaper py-md-5">
              <div className="container py-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="size-wrap text-center px-md-5">
                      <h2 className="fs-50 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
                        $FLYY TOKEN
                      </h2>
                      <h2 className="fs-20 text-uppercase text-Cyan mb-2 mb-md-4 fw-bold">
                        888,000,000 $FLYY
                      </h2>
                      <p className="fs-15 text-light fw-normal mb-3">
                        $FLYY is a utility token of the FlyGuyz ecosystem. The
                        integrated P2E mechanisms maintain a constant demand for
                        the $FLYY, which continuously stimulates the growth of
                        its value.
                      </p>
                      <img src="img/P2E.png" alt="p2e game" />
                      <h2 className="fs-50 text-uppercase text-white mb-2 mb-md-4 fw-bold">
                        P2E Gameplay Focus
                      </h2>
                      <p className="fs-15 text-light fw-normal mb-3">
                        FlyGuyz offers a wide variety of gameplay options suited
                        for every kind of player, such as P2E Challenge Fights,
                        Matchmaking, & Dungeon Quests. you can earn $FLYY or
                        NFTs, and receive ranking experience, which open up new
                        opportunities.
                      </p>
                      <img src="img/nft.png" alt="p2e game" />
                      <h2 className="fs-50 text-uppercase text-white mb-2 mb-md-4 fw-bold">
                        JOIN NFT WORLD
                      </h2>
                      <p className="fs-15 text-light fw-normal mb-3">
                        FlyGuyz features a Genesis NFT Collection that serves as
                        your in-game characters and are considered "Factory
                        NFTs". This allows players to mass produce copy
                        Sub-Genesis Characters to then redistribute in the
                        ecosystem.
                      </p>
                      <img src="img/Participate.png" alt="p2e game" />
                      <h2 className="fs-50 text-uppercase text-white mb-2 mb-md-4 fw-bold">
                        PARTICIPATE IN EVENTS
                      </h2>
                      <p className="fs-15 text-light fw-normal mb-3">
                        Virtual events open up opportunities that are not
                        available in the real world. FlyGuyz ecosystem will
                        allow users to qualify for the global tournaments within
                        our ranking systems as well as organize paid & free
                        events.
                      </p>
                      <h2 className="fs-50 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
                        Eco<span className="text-shadow">System</span>
                      </h2>
                      <p className="fs-15 text-light fw-normal mb-4">
                        As we believe that $FLYY is so heavily empowered by our
                        community, we want to decentralize leadership into
                        different committees and task groups that can focus on
                        social media presence, charitable efforts, blockchain
                        development, crypto education and more. In order to be
                        as fair as possible, DAO voting power will be given to
                        two types of holders that have a minimum stake in the
                        $FLYY ecosystem. Holding at least 10,000 $FLYY and/or 1+
                        FLYGUYZ NFT will empower someone with a vote in the DAO.
                        This minimum stake guarantees a seat at the table, but
                        each person only has one vote in any matter. This
                        effectively stops whales from being able to buy the
                        vote, and decentralizes ownership to a fair point. The
                        purpose of the DAO will be to govern the protocol,
                        manage treasury funds and decentralize leadership by
                        placing $FLYY directly into those that are the most
                        invested. In all, $FLYY is a community driven social
                        effort, and experiment, from its inception to end goal.
                        From fair distribution to community governance, $FLYY
                        aims to be the premier community token on Ethereum, with
                        intertwined utility across NFTs, DeFi, gaming and more.
                      </p>
                      <a
                        href="https://whitepaper.flyguyz.io/"
                        className="btn btn-blue rounded-pill"
                      >
                        Whitepaper
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Why FlyGuyz End -->

                <!-- Roadmap Start --> */}
          <section id="roadmap">
            <div className="roadmap pt-md-5">
              <div className="container pt-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose fw-bold text-center mb-0">
                        Roadmap
                      </h2>

                      {/* <!-- Roadmap Slider Start --> */}
                      <div className="slider">
                        <div className="slide active">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 1</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Private Round 1</li>
                                <li>Private Round 2</li>
                                <li>Private Round 3</li>
                                <li>Public Round Launchpad - Flash Sale</li>
                                <li>
                                  Exclusive Whitelist / Pre-Sale Genesis NFTs
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 2</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Public Genesis Mint (Exact Day TBA)</li>
                                <li>Play2Earn Game Trailer</li>
                                <li>$Flyy Token Integration for Minting</li>
                                <li>Launch of $50,000 Community Grant Fund</li>
                                <li>50% Royalties added to Treasury</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 3</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Swap Box / Bridge $Flyy Token</li>
                                <li>
                                  Profile Picture Downloader / FlyGuyz Art
                                  Contest
                                </li>
                                <li>
                                  Hiring of Community Members for Creative Team
                                </li>
                                <li>
                                  Voting for Mutations, Grant Fund, Slogan
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 4</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Start of Staking / Wage $Flyy or ETH</li>
                                <li>Integration of DAO Governance</li>
                                <li>Cross-Chain Implementation</li>
                                <li>Mad Scientist Laboratory</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 5</h2>
                            <div className="slide-description">
                              <ul>
                                <li>
                                  FlyGuyz Merchandise / Accepting $FLYY , ETH
                                </li>
                                <li>NFT Exclusive Item Drops</li>
                                <li>Merch Raffles</li>
                                <li>Second Security Audit (Certik)</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 6</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Artist Collab (Limited FlyGuyz Items)</li>
                                <li>Collaboration with Celebrities</li>
                                <li>FlyGuyz Mutation</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 7</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Premiere of Play2Earn Game</li>
                                <li>Metaverse Avatar Adaptation</li>
                                <li>Decentraland & Sandbox Property</li>
                                <li>New Promotional Video</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="slide">
                          <div className="slide-container">
                            <h2 className="slide-Title">Phase 8</h2>
                            <div className="slide-description">
                              <ul>
                                <li>Production of FlyGuyz Action Figures</li>
                                <li>NFT Gaming Tournaments</li>
                                <li>Team Expansion</li>
                                <li>Mad Science Laboratory 1.0</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Roadmap Slider End --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Roadmap End -->

            <!-- Launch Details Start --> */}
          <section id="launch-details">
            <div className="launch-details py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose mb-4 fw-bold text-center">
                        Launch
                        <span className="text-shadow">Details</span>
                      </h2>
                      <div className="morph-bg my-4 my-md-5 d-flex align-items-center justify-content-between flex-row row-cols-3">
                        <p className="fs-20 mb-0 text-start text-info">
                          Token Name: FlyGuyz
                        </p>
                        <p className="fs-20 mb-0 text-center text-info">
                          Ticker: $FLYY
                        </p>
                        <p className="fs-20 mb-0 text-end text-info">
                          Total Supply: 888 000 000
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 mb-4 mb-md-0">
                    <div className="size-wrap h-100">
                      <div className="launch-info-box morph-bg h-100 d-flex flex-column justify-content-between">
                        <h3 className="fs-22 text-capitalize text-center text-light mb-4">
                          Seed Round
                        </h3>
                        <ul className="mb-4">
                          <li>0.010$ per token</li>
                          <li>62 Million Tokens</li>
                        </ul>
                        <a
                          href="#"
                          className="btn btn-blue rounded-pill d-block w-75 mx-auto"
                        >
                          Coming Soon
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <div className="size-wrap h-100">
                      <div className="launch-info-box morph-bg h-100 d-flex flex-column justify-content-between">
                        <h3 className="fs-22 text-capitalize text-center text-light mb-4">
                          Round 1 (Private Sale)
                        </h3>
                        <ul className="mb-4">
                          <li>0.020$ per token</li>
                          <li>80 Million Tokens</li>
                        </ul>
                        <a
                          href="#"
                          className="btn btn-blue rounded-pill d-block w-75 mx-auto"
                        >
                          Coming Soon
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    <div className="size-wrap h-100">
                      <div className="launch-info-box morph-bg h-100 d-flex flex-column justify-content-between">
                        <h3 className="fs-22 text-capitalize text-center text-light mb-4">
                          Round 2 (Private Sale)
                        </h3>
                        <ul className="mb-4">
                          <li>0.030$ per token</li>
                          <li>62 Million Tokens</li>
                        </ul>
                        <a
                          href="#"
                          className="btn btn-blue rounded-pill d-block w-75 mx-auto"
                        >
                          Coming soon
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Launch Details End -->

            <!-- Banner Image Start --> */}
          <section id="banner-img">
            <div className="banner-img py-md-5">
              <div className="container-xl py-5">
                <div className="row">
                  <div className="col-12">
                    <img
                      src="img/banner.png"
                      alt="FlyGuyz"
                      className="img-fluid d-block mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Banner Image End -->

            <!-- Tokenomics Start --> */}
          <section id="tokenomics">
            <div className="tokenomics py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose mb-4 fw-bold text-center">
                        Token<span className="text-shadow">omics</span>
                      </h2>
                      <div className="tokenomics-canvas">
                        <canvas
                          id="tokenomicsChart"
                          width="1116px"
                          height="558px"
                        ></canvas>
                        {/* <!-- <img src="img/graph.png" id="graph-img"asdsad className="img-fluid"/> --> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Tokenomics End -->

            <!-- Token Sale Event Start --> */}
          <section id="toke-sale">
            <div className="toke-sale py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose fw-bold text-center">
                        Token
                        <span className="text-shadow">Sale</span>
                        Event
                      </h2>
                      <p className="fs-18 fw-normal text-center text-light mb-4">
                        Be the first to gain the most
                      </p>

                      <div className="table-responsive">
                        <table className="table morph-bg table-borderless mb-5 py-3">
                          <thead>
                            <tr>
                              <th scope="col">Round</th>
                              <th scope="col">Price</th>
                              <th scope="col">Collected Funds</th>
                              <th scope="col">Vesting</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Private Round 1</th>
                              <td>$0.010</td>
                              <td>$621,600</td>
                              <td>
                                5% TGE, 1 month cliff, monthly vesting for 6
                                months
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Private Round 2</th>
                              <td>$0.020</td>
                              <td>$1,598,400</td>
                              <td>
                                7% TGE, 2 month cliff, monthly vesting for 8
                                months
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Private Round 3</th>
                              <td>$0.030</td>
                              <td>$1,864,800</td>
                              <td>
                                10% TGE, 3 month cliff, monthly vesting for 12
                                months
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Public Sale</th>
                              <td>$0.040</td>
                              <td>$710,400</td>
                              <td>15% TGE, monthly vesting for 5 months</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="table-responsive">
                        <table className="table table-sm table-borderless morph-bg py-3 mb-0">
                          <tbody>
                            <tr>
                              <th scope="row">Rewardsth </th>
                              <td>2% TGE, 36 month linear release</td>
                            </tr>
                            <tr>
                              <th scope="row">Ecosystem</th>
                              <td>
                                12 month cliff, then gradual release over 36
                                months
                              </td>
                            </tr>
                            {/* <!-- <tr>
                                                                          <th scope="row">Liquidity</th>
                                                                          <td>10 month cliff, then monthly vesting 24 months</td>
                                                                        </tr> --> */}
                            <tr>
                              <th scope="row">Team / Advisors</th>
                              <td>
                                24 month cliff, then monthly release over 24
                                months
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">Staking</th>
                              <td>1% TGE, Linear vesting 36 months (10%)</td>
                            </tr>
                            <tr>
                              <th scope="row">Marketing</th>
                              <td>5% TGE, monthly vesting 36 months</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Token Sale Event End -->

            <!-- Our Team Start --> */}
          <section id="team">
            <div className="team py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose fw-bold text-center mb-3">
                        Our
                        <span className="text-shadow">Team</span>
                      </h2>
                    </div>
                    <div className="team-slider">
                      {/* <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/austin.png"
                              alt="Austin"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Austin</h4>
                              <p className="fs-15 text-light mb-3">
                                Co-Founder/ CEO
                              </p>
                              <p className="fs-14 text-light mb-3">
                                Entrepreneur, CEO and Business Manage, 1.2M
                                Annual Revenue
                              </p>
                              <div className="social-links d-flex flex-row justify-content-center">
                                <a
                                  href="https://www.instagram.com/earth.to.austin/"
                                  target="_blank"
                                >
                                  <img
                                    alt="Instagram"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='512' height='512' x='0' y='0' viewBox='0 0 409.61 409.61' style={{enableBackground:'new 0 0 512 512'}} xml:space='preserve' className=''%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M307.205,0h-204.8C46.09,0,0.005,46.085,0.005,102.4v204.81c0,56.3,46.085,102.4,102.4,102.4h204.8 c56.315,0,102.4-46.1,102.4-102.4V102.4C409.605,46.085,363.52,0,307.205,0z M375.47,307.21c0,37.632-30.612,68.265-68.265,68.265 h-204.8c-37.637,0-68.265-30.633-68.265-68.265V102.4c0-37.642,30.628-68.265,68.265-68.265h204.8 c37.653,0,68.265,30.623,68.265,68.265V307.21z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='315.755' cy='93.865' r='25.6' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M204.805,102.4c-56.566,0-102.4,45.839-102.4,102.4c0,56.54,45.834,102.41,102.4,102.41c56.55,0,102.4-45.87,102.4-102.41 C307.205,148.239,261.355,102.4,204.805,102.4z M204.805,273.075c-37.699,0-68.265-30.566-68.265-68.275 s30.566-68.265,68.265-68.265s68.265,30.556,68.265,68.265S242.504,273.075,204.805,273.075z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                                  />
                                </a>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a
                                  href="https://www.linkedin.com/in/austin-backlund-a68354158/"
                                  target="_blank"
                                >
                                  <img
                                    alt="Linkedin"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE3NiAxNzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9ImxpbmtlZGluIj48cGF0aCBpZD0iaWNvbiIgZD0ibTE1MiAwaC0xMjhhMjQgMjQgMCAwIDAgLTI0IDI0djEyOGEyNCAyNCAwIDAgMCAyNCAyNGgxMjhhMjQgMjQgMCAwIDAgMjQtMjR2LTEyOGEyNCAyNCAwIDAgMCAtMjQtMjR6bS05MiAxMzkuMjhhMy43MSAzLjcxIDAgMCAxIC0zLjcxIDMuNzJoLTE1LjgxYTMuNzEgMy43MSAwIDAgMSAtMy43Mi0zLjcydi02Ni4yOGEzLjcyIDMuNzIgMCAwIDEgMy43Mi0zLjcyaDE1LjgxYTMuNzIgMy43MiAwIDAgMSAzLjcxIDMuNzJ6bS0xMS42Mi03Ni4yOGExNSAxNSAwIDEgMSAxNS0xNSAxNSAxNSAwIDAgMSAtMTUgMTV6bTk0LjI2IDc2LjU0YTMuNDEgMy40MSAwIDAgMSAtMy40MiAzLjQyaC0xN2EzLjQxIDMuNDEgMCAwIDEgLTMuNDItMy40MnYtMzEuMDVjMC00LjY0IDEuMzYtMjAuMzItMTIuMTMtMjAuMzItMTAuNDUgMC0xMi41OCAxMC43My0xMyAxNS41NXYzNS44NmEzLjQyIDMuNDIgMCAwIDEgLTMuMzcgMy40MmgtMTYuNDJhMy40MSAzLjQxIDAgMCAxIC0zLjQxLTMuNDJ2LTY2Ljg3YTMuNDEgMy40MSAwIDAgMSAzLjQxLTMuNDJoMTYuNDJhMy40MiAzLjQyIDAgMCAxIDMuNDIgMy40MnY1Ljc4YzMuODgtNS44MyA5LjYzLTEwLjMxIDIxLjktMTAuMzEgMjcuMTggMCAyNyAyNS4zOCAyNyAzOS4zMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End -->

                                    <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/tim.png"
                              alt="Tim"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Tim</h4>
                              <p className="fs-15 text-light mb-3">
                                Co-Founder / CFO
                              </p>
                              <p className="fs-14 text-light mb-3">
                                35+ Years Experience Director of Business and
                                Sales Director
                              </p>
                              <div className="social-links d-flex flex-row justify-content-center">
                                <a
                                  href="https://www.instagram.com/backy1610/?igshid=YmMyMTA2M2Y%3D"
                                  target="_blank"
                                  className="mx-3"
                                >
                                  <img
                                    alt="Instagram"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='512' height='512' x='0' y='0' viewBox='0 0 409.61 409.61' style={{enableBackground:'new 0 0 512 512'}}  xml:space='preserve' className=''%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M307.205,0h-204.8C46.09,0,0.005,46.085,0.005,102.4v204.81c0,56.3,46.085,102.4,102.4,102.4h204.8 c56.315,0,102.4-46.1,102.4-102.4V102.4C409.605,46.085,363.52,0,307.205,0z M375.47,307.21c0,37.632-30.612,68.265-68.265,68.265 h-204.8c-37.637,0-68.265-30.633-68.265-68.265V102.4c0-37.642,30.628-68.265,68.265-68.265h204.8 c37.653,0,68.265,30.623,68.265,68.265V307.21z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='315.755' cy='93.865' r='25.6' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M204.805,102.4c-56.566,0-102.4,45.839-102.4,102.4c0,56.54,45.834,102.41,102.4,102.41c56.55,0,102.4-45.87,102.4-102.41 C307.205,148.239,261.355,102.4,204.805,102.4z M204.805,273.075c-37.699,0-68.265-30.566-68.265-68.275 s30.566-68.265,68.265-68.265s68.265,30.556,68.265,68.265S242.504,273.075,204.805,273.075z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                                  />
                                </a>
                                <a
                                  href="https://www.linkedin.com/in/tim-backlund-b4499867"
                                  target="_blank"
                                  className="mx-3"
                                >
                                  <img
                                    alt="Linkedin"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE3NiAxNzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9ImxpbmtlZGluIj48cGF0aCBpZD0iaWNvbiIgZD0ibTE1MiAwaC0xMjhhMjQgMjQgMCAwIDAgLTI0IDI0djEyOGEyNCAyNCAwIDAgMCAyNCAyNGgxMjhhMjQgMjQgMCAwIDAgMjQtMjR2LTEyOGEyNCAyNCAwIDAgMCAtMjQtMjR6bS05MiAxMzkuMjhhMy43MSAzLjcxIDAgMCAxIC0zLjcxIDMuNzJoLTE1LjgxYTMuNzEgMy43MSAwIDAgMSAtMy43Mi0zLjcydi02Ni4yOGEzLjcyIDMuNzIgMCAwIDEgMy43Mi0zLjcyaDE1LjgxYTMuNzIgMy43MiAwIDAgMSAzLjcxIDMuNzJ6bS0xMS42Mi03Ni4yOGExNSAxNSAwIDEgMSAxNS0xNSAxNSAxNSAwIDAgMSAtMTUgMTV6bTk0LjI2IDc2LjU0YTMuNDEgMy40MSAwIDAgMSAtMy40MiAzLjQyaC0xN2EzLjQxIDMuNDEgMCAwIDEgLTMuNDItMy40MnYtMzEuMDVjMC00LjY0IDEuMzYtMjAuMzItMTIuMTMtMjAuMzItMTAuNDUgMC0xMi41OCAxMC43My0xMyAxNS41NXYzNS44NmEzLjQyIDMuNDIgMCAwIDEgLTMuMzcgMy40MmgtMTYuNDJhMy40MSAzLjQxIDAgMCAxIC0zLjQxLTMuNDJ2LTY2Ljg3YTMuNDEgMy40MSAwIDAgMSAzLjQxLTMuNDJoMTYuNDJhMy40MiAzLjQyIDAgMCAxIDMuNDIgMy40MnY1Ljc4YzMuODgtNS44MyA5LjYzLTEwLjMxIDIxLjktMTAuMzEgMjcuMTggMCAyNyAyNS4zOCAyNyAzOS4zMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End -->

                                    <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/don.png"
                              alt="Don"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Don</h4>
                              <p className="fs-15 text-light mb-3">
                                Chief Operational Officer
                              </p>
                              <p className="fs-14 text-light mb-3">
                                30+ Years B2B Business Consultant
                              </p>
                              <div className="social-links d-flex flex-row justify-content-center">
                                <a
                                  href="https://www.instagram.com/damnitschunky/?igshid=YmMyMTA2M2Y%3D"
                                  target="_blank"
                                  className="mx-3"
                                >
                                  <img
                                    alt="Instagram"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='512' height='512' x='0' y='0' viewBox='0 0 409.61 409.61' style={{enableBackground:'new 0 0 512 512'}}  xml:space='preserve' className=''%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M307.205,0h-204.8C46.09,0,0.005,46.085,0.005,102.4v204.81c0,56.3,46.085,102.4,102.4,102.4h204.8 c56.315,0,102.4-46.1,102.4-102.4V102.4C409.605,46.085,363.52,0,307.205,0z M375.47,307.21c0,37.632-30.612,68.265-68.265,68.265 h-204.8c-37.637,0-68.265-30.633-68.265-68.265V102.4c0-37.642,30.628-68.265,68.265-68.265h204.8 c37.653,0,68.265,30.623,68.265,68.265V307.21z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='315.755' cy='93.865' r='25.6' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M204.805,102.4c-56.566,0-102.4,45.839-102.4,102.4c0,56.54,45.834,102.41,102.4,102.41c56.55,0,102.4-45.87,102.4-102.41 C307.205,148.239,261.355,102.4,204.805,102.4z M204.805,273.075c-37.699,0-68.265-30.566-68.265-68.275 s30.566-68.265,68.265-68.265s68.265,30.556,68.265,68.265S242.504,273.075,204.805,273.075z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                                  />
                                </a>
                                <a
                                  href="https://www.linkedin.com/mwlite/in/don-decotis-cpc-78b855"
                                  target="_blank"
                                  className="mx-3"
                                >
                                  <img
                                    alt="Linkedin"
                                    width="25"
                                    height="25"
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE3NiAxNzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9ImxpbmtlZGluIj48cGF0aCBpZD0iaWNvbiIgZD0ibTE1MiAwaC0xMjhhMjQgMjQgMCAwIDAgLTI0IDI0djEyOGEyNCAyNCAwIDAgMCAyNCAyNGgxMjhhMjQgMjQgMCAwIDAgMjQtMjR2LTEyOGEyNCAyNCAwIDAgMCAtMjQtMjR6bS05MiAxMzkuMjhhMy43MSAzLjcxIDAgMCAxIC0zLjcxIDMuNzJoLTE1LjgxYTMuNzEgMy43MSAwIDAgMSAtMy43Mi0zLjcydi02Ni4yOGEzLjcyIDMuNzIgMCAwIDEgMy43Mi0zLjcyaDE1LjgxYTMuNzIgMy43MiAwIDAgMSAzLjcxIDMuNzJ6bS0xMS42Mi03Ni4yOGExNSAxNSAwIDEgMSAxNS0xNSAxNSAxNSAwIDAgMSAtMTUgMTV6bTk0LjI2IDc2LjU0YTMuNDEgMy40MSAwIDAgMSAtMy40MiAzLjQyaC0xN2EzLjQxIDMuNDEgMCAwIDEgLTMuNDItMy40MnYtMzEuMDVjMC00LjY0IDEuMzYtMjAuMzItMTIuMTMtMjAuMzItMTAuNDUgMC0xMi41OCAxMC43My0xMyAxNS41NXYzNS44NmEzLjQyIDMuNDIgMCAwIDEgLTMuMzcgMy40MmgtMTYuNDJhMy40MSAzLjQxIDAgMCAxIC0zLjQxLTMuNDJ2LTY2Ljg3YTMuNDEgMy40MSAwIDAgMSAzLjQxLTMuNDJoMTYuNDJhMy40MiAzLjQyIDAgMCAxIDMuNDIgMy40MnY1Ljc4YzMuODgtNS44MyA5LjYzLTEwLjMxIDIxLjktMTAuMzEgMjcuMTggMCAyNyAyNS4zOCAyNyAzOS4zMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End -->

                                    <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/chunky.png"
                              alt="Chunky"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Matt</h4>
                              <p className="fs-15 text-light mb-3">Legal</p>
                              <p className="fs-14 text-light mb-3">
                                Multi-Million Dollar Advoactes Forum. Chief
                                Executive Board
                              </p>
                              <a
                                href="https://www.linkedin.com/in/matt-hamilton-ba416714"
                                target="_blank"
                                className="mx-3"
                              >
                                <img
                                  alt="Linkedin"
                                  width="25"
                                  height="25"
                                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE3NiAxNzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9ImxpbmtlZGluIj48cGF0aCBpZD0iaWNvbiIgZD0ibTE1MiAwaC0xMjhhMjQgMjQgMCAwIDAgLTI0IDI0djEyOGEyNCAyNCAwIDAgMCAyNCAyNGgxMjhhMjQgMjQgMCAwIDAgMjQtMjR2LTEyOGEyNCAyNCAwIDAgMCAtMjQtMjR6bS05MiAxMzkuMjhhMy43MSAzLjcxIDAgMCAxIC0zLjcxIDMuNzJoLTE1LjgxYTMuNzEgMy43MSAwIDAgMSAtMy43Mi0zLjcydi02Ni4yOGEzLjcyIDMuNzIgMCAwIDEgMy43Mi0zLjcyaDE1LjgxYTMuNzIgMy43MiAwIDAgMSAzLjcxIDMuNzJ6bS0xMS42Mi03Ni4yOGExNSAxNSAwIDEgMSAxNS0xNSAxNSAxNSAwIDAgMSAtMTUgMTV6bTk0LjI2IDc2LjU0YTMuNDEgMy40MSAwIDAgMSAtMy40MiAzLjQyaC0xN2EzLjQxIDMuNDEgMCAwIDEgLTMuNDItMy40MnYtMzEuMDVjMC00LjY0IDEuMzYtMjAuMzItMTIuMTMtMjAuMzItMTAuNDUgMC0xMi41OCAxMC43My0xMyAxNS41NXYzNS44NmEzLjQyIDMuNDIgMCAwIDEgLTMuMzcgMy40MmgtMTYuNDJhMy40MSAzLjQxIDAgMCAxIC0zLjQxLTMuNDJ2LTY2Ljg3YTMuNDEgMy40MSAwIDAgMSAzLjQxLTMuNDJoMTYuNDJhMy40MiAzLjQyIDAgMCAxIDMuNDIgMy40MnY1Ljc4YzMuODgtNS44MyA5LjYzLTEwLjMxIDIxLjktMTAuMzEgMjcuMTggMCAyNyAyNS4zOCAyNyAzOS4zMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End -->

                                    <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/mando.png"
                              alt="Mando"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Anas</h4>
                              <p className="fs-15 text-light mb-3">Developer</p>
                              <p className="fs-14 text-light mb-3">
                                Full-Stack Developer with 10+ in Experience. CA
                                Finalist
                              </p>
                              <a
                                href="ttps://www.linkedin.com/in/AnasBaigMughal/"
                                target="_blank"
                                className="mx-3"
                              >
                                <img
                                  alt="Linkedin"
                                  width="25"
                                  height="25"
                                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE3NiAxNzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9ImxpbmtlZGluIj48cGF0aCBpZD0iaWNvbiIgZD0ibTE1MiAwaC0xMjhhMjQgMjQgMCAwIDAgLTI0IDI0djEyOGEyNCAyNCAwIDAgMCAyNCAyNGgxMjhhMjQgMjQgMCAwIDAgMjQtMjR2LTEyOGEyNCAyNCAwIDAgMCAtMjQtMjR6bS05MiAxMzkuMjhhMy43MSAzLjcxIDAgMCAxIC0zLjcxIDMuNzJoLTE1LjgxYTMuNzEgMy43MSAwIDAgMSAtMy43Mi0zLjcydi02Ni4yOGEzLjcyIDMuNzIgMCAwIDEgMy43Mi0zLjcyaDE1LjgxYTMuNzIgMy43MiAwIDAgMSAzLjcxIDMuNzJ6bS0xMS42Mi03Ni4yOGExNSAxNSAwIDEgMSAxNS0xNSAxNSAxNSAwIDAgMSAtMTUgMTV6bTk0LjI2IDc2LjU0YTMuNDEgMy40MSAwIDAgMSAtMy40MiAzLjQyaC0xN2EzLjQxIDMuNDEgMCAwIDEgLTMuNDItMy40MnYtMzEuMDVjMC00LjY0IDEuMzYtMjAuMzItMTIuMTMtMjAuMzItMTAuNDUgMC0xMi41OCAxMC43My0xMyAxNS41NXYzNS44NmEzLjQyIDMuNDIgMCAwIDEgLTMuMzcgMy40MmgtMTYuNDJhMy40MSAzLjQxIDAgMCAxIC0zLjQxLTMuNDJ2LTY2Ljg3YTMuNDEgMy40MSAwIDAgMSAzLjQxLTMuNDJoMTYuNDJhMy40MiAzLjQyIDAgMCAxIDMuNDIgMy40MnY1Ljc4YzMuODgtNS44MyA5LjYzLTEwLjMxIDIxLjktMTAuMzEgMjcuMTggMCAyNyAyNS4zOCAyNyAzOS4zMnoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz4="
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End -->

                                    <!-- Single Item Start --> */}
                      <div className="team-item text-center">
                        <div className="morph-bg">
                          <div className="team-item-img">
                            <img
                              src="img/team/angel.png"
                              alt="Angel"
                              className="img-fluid"
                            />
                          </div>
                          <div className="team-item-info my-4 text-center">
                            <div className="size-wrap">
                              <h4 className="fs-30 text-light mb-2">Angel</h4>
                              <p className="fs-15 text-light mb-3">
                                Collaboration Manager
                              </p>
                              <p className="fs-14 text-light mb-3">
                                Operational Excellence, Team Support/ Develop
                                Network w/ External Parties
                              </p>
                              <a
                                href="https://instagram.com/angelcorreaaa_?igshid=YmMyMTA2M2Y="
                                target="_blank"
                              >
                                <img
                                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='512' height='512' x='0' y='0' viewBox='0 0 409.61 409.61' style={{enableBackground:'new 0 0 512 512'}}  xml:space='preserve' className=''%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M307.205,0h-204.8C46.09,0,0.005,46.085,0.005,102.4v204.81c0,56.3,46.085,102.4,102.4,102.4h204.8 c56.315,0,102.4-46.1,102.4-102.4V102.4C409.605,46.085,363.52,0,307.205,0z M375.47,307.21c0,37.632-30.612,68.265-68.265,68.265 h-204.8c-37.637,0-68.265-30.633-68.265-68.265V102.4c0-37.642,30.628-68.265,68.265-68.265h204.8 c37.653,0,68.265,30.623,68.265,68.265V307.21z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Ccircle cx='315.755' cy='93.865' r='25.6' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M204.805,102.4c-56.566,0-102.4,45.839-102.4,102.4c0,56.54,45.834,102.41,102.4,102.41c56.55,0,102.4-45.87,102.4-102.41 C307.205,148.239,261.355,102.4,204.805,102.4z M204.805,273.075c-37.699,0-68.265-30.566-68.265-68.275 s30.566-68.265,68.265-68.265s68.265,30.556,68.265,68.265S242.504,273.075,204.805,273.075z' fill='%23ffffff' data-original='%23000000' className=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                                  alt="Instagram"
                                  width="25"
                                  height="25"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Single Item End --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Our Team End -->

            <!-- Investors & Partners --> */}
          <section id="litepaper">
            <div className="litepaper py-md-5">
              <div className="container py-5">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className="size-wrap text-center px-md-5">
                      <h2 className="fs-50 text-uppercase text-rose mb-2 mb-md-4 fw-bold">
                        Investors & Partners
                      </h2>
                      <br />
                      <img
                        src="logos/2B2B2267-2D64-4095-AB88-3CDE98394B88.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/0F00F08B-E056-483D-9383-02275574EF19.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/1C333C03-B7F0-4845-A958-0A90A0EEE38D.png"
                        alt="Angel"
                        className="imge"
                      />
                      <br />
                      <img
                        src="logos/3C22F3FC-1E8E-4D79-BFA1-E11CB9DEA510.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/5D984AB7-E521-4B82-B09D-2EE17F9BAF6C.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/4D5B8C68-C97C-4BCF-966E-853B9CD760B9.png"
                        alt="Angel"
                        className="imge"
                      />
                      <br />
                      <img
                        src="logos/6C27892B-28CE-4DD1-94CA-42A1C5C1FF4A.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/8BE3E246-A17B-49D5-8898-E4EB6B22AF2F.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/9E691CDD-13AE-43B4-BB15-BE40F0FF1001.png"
                        alt="Angel"
                        className="imge"
                      />
                      <br />
                      <img
                        src="logos/96C50BDA-1A8C-445D-8448-EA2F2BCB2105.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/578B0B1C-CE31-4860-9514-61B6D56CD471.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/80468F83-0FF5-42D8-9439-22D934976356.png"
                        alt="Angel"
                        className="imge"
                      />
                      <br />
                      <img
                        src="logos/B0742CC0-B20E-419C-A935-A9682988EF1E.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/D92CBF2C-6BC6-4887-9304-6E763426AB4D.png"
                        alt="Angel"
                        className="imge"
                      />
                      <img
                        src="logos/D834C05F-6EDA-4B8C-BD44-710C2D93FBE0.png"
                        alt="Angel"
                        className="imge"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Investors & Partners -->

            <!-- How To Buy FLYY Token Start --> */}
          <section id="how-to-buy">
            <div className="how-to-buy py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-center text-uppercase text-rose mb-3 mb-md-5 fw-bold">
                        How to Buy
                        <span className="text-shadow">$FLYY Token</span>
                      </h2>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="size-wrap mb-5">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          1
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          MetaMask
                        </h3>
                        <p className="fs-16 text-light mb-0">
                          Load your MetaMask with ETH (ETHEREUM) & Connect it to
                          FlyGuyz Website
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="size-wrap mb-5">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          2
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          Enter ETH
                        </h3>
                        <p className="fs-16 text-light mb-0">
                          Enter total amount of ETH you wish to use in the slide
                          bar. It will show the amount of $FLYY token you are
                          receiving
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="size-wrap mb-5">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          3
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          Pay ETH (ETHEREUM)
                        </h3>
                        <p className="fs-16 text-light mb-0">
                          Pay the ETH (ETHEREUM) from your MetaMask. Once your
                          transaction is validated, you will receive $FLYY token
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="size-wrap mb-5 mb-md-0">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          4
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          Import $FLYY in MetaMask
                        </h3>
                        <p className="fs-16 text-light mb-2">
                          Click on Import Tokens in MetaMask and type in the
                          contract address.
                        </p>
                        <p className="fs-16 text-light mb-0 text-truncate">
                          0xdEF36a0653D4992c3614362553C446ce41488a46
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="size-wrap mb-5 mb-md-0">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          5
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          Import Vested $VFLYY in MetaMask
                        </h3>
                        <p className="fs-16 text-light mb-2">
                          Click on Import Tokens in MetaMask and type in the
                          vesting contract address.
                        </p>
                        <p className="fs-16 text-light mb-0 text-truncate">
                          0xDbD185b1dF18c4a69795041B4De4B5154957E6fF
                        </p>
                        <p className="fs-16 text-light mb-0">
                          Your vested tokens will show up as $VFLYY in MetaMask.
                          Take note of vesting schedules.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="size-wrap">
                      <div className="step-no d-flex align-items-center justify-content-center morph-bg p-0 rounded-circle mb-4">
                        <h3 className="fs-30 text-uppercase text-center mb-0 fw-bold">
                          6
                        </h3>
                      </div>
                      <div className="step-text">
                        <h3 className="fs-30 text-uppercase text-rose mb-2 fw-bold">
                          Claim $FLYY Token
                        </h3>
                        <p className="fs-16 text-light mb-0">
                          Head to the claim page at the top of our website. You
                          will need to claim your tokens after the initial cliff
                          or when you would like to claim your tokens as per
                          vesting schedule.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- How To Buy FLYY Token End -->

            <!-- Powered By Start --> */}
          <section id="powered-by">
            <div className="powered-by py-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-12">
                    <div className="size-wrap">
                      <h2 className="fs-50 text-uppercase text-rose fw-bold text-center mb-3">
                        <span className="text-shadow">Powered</span>
                        By
                      </h2>

                      <ul className="list-unstyled m-0 p-0 d-flex align-items-center justify-content-center flex-wrap row-cols-auto mt-5">
                        <li>
                          <img
                            src="img/logos/1.png"
                            alt="Logo 1"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/2.png"
                            alt="Logo 2"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/3.png"
                            alt="Logo 3"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/4.png"
                            alt="Logo 4"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/5.png"
                            alt="Logo 5"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/6.png"
                            alt="Logo 6"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/7.png"
                            alt="Logo 7"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                        <li>
                          <img
                            src="img/logos/8.png"
                            alt="Logo 8"
                            className="img-fluid mx-4 my-3"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Powered By End -->

            <!-- Contat Us Start --> */}
          <section id="contact-us">
            <div className="contact-us pb-md-5">
              <div className="container py-5">
                <div className="row">
                  <div className="col-md-5">
                    <div className="size-wrap pt-0 pt-md-5 pe-3 pe-md-5 pb-5 pb-md-0">
                      <h2 className="fs-50 text-uppercase text-rose fw-bold mb-0">
                        Drop Us A<span className="text-shadow">Line</span>
                      </h2>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="size-wrap ps-0 ps-md-5">
                      <div className="form-wrap morph-bg">
                        <form id="contactUs" onSubmit={handleSubmit}>
                          <div className="mb-3 mb-md-4">
                            <label htmlFor="name" className="form-label">
                              Your Name
                            </label>
                            <input
                              type="text"
                              name="Full Name"
                              className="form-control"
                              id="name"
                              aria-describedby="nameHelp"
                              required
                              placeholder="Your name"
                            />
                          </div>
                          <div className="mb-3 mb-md-4">
                            <label htmlFor="email" className="form-label">
                              Your Email
                            </label>
                            <input
                              type="email"
                              name="Email"
                              className="form-control"
                              id="email"
                              aria-describedby="emailHelp"
                              required
                              placeholder="example@mail.com"
                            />
                          </div>
                          <div className="mb-3 mb-md-4">
                            <label htmlFor="subject" className="form-label">
                              Subject
                            </label>
                            <input
                              type="text"
                              name="Subject"
                              className="form-control"
                              id="subject"
                              aria-describedby="subjectHelp"
                              required
                              placeholder="Subject"
                            />
                          </div>
                          <div className="mb-5">
                            <label
                              htmlFor="textareaMessage"
                              className="form-label"
                            >
                              Message
                            </label>
                            <textarea
                              className="form-control"
                              name="Message"
                              id="textareaMessage"
                              rows="3"
                              required
                              placeholder="Message ..."
                            ></textarea>
                          </div>
                          <button
                            id="submitContact"
                            type="submit"
                            className="btn btn-blue rounded-pill w-100"
                          >
                            Submit
                          </button>
                        </form>
                        <p
                          id="contactStatus"
                          className="fs-22 text-info fw-normal my-4 text-center"
                        >
                          {statusMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Contat Us End -->

            <!-- Footer Start --> */}
          <footer className="py-4 py-md-5">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className="footer-text size-wrap">
                    <p className="fs-14 fw-normal text-light mb-0">
                      &copy; All Rights reserved by FlyGuyz.io
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="size-wrap">
                    <ul className="list-unstyled d-flex align-items-center justify-content-end flex-row m-0 p-0">
                      <li className="me-3">
                        <a
                          href="https://mobile.twitter.com/flyguyzofficial"
                          target="_blank"
                        >
                          <img
                            alt="twitter"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjQuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIKCSBpZD0ic3ZnMiIgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5IiBzb2RpcG9kaTpkb2NuYW1lPSJUd2l0dGVyX2JpcmRfbG9nb18yMDEyLnN2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxNzEuNSAxMzkuNCIKCSBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNzEuNSAxMzkuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8c29kaXBvZGk6bmFtZWR2aWV3ICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgYm9yZGVyb3BhY2l0eT0iMS4wIiBmaXQtbWFyZ2luLWJvdHRvbT0iMCIgZml0LW1hcmdpbi1sZWZ0PSIwIiBmaXQtbWFyZ2luLXJpZ2h0PSIwIiBmaXQtbWFyZ2luLXRvcD0iMCIgaWQ9ImJhc2UiIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIgaW5rc2NhcGU6Y3g9IjEwMS4yOTQxMyIgaW5rc2NhcGU6Y3k9IjUwLjE4MTE0MiIgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IiBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NjIiIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgaW5rc2NhcGU6d2luZG93LXg9Ii04IiBpbmtzY2FwZTp3aW5kb3cteT0iLTgiIGlua3NjYXBlOnpvb209IjMuNzIwMDU3MSIgcGFnZWNvbG9yPSIjZmZmZmZmIiBzaG93Z3JpZD0iZmFsc2UiPgoJPC9zb2RpcG9kaTpuYW1lZHZpZXc+CjxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yODIuMzIwNTMsLTM5Ni4zMDczNCkiIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIj4KCTxwYXRoIGlkPSJwYXRoNSIgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgY2xhc3M9InN0MCIgZD0iTTQ1My44LDQxMi44Yy02LjMsMi44LTEzLjEsNC43LTIwLjIsNS41CgkJYzcuMy00LjQsMTIuOC0xMS4yLDE1LjUtMTkuNWMtNi44LDQtMTQuMyw3LTIyLjMsOC41Yy02LjQtNi44LTE1LjYtMTEuMS0yNS43LTExLjFjLTE5LjQsMC0zNS4yLDE1LjgtMzUuMiwzNS4yCgkJYzAsMi44LDAuMyw1LjQsMC45LDhjLTI5LjItMS41LTU1LjItMTUuNS03Mi41LTM2LjhjLTMsNS4yLTQuOCwxMS4yLTQuOCwxNy43YzAsMTIuMiw2LjIsMjMsMTUuNywyOS4zYy01LjgtMC4yLTExLjItMS44LTE1LjktNC40CgkJYzAsMC4xLDAsMC4zLDAsMC40YzAsMTcsMTIuMSwzMS4zLDI4LjIsMzQuNWMtMywwLjgtNi4xLDEuMi05LjMsMS4yYy0yLjMsMC00LjUtMC4yLTYuNi0wLjZjNC41LDE0LDE3LjUsMjQuMiwzMi45LDI0LjQKCQljLTEyLDkuNC0yNy4yLDE1LjEtNDMuNywxNS4xYy0yLjgsMC01LjYtMC4yLTguNC0wLjVjMTUuNiwxMCwzNC4xLDE1LjgsNTMuOSwxNS44YzY0LjcsMCwxMDAuMS01My42LDEwMC4xLTEwMC4xCgkJYzAtMS41LDAtMy0wLjEtNC42QzQ0My4xLDQyNi4xLDQ0OS4xLDQxOS45LDQ1My44LDQxMi44TDQ1My44LDQxMi44eiIvPgo8L2c+Cjwvc3ZnPgo="
                            width="25"
                            height="25"
                          />
                        </a>
                      </li>
                      <li className="ms-3">
                        <a href="https://t.me/FlyGuyzChat" target="_blank">
                          <img
                            src="logos/insta.svg"
                            alt="Instagram"
                            width="25"
                            height="25"
                          />
                        </a>
                      </li>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <li className="nav-item desktop-icons">
                        <a
                          className="nav-link"
                          href="https://discord.com/invite/flyguyz"
                          target="_blank"
                        >
                          <img
                            alt="twitter"
                            src="logos/discord.png"
                            width="25"
                            height="25"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* <!-- Footer End --> */}
        </div>
      </div>
    </div>
  );
}
