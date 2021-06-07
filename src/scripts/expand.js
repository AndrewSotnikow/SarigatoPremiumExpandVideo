/**
 * @file Stores functions invoked when expand ready
 * @name expand.js
 * @copyright (c) 2017, Sarigato Sp z o. o. All rights reserved.
 * @version 2.0.0
 */

/** Function invoked when expand configuration is ready
 * @function Sataku.expand
 * @param {object} that {@link Sataku} object
 * @param {object} _that {@link Sataku~_that} object
 * @returns {undefined}
 */
Sataku.expand = (function () {
    return function (that, _that) {
        if ([CREATION_TYPE_RICH_EXPAND, CREATION_TYPE_MOBILE_EXPAND_RICH].indexOf(that.config.creationType) === -1) {
            _that.players.forEach(player => {
                player.setVideo();
            });
            _that.player.start();
        }

        if (that.config.deviceType === DEVICE_TYPE_DESKTOP) {
            var resizeHandler = function () {
                var overflowVal = _that.doc.expandWorkspace.clientHeight - window.innerHeight;
                _that.doc.expandWorkspace[overflowVal > 0 ? 'stkAddClass' : 'stkRemoveClass']('fixed');

                // uncomment if players` controls are overflowing outside of #expand-workspace
                // if (overflowVal > 0) {
                //     _that.players.forEach(player => {
                //         player.reactToVerticalOverflow(_that.doc.expandWorkspace, overflowVal);
                //     });
                // }
            };
            window.stkListen('resize', resizeHandler, false);
            resizeHandler();
        }

        mainFunction(that, _that);
        _that.doc.expand.stkStyleElement({
            visibility: 'visible',
            // backgroundColor: '#000'
        });


        stkLazyLoad('[data-src]', function () {

            // console.log('Images loaded.');
        });

        Window.APP.intro();

        // example: pixelHelper.custom(1); or pixelHelper.label('label');
        // var pixelHelper = _that.pixelHelper;

    };
})();

/** Function invoked when closing expand
 * @function Sataku.expandOutro
 * @param {function} callback Callback to invoke on complete of outro
 */
Sataku.expandOutro = function (callback) {

    Window.APP.outro(callback);
    // Here we animate outro tweens.
    // callback();
};


function mainFunction(that, _that) {

    Window.APP = {};
    Window.APP.intro = intro;
    Window.APP.outro = outro;

    const e = (() => {
        let id = s => document.getElementById(s);
        let cl = s => document.querySelector(s);
        let csa = s => [...document.querySelectorAll(s)];
        return  {
            intro: id('intro'),
            bgViolet: id('bgViolet'),
            bgPink: id('bgPink'),
            bgGrey: id('bgGrey'),
            bg: csa(".bg"),
            bottle: id("bottle"),
            bottle2: id("bottle2"),
            bottleShadow: id("bottleShadow"),
            glass: id("glass"),
            tin: id("tin"),
            tin2: id("tin2"),
            tinShadow: id("tinShadow"),
            prodContainer: id("prodContainer"),
            product: csa(".product"),
            dragElements: csa(".dropElement"),
            dragContainer: cl(".dragContainer"),
            staticImg: id("static"),
            shaker: id("shaker"),
            shakerContainer: cl(".shaker"),
            lid: id("lid"),
            shakerShadow: id("shakerShadow"),
            circle: id("circle"),
            bgLeft: cl(".bgLeft"),
            logo: cl(".logo"),
            text: cl(".text"),
            cta: id("cta"),
            bgCta: cl(".bgCta"),
            legal: cl(".legal"),
            bgRight: cl(".bgRight"),
            go: cl(".go"),
            guide2: id("guide2"),
            guide: id("guide"),
            close: id("close-expand"),
            expand: id("expand"),
            counter: cl(".counter"),
            counterContainer: id("container"),
            repeat: id("repeat"),
            stepsNumbers: csa(".number"),
            droppedItemCounter: 0,
            maxCounter: 3,
            state: {
                stage2: false,
                stopGame: false,
                replayGame: false,
                runInterval: false,
            },
            intervalId: {
                prodRotationId: null,
                prodRotationId2: null,
            },
            method: {
                removeClass: function (arr, className) {
                    arr.map(el => {
                        el.classList.remove(className);
                    });
                },
                addClass: function (arr, className) {
                    arr.map(el => {
                        el.classList.add(className);
                    });
                },
                productRotation: function () {
                    e.bottle2.classList.toggle("hide");
                    e.tin2.classList.toggle("hide");
                },
                productShadowRotation: function () {
                    e.bottleShadow.classList.toggle("hide");
                    e.tinShadow.classList.toggle("hide");
                },
                productInterval: function () {
                        e.bottle2.classList.remove("hide");
                        e.tin2.classList.add("hide");
                        e.bottleShadow.classList.remove("hide");
                        e.prodRotationId2 = setInterval(() => {
                            e.method.productRotation();
                            e.method.productShadowRotation();
                        }, 3000);
                        setTimeout(() => {
                            e.prodRotationId = setInterval(() => {
                                e.method.productRotation();
                                e.method.productShadowRotation()
                            }, 3000);
                        }, 1500);

                }
            },
            mainIntro: function () {
                let leftSide = [e.logo, e.text, e.legal, e.bgCta];
                let rightSide = [e.go, e.counter, e.close, e.bg[2]];
                let center = [e.staticImg, e.cta, e.shaker, e.shakerContainer, e.shakerShadow, e.close, e.circle, e.guide, e.guide2, e.dragContainer, ...e.dragElements];
                setTimeout(() => {
                    e.method.removeClass(e.bg, "expandTransitionLeft");
                    setTimeout(() => {
                        e.method.removeClass(rightSide, "expandTransitionRight");
                        e.method.removeClass(leftSide, "expandTransitionLeft");
                    }, 500);
                    setTimeout(() => {
                        center.forEach(el => {
                            el.classList.remove("hide");
                            el.classList.remove("translateUp");
                            e.dragContainer.classList.add("hand");
                        });
                    }, 800);

                }, 300);
            },
            endGame: function () {
                const stage2addClass = [e.circle, e.guide, e.counterContainer];
                const stage2removeClass = [e.bottle2, e.prodContainer,];
                    e.lid.classList.remove("hide");
                    setTimeout(() => {
                        e.lid.classList.remove("translateUp");
                        e.dragElements.map(el => {
                            el.classList.add("hide");
                        });
                        e.method.addClass(stage2addClass, "hide");
                        e.repeat.classList.remove("hide");
                        e.product.map(el => {
                            el.classList.add("hide");
                        });
                    }, 300);

                    setTimeout(() => {
                        e.shakerShadow.classList.add("hide");
                        e.shakerContainer.classList.add("shakerRotate");
                        e.shaker.classList.add("translateUp");
                        e.lid.classList.add("translateUp");
                    }, 1500);

                    setTimeout(() => {
                        e.method.removeClass(stage2removeClass, "hide");
                        e.glass.classList.add("glassIn");
                        e.shakerContainer.classList.add("hide");
                        e.product.map(el => {
                            el.classList.remove("translateUp");
                        });
                        e.bottleShadow.classList.remove("hide");
                        e.method.removeClass(stage2removeClass, "hide");
                    }, 2000);

                    setTimeout(() => {
                        e.method.productInterval();
                        e.shakerContainer.classList.remove("shakerRotate");
                    }, 2500);
                    e.state.replayGame = true;
                    return;
            },
            retryGame: function () {
                let retryGameRemoveHide = [e.shaker, e.shakerContainer, e.circle, e.guide, e.guide2];
                let retryGameAddHide = [e.repeat, e.bottleShadow, e.tinShadow];
                if (e.state.replayGame) {
                    clearInterval(e.prodRotationId);
                    clearInterval(e.prodRotationId2);
                    e.product.map(el => {
                        el.classList.add("translateUp");
                    });
                    e.glass.classList.remove("glassIn");
                    e.method.addClass(retryGameAddHide, "hide");
                    //reset numbers
                    e.method.addClass(e.stepsNumbers, "hide");
                    //set 0 position in numbers
                    e.stepsNumbers[0].classList.remove("hide");
                    e.counterContainer.classList.remove("hide");
                    setTimeout(() => {
                        e.method.addClass(e.product, "hide");
                        e.shaker.classList.remove("translateUp");
                        setTimeout(() => {
                            e.shakerShadow.classList.remove("hide");
                        }, 200)
                        e.shakerContainer.classList.remove("shakerRotate");
                        e.method.removeClass(retryGameRemoveHide, "hide");
                        // reset elements position
                        e.dragElements.map(el => {
                            setTimeout(() => {
                                el.classList.remove("hide");
                            }, 500);
                            el.style.left = "";
                            el.style.top = "";
                            el.classList.remove("toShaker");
                        });
                        setTimeout(() => {
                            e.guide.classList.remove("hide");
                        }, 800);
                    }, 1000);
                    e.state.gameOver = false;
                    e.state.replayGame = false;
                }
                return;
            },
            moveAndHide: function (element) {
                let move,
                    active;
                element.addEventListener("mousedown", (event) => {
                    element.classList.add("grab");
                    move = true;
                    active = true;
                    event.preventDefault();

                    e.circle.addEventListener("mouseenter", (event) => {
                        if (active) {
                            if (element.pageX === e.circle.pageX && element.pageY === e.circle.pageY) {
                                active = false;
                                element.classList.add("toShaker");
                                e.guide2.classList.add("hide");
                                e.droppedItemCounter++;
                                if (e.droppedItemCounter < e.maxCounter) {
                                    e.stepsNumbers.forEach((el, i) => i === e.droppedItemCounter ? el.classList.remove("hide") : el.classList.add("hide"));
                                } else if(e.droppedItemCounter === e.maxCounter) {
                                    e.stepsNumbers.forEach((el, i) => i === e.droppedItemCounter ? el.classList.remove("hide") : el.classList.add("hide"));
                                    console.log(e.droppedItemCounter);
                                    e.droppedItemCounter = 0;
                                    e.endGame();
                                }
                            }
                        }
                        return;
                    });
                    return;
                });

                window.addEventListener('mousemove', (event) => {

                    if (move) {
                        let x = (e.clientX / window.innerWidth) * 100,
                            y = (e.clientY / window.innerHeight) * 100;
                        element.style.top = `${y.toFixed(2)}%`;
                        element.style.left = `${x.toFixed(2)}%`;
                    }
                    return;
                });

                window.addEventListener("mouseup", (e) => {
                    e.preventDefault();
                    move = false;
                    active = false;
                    element.classList.remove("grab");
                    return;
                });
                return;
            },
            init: function () {
                e.mainIntro();
                e.dragElements.map((element, i) => {
                    e.moveAndHide(element, i);
                });
                e.repeat.addEventListener("click", () => e.retryGame());
                return;
            },
        }
    })();

    function intro() {
        const c = (() => {
            let id = s => document.getElementById(s);
            let csa = s => [...document.querySelectorAll(s)];
            return {
                intro: id('intro'),
                introBg: csa(".introBg"),
                introElements: csa(".introElements"),
                introProduct: csa(".introProduct"),
                main: id("main"),
            }
        })();
        setTimeout(() => {
            c.intro.classList.remove("hide");
        }, 1500);

        setTimeout(() => {
            c.introBg.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.remove("bgTransition");
                }, 200 * i);
            });
        }, 1000);
        setTimeout(() => {
                setTimeout(() => {

                }, 400);
                setTimeout(() => {
                    c.introElements.forEach((el, i) => {
                        el.classList.remove(`elTransform${i}`);
                        el.classList.remove("hide");
                    });
                    c.introProduct.forEach((el, i) => {
                    el.classList.remove(`prodTransform${i}`);
                    el.classList.remove("hide");
                });
                }, 800);

        }, 1500)
        setTimeout(() => {
                setTimeout(() => {
                    c.introBg.forEach((el, i) => {
                    c.intro.classList.add("hide");
                });
                }, 1000);

                setTimeout(() => {
                    c.introElements.forEach((el, i) => {
                    el.classList.add(`elTransform${i}`);
                    el.classList.add("hide");
                });
                }, 400);

                setTimeout(() => {
                    c.introProduct.forEach((el, i) => {
                    el.classList.add(`prodTransform${i}`);
                    el.classList.add("hide");
                });
                }, 400);
            setTimeout(() => {
                c.main.classList.remove("hide");
                e.init();
            }, 1500);
        }, 4000);
        return;
    }

    function outro(callback) {
        const e = (() => {
            let id = s => document.getElementById(s);
            return {
                main: id('main'),
                outro: id('outro'),
                bgPink: id('outroBgPink'),
                bgGrey: id('outroBgGrey'),
                logo: id('outroLogo'),
                close: id('close-expand'),
            }
        })();
        e.main.classList.add("hide");
        e.close.classList.add("hide");
        e.outro.classList.remove("hide");
        let outro = setTimeout(() => {
            e.bgPink.classList.remove("outroTransform");
            setTimeout(() => {
                e.bgGrey.classList.remove("outroTransform");
                setTimeout(() => {
                    e.bgGrey.classList.remove("outroTransform");
                    setTimeout(() => {
                        e.logo.classList.remove("hide");
                        setTimeout(() => {
                            e.outro.classList.add("hide");
                            setTimeout(() => {
                                callback();
                            }, 500);
                        }, 1000);
                    }, 500);
                }, 500);
            }, 500);
        }, 1000);
        return;
    }
    return;
}

