/* =========================================================
   NETWORK ADMIN LAB
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileNav =
        document.getElementById("mobileNav");


    if (menuButton) {

        menuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("open");

            const icon =
                menuButton.querySelector("i");

            if (mobileNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    }


    document
        .querySelectorAll(".mobile-nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    const navObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                        });


                        const activeLink =
                            document.querySelector(
                                `.nav-links a[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });



    /* =====================================================
       PARTICLES
    ===================================================== */

    const particlesContainer =
        document.getElementById("particles");


    if (particlesContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.classList.add("particle");

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDuration =
                (8 + Math.random() * 12) + "s";

            particle.style.animationDelay =
                (Math.random() * 10) + "s";

            particle.style.transform =
                `scale(${0.5 + Math.random()})`;

            particlesContainer.appendChild(
                particle
            );

        }

    }



    /* =====================================================
       COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".intro-number"
        );


    let countersStarted = false;


    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;

            const duration = 1200;

            const start =
                performance.now();


            function update(time) {

                const progress =
                    Math.min(
                        (time - start) / duration,
                        1
                    );


                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                current =
                    Math.floor(
                        eased * target
                    );


                counter.textContent =
                    current;


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    counter.textContent =
                        target + "+";

                }

            }


            requestAnimationFrame(update);

        });

    }


    const introStrip =
        document.querySelector(".intro-strip");


    if (introStrip) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    if (
                        entries[0].isIntersecting
                    ) {

                        startCounters();

                    }

                },
                {
                    threshold: .5
                }
            );


        counterObserver.observe(
            introStrip
        );

    }



    /* =====================================================
       SKILL BARS
    ===================================================== */

    const skillProgress =
        document.querySelectorAll(
            ".skill-progress"
        );


    const skillObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const progress =
                            entry.target.dataset.progress;

                        entry.target.style.width =
                            progress + "%";

                        skillObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .4
            }
        );


    skillProgress.forEach(bar => {

        skillObserver.observe(bar);

    });



    /* =====================================================
       LAPTOP INTERACTION
    ===================================================== */

    const laptopStage =
        document.getElementById(
            "laptopStage"
        );

    const laptopObject =
        document.getElementById(
            "laptopObject"
        );

    const laptopImage =
        document.getElementById(
            "laptopImage"
        );

    const rotateButton =
        document.getElementById(
            "rotateButton"
        );

    const openButton =
        document.getElementById(
            "openButton"
        );

    const componentsButton =
        document.getElementById(
            "componentsButton"
        );


    let rotation = 0;

    let dragging = false;

    let startX = 0;

    let startRotation = 0;

    let isOpen = false;

    let componentsVisible = false;



    /* -----------------------------------------------------
       ROTATION 360
    ----------------------------------------------------- */

    if (rotateButton) {

        rotateButton.addEventListener(
            "click",
            () => {

                laptopObject.classList.remove(
                    "spinning"
                );


                void laptopObject.offsetWidth;


                laptopObject.classList.add(
                    "spinning"
                );


                rotation += 360;


                laptopObject.style.transform =
                    `rotateY(${rotation}deg)`;


                setTimeout(() => {

                    laptopObject.classList.remove(
                        "spinning"
                    );

                }, 2200);

            }
        );

    }



    /* -----------------------------------------------------
       OUVERTURE / FERMETURE
    ----------------------------------------------------- */

    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                isOpen = !isOpen;


                if (isOpen) {

                    laptopImage.src =
                        "assets/images/laptop-open.png.jpg";


                    laptopObject.classList.add(
                        "opened"
                    );


                    openButton.innerHTML =
                        `<i class="fa-solid fa-laptop"></i>
                         Fermer le PC`;

                } else {

                    laptopImage.src =
                        "assets/images/laptop.png.png";


                    laptopObject.classList.remove(
                        "opened"
                    );


                    openButton.innerHTML =
                        `<i class="fa-solid fa-laptop"></i>
                         Ouvrir le PC`;

                }

            }
        );

    }



    /* -----------------------------------------------------
       MODE COMPOSANTS
    ----------------------------------------------------- */

    if (componentsButton) {

        componentsButton.addEventListener(
            "click",
            () => {

                componentsVisible =
                    !componentsVisible;


                if (componentsVisible) {

                    laptopImage.src =
                        "assets/images/laptop-open.png.jpg";


                    laptopObject.classList.add(
                        "components"
                    );


                    componentsButton.classList.add(
                        "active"
                    );


                    componentsButton.innerHTML =
                        `<i class="fa-solid fa-eye-slash"></i>
                         Masquer`;

                } else {

                    laptopImage.src =
                        isOpen
                            ? "assets/images/laptop-open.png.jpg"
                            : "assets/images/laptop.png.png";


                    laptopObject.classList.remove(
                        "components"
                    );


                    componentsButton.classList.remove(
                        "active"
                    );


                    componentsButton.innerHTML =
                        `<i class="fa-solid fa-microchip"></i>
                         Composants`;

                }

            }
        );

    }



    /* -----------------------------------------------------
       DRAG ROTATION
    ----------------------------------------------------- */

    if (laptopStage) {

        laptopStage.addEventListener(
            "pointerdown",
            event => {

                dragging = true;

                startX = event.clientX;

                startRotation = rotation;

                laptopStage.setPointerCapture(
                    event.pointerId
                );

            }
        );


        laptopStage.addEventListener(
            "pointermove",
            event => {

                if (!dragging) return;


                const difference =
                    event.clientX - startX;


                rotation =
                    startRotation +
                    difference * 0.6;


                laptopObject.style.transform =
                    `rotateY(${rotation}deg)`;

            }
        );


        const stopDragging = () => {

            dragging = false;

        };


        laptopStage.addEventListener(
            "pointerup",
            stopDragging
        );


        laptopStage.addEventListener(
            "pointercancel",
            stopDragging
        );

    }



    /* =====================================================
       NETWORK LIVE DATA
    ===================================================== */

    const latency =
        document.getElementById(
            "latency"
        );

    const packetLoss =
        document.getElementById(
            "packetLoss"
        );


    function updateNetwork() {

        if (latency) {

            const value =
                Math.floor(
                    15 +
                    Math.random() * 25
                );

            latency.textContent =
                value + " ms";

        }


        if (packetLoss) {

            const value =
                (
                    Math.random() * .5
                ).toFixed(1);

            packetLoss.textContent =
                value + "%";

        }

    }


    setInterval(
        updateNetwork,
        1800
    );



    /* =====================================================
       CPU / MEMORY
    ===================================================== */

    const cpuValue =
        document.getElementById(
            "cpuValue"
        );

    const cpuBar =
        document.getElementById(
            "cpuBar"
        );

    const memoryValue =
        document.getElementById(
            "memoryValue"
        );

    const memoryBar =
        document.getElementById(
            "memoryBar"
        );


    function updateMetrics() {

        const cpu =
            Math.floor(
                30 + Math.random() * 45
            );


        const memory =
            Math.floor(
                45 + Math.random() * 35
            );


        if (cpuValue) {

            cpuValue.textContent =
                cpu + "%";

        }


        if (cpuBar) {

            cpuBar.style.width =
                cpu + "%";

        }


        if (memoryValue) {

            memoryValue.textContent =
                memory + "%";

        }


        if (memoryBar) {

            memoryBar.style.width =
                memory + "%";

        }

    }


    setInterval(
        updateMetrics,
        2200
    );



    /* =====================================================
       PARALLAX LAPTOP
    ===================================================== */

    const laptopWrapper =
        document.querySelector(
            ".laptop-wrapper"
        );


    if (
        laptopWrapper &&
        window.innerWidth > 900
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5) * 8;


                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5) * 8;


                laptopWrapper.style.transform =
                    `translate(
                        ${x}px,
                        ${y}px
                    )`;

            }
        );

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        document.getElementById(
            "backTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 600
            ) {

                backTop.classList.add(
                    "visible"
                );

            } else {

                backTop.classList.remove(
                    "visible"
                );

            }

        }
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const notification =
        document.getElementById(
            "notification"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                notification.classList.add(
                    "show"
                );


                contactForm.reset();


                setTimeout(() => {

                    notification.classList.remove(
                        "show"
                    );

                }, 3500);

            }
        );

    }



    /* =====================================================
       3D TILT ON PROJECT CARDS
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    20;


                const rotateY =
                    (centerX - x) /
                    20;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });



    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(
            ".button, .send-button, .project-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.style.position =
                        "absolute";


                    ripple.style.width =
                        "10px";


                    ripple.style.height =
                        "10px";


                    ripple.style.borderRadius =
                        "50%";


                    ripple.style.background =
                        "rgba(255,255,255,.35)";


                    ripple.style.pointerEvents =
                        "none";


                    const rect =
                        button.getBoundingClientRect();


                    ripple.style.left =
                        (event.clientX -
                            rect.left) + "px";


                    ripple.style.top =
                        (event.clientY -
                            rect.top) + "px";


                    ripple.style.transform =
                        "translate(-50%,-50%) scale(0)";


                    ripple.style.transition =
                        "transform .5s, opacity .5s";


                    button.style.position =
                        "relative";


                    button.style.overflow =
                        "hidden";


                    button.appendChild(
                        ripple
                    );


                    requestAnimationFrame(
                        () => {

                            ripple.style.transform =
                                "translate(-50%,-50%) scale(20)";

                            ripple.style.opacity =
                                "0";

                        }
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        550
                    );

                }
            );

        });

});
