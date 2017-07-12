var doFn = {
    scrollFn: function() {
        function e() {
            return c ? !0 : (c = !0, setTimeout(function() {
                c = !1
            },
            500), !1)
        }
        function o() {
            switch (t(), clearTimeout(r), s) {  /*t()执行翻页后判断s，设置a的状态，再决定是否显示对应的动画、左侧信息栏*/
            case 0:  /*还未到达最后一页*/
                a = 1;
                break;
            case 4:   /*到达最后一页*/
                r = setTimeout(function() {
                    a = 2,
                    n()
                },
                4e3);
                break;
            default:
                a = 0
            }
            if (n(), 3 === s) {    /*先判读左侧信息栏的状态,有可能从第五页到第四页（隐藏）,也有可能第三页到第四页*/
                if (!f) return;
                clearTimeout(u),
                f = !1,
                /*console.log('f',f),*/
                $(".history").removeClass("cur"),   /*进入第四页后，三个动画依次发生*/
                $(".history").eq(0).addClass("cur"),
                u = setTimeout(function() {
                    $(".history").removeClass("cur"),
                    $(".history").eq(1).addClass("cur")
                },
                1e3),
                u = setTimeout(function() {
                    $(".history").removeClass("cur"),
                    $(".history").eq(2).addClass("cur")
                },
                2e3),
                u = setTimeout(function() {   /*定义鼠标位于元素上时的动画，当鼠标指针位于元素上方时，会发生 mouseover 事件，鼠标事件的生效时间在上述动画之后*/
                    $(".history").on("mouseover",
                    function() {
                        $(this).attr("class").indexOf("cur") < 0 && ($(".history").removeClass("cur"), $(this).addClass("cur"))
                    })
                },
                3e3)
            } else f = !0,   /*离开该页后，将f值恢复为默认true，避免下次进入该页时被return，即使每次进入都能发生上面的动画*/
            $(".history").off("mouseover"),   /*使用off()函数解除事件绑定*/
            $(".history").removeClass("cur").eq( - 1).addClass("cur")
        }
        function t() {  /*翻页,并更新图片状态*/
            function e(e) {   /*内部函数,63行自己调用*/
                $(e).removeClass("on"),
                $(e).eq(s).addClass("on")
            }
            var o = $(window).height();
            i = -o * s,
            $(".container").css({
                transform: "translateY(" + i + "px)"
            }),
            setTimeout(function() {
                e(".column"),
                e(".item")
            },
            400)
        }
        function n() {/*显示左侧信息弹出层*/
            var e = $(".info").width();
            switch (a) {
            case 2:    /*显示并翻转箭头*/
                $(".info").show().css({
                    left:
                    0
                }),
                $(".info-arrow").addClass("inverse");
                break;
            case 1:     /*隐藏在-e（宽度）处*/
                $(".info").css({
                    left:
                    -e
                }),
                $(".info-arrow").removeClass("inverse");
                break;
            default:
                $(".info").css({
                    left:
                    "-100%"
                }),
                $(".info-arrow").removeClass("inverse")
            }
        }
        var s = 0,  /*s代表第几页，从0开始*/
        i = 0,
        c = !1,   /*false*/
        a = 0,
        r = null,
        u = null,
        f = !0; !
        /*console.log('f',f),*/
        function() {
            $(document).on("mousewheel keydown DOMMouseScroll",
            function(t) {   /*t是传进去的event对象，里面包含wheelDelta等属性，滚轮向上滑其值为120，向下为-120*/
            	/*console.log('t',t);*/
                if (!e()) {
                    t = t || window.event;
                    var n = t.wheelDelta || -t.detail;
                    0 > n || 40 == t.keyCode ? 3 >= s && s++:(n > 0 || 38 == t.keyCode) && s >= 1 && s--,/*n为负值,向下翻页，正值，向上翻页*/
                    o()   /*执行翻页*/
                }
            })
        } (),
        function() {
            function t(e, o) {   /*内部函数,待调用*/
                var t = Math.abs(e) - Math.abs(o);
                return Math.abs(e) < 10 && Math.abs(o) < 10 ? 0 : t > 0 ? e > 0 ? 1 : -1 : o > 0 ? 2 : -2   /*找Y方向的  o > 0 ? 2 : -2*/
            }
            var n = 0,
            i = 0,
            c = 0,
            a = 0;
            $(document).on({
                touchmove: function(e) {
                    e.preventDefault()
                },
                touchstart: function(e) {
                    n = e.touches[0].clientX,
                    i = e.touches[0].clientY
                },
                touchend: function(r) {
                    if (!e()) {
                        c = r.changedTouches[0].clientX,
                        a = r.changedTouches[0].clientY;
                        var u = c - n,  /*X方向滑动的距离*/
                        f = a - i;     /*Y方向滑动的距离*/
                        switch (t(u, f)) {   /*滑动距离小于10则不翻页*/
                        case - 2 : 4 > s && s++;
                            break;
                        case 2:
                            s > 0 && s--
                        }
                        o()
                    }
                }
            })
        } (),
        $(".info-tg, .info-tg2").on("click",        /*.info-tg, .info-tg2逗号,两个都选中*/
        function(e) {
            e.stopPropagation(),
            e.preventDefault(),
            a = 2 === a ? 1 : 2,
            n()
        }),
        $(".info-tg, .item").on("touchend",
        function(e) {
            e.stopPropagation()
        }),
        $(window).resize(function() {
            t()
        }),
        $(".nav-right").find(".item").each(function(e) {
            5 !== e && $(this).click(function(t) {
                t.stopPropagation(),
                s = e,
                o()
            })
        })
    },
    touchEvent: function() {   /*第三页的翻转*/
        $(".skill").on({
            touchstart: function() {
                $(this).addClass("inverse")
            },
            touchend: function() {
                setTimeout(function() {
                    $(".skill").removeClass("inverse")
                },
                800)
            }
        })
    }
};
doFn.scrollFn(),
doFn.touchEvent();