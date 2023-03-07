//js header

$(function () {
    $(".send_contact").on('click', function() {
        AppAjax.post(
            '/contact/contacts',
            {
                'content' : $('.content_register').val(),
                'name' : $('.name_register').val(),
                'email' : $('.email_register').val(),
                'mobile' : $('.mobile_register').val(),
                'address' : $('.address_register').val()
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    location.reload();
                } else {
                    alert(rs.message);
                }
            }
        );
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('header').addClass('fixed');

        } else {
            $('header').removeClass('fixed');
        }
    });

    $('.banner-new-img').slick({
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: "<button type='button' class='arrow-left'><i class=\"fas fa-arrow-alt-circle-left\"></i></button>",
        nextArrow: "<button type='button'  class='arrow-right'><i class=\"fas fa-arrow-alt-circle-right\"></i></button>",
    });

    $('.Styles__ItemsWrapper-zdvvw4-2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='left-slick-views'><i class='fas fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='right-slick-views'><i class='fas fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }

        ]
    });


    $('.slick-mobile').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: false,
        fade: true,
        prevArrow: "<button type='button' class='left-slick-mobile'><i class='fas fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='right-slick-mobile'><i class='fas fa-angle-right' aria-hidden='true'></i></button>",
        // asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slick-mobile',
        centerMode: false,
        focusOnSelect: true,
        arrows: false
    });
    if ($('.auto-paginator').length) {
        var isLoadPage = 1;
        var next = parseInt($('input.data-page-next').val()),
            max = parseInt($('input.data-page-last').val());
        if (next > 1) {
            var href = addFilter('page', $('input.data-page-next').val(), 3);
            $('.loadMoreProduct.loading').click(function () {
                next = parseInt($('input.data-page-next').val()),
                    href = addFilter('page', $('input.data-page-next').val(), 3);
                $('.loadMoreProduct.loading').hide();
                $(".loading-product").css('display', 'block');
                if (next <= max && next > isLoadPage) {
                    isLoadPage = next;
                    $.post(href, {template: 'home/loadview/loadMoreProduct', terminal: true, loadview: 'default'},
                        function (rs) {
                            if (rs) {
                                setTimeout(function () {
                                    $(".loading-product").hide();
                                    $('.section-product').append(rs);
                                    $('.data-page-next').val(1 + next);
                                    if ((1 + next) <= max) {
                                        $('.loadMoreProduct.loading').show();
                                    }
                                    if (next == max) {
                                        var percentNow = 100;
                                        $(".progress-wrap span").text('Hiển thị ' + $("#totalItems").val() + '/' + $("#totalItems").val() + ' sản phẩm');
                                    } else {
                                        var percentNow = parseInt((24 * next * 100) / $("#totalItems").val());
                                        $(".progress-wrap span").text('Hiển thị ' + parseInt(24 * next) + '/' + $("#totalItems").val() + ' sản phẩm');
                                    }
                                    $(".progress-sell-bar").css('width', percentNow + '%');
                                }, 1000)
                            }
                        }
                    );
                }
            });
        } else {
            $(".progress-wrap span").text('Hiển thị ' + $("#totalItems").val() + '/' + $("#totalItems").val() + ' sản phẩm');
            $(".progress-sell-bar").css('width', '100%');
            $('.loadMoreProduct.loading').hide();
        }
    }

    // $('.single-item').slick();
    $(".search-toggle").click(function () {
        $(".search-view-all").slideToggle();
        $("body").css("overflowY", "hidden");
    });
    $("#search-toggle").click(function () {
        $(".search-view-all").slideToggle();
        $("body").css("overflowY", "hidden");
    });
    $(".fa-times").click(function () {
        $(".search-view-all").hide();
        $("body").css("overflowY", "visible");
    });
    $(document).on('click', '.quick-view', function (e) {
        e.preventDefault();
        quickview($(this).attr('data-id'));
    });
    $("#search-desktop").click(function () {

        $(".search-view-all").toggle();
    });
    $(".fktUmI").click(function () {
        $(".ewCIjn").toggle();
    })

    $(".cart-desktop").click(function () {
        $('#site-nav--mobile').addClass('active show-cart');
        $('.site-overlay').toggleClass('active');
    })
    $("#site-overlay").click(function () {
        $("#site-nav--mobile").removeClass('active show-cart');
        $("#site-overlay").removeClass('active');
        $("#myNav").css("width","0%");
    });


    $('.cart-view').each(function () {
        ajaxLoadView({
            view: 'headerCart',
            onSuccess: function (rs) {
                $('.cart-view').html(rs);
            }
        });
    });

    // san phảm yêu thích
    $('.wishlist-product').click(function () {
        var t = $(this);
        if (t.children().hasClass('fas')) {
            AppAjax.post(
                'product/wishlistcookie',
                {'productId': t.attr('psid'), 'type': 6},
                function (rs) {
                    if (rs.code == 1) {
                        ajaxLoadView({
                            view: 'loadWishlist',
                            onSuccess: function (ps) {
                                $('.number-wishlist').html(ps);
                            }
                        });
                        // t.html('<img src="/tp/T0392/img/loading.svg">');
                        setTimeout(function () {
                            t.html('<i class="far fa-heart"></i>');
                        }, 10)
                    }
                }
            )
        } else {
            AppAjax.post(
                '/product/wishlistcookie', {
                    'productId': t.attr('psid'),
                    'type': 5
                },
                function (rs) {
                    if (rs.code == 1) {
                        ajaxLoadView({
                            view: 'loadWishlist',
                            onSuccess: function (ps) {
                                $('.number-wishlist').html(ps);
                            }
                        });
                        // t.html('<img src="/tp/T0392/img/loading.svg">');
                        setTimeout(function () {
                            t.html('<i class="fas fa-heart"></i>');
                        }, 10)
                    }
                },
                'json'
            );
        }
    });
    var ps = [];
    $('.wishlist-product').each(function () {
        var t = $(this);
        ps.push({id: t.attr('psid')});
    });

    WishListLoad(ps);

    var ps = [];
    $('.product-item').each(function () {
        var t = $(this);
        ps.push({storeId: $("#storeId").val(), id: t.attr('data-id')});
    });
    function WishListLoad(ps) {
        if (ps.length) {
            if ($('.checkCookies').val() != "") {
                var result = JSON.parse($('.checkCookies').val());
                $.each(result, function (key, vl) {
                    if (vl > 0) {
                        $('.wishlist-product[psid=' + key + ']').children().removeClass('far').addClass('fas');
                        $('.product-item[data-id=' + key + '] .product-img').append('<div class="hot-tag">Yêu thích</div>');
                    }
                });
            }
        }
    }


    $(".menu-collection li.navi1 span.icon-subnav").click(function () {
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle();
    });


    $(".gGxcNY").click(function () {
        $(".ewCIjn").hide();
    })
    $(".sort-by-btn").click(function () {

        $(".sort-by-btn").css("border", "1px solid #e7e7e7").css("background", "#f5f5f5");
        $(".sort-by-click").toggle();

    });
    $(".col-foo-1 .title-menu").click(function(){
        $(this).parent().find(".mtSubcribeForm").toggle("mtSubcribeForm-show");

    });
    $(".col-foo-2 .title-menu").click(function(){
        $(this).parent().find("ul").slideToggle();
        $(this).parent().find('i').toggleClass('fa-sort-up').toggleClass('fa-caret-down');

    });
    $(".col-foo-3 .title-menu").click(function(){
        $(this).parent().find("ul").slideToggle();
        $(this).parent().find('i').toggleClass('fa-sort-up').toggleClass('fa-caret-down');

    });
    $(".col-foo-4 .title-menu").click(function(){
        $(this).parent().find("ul").slideToggle();
        $(this).parent().find('i').toggleClass('fa-sort-up').toggleClass('fa-caret-down');

    });
    $('#subscribe').click(function (e) {
        e.preventDefault();
        var subscribe_input = $('.subscribe-input');
        if (subscribe_input.val() == '') {
            alert('Vui lòng điền đầy đủ thông tin');
        } else {
            AppAjax.post('/newsletter/subscribe', {mail: subscribe_input.val()},
                function (rs) {
                    if (rs.code) {
                        subscribe_input.val('');
                    }
                    alert(rs.message)
                }
            );
        }

    });

    $(".color-btn").click(function () {
        $(".color-btn").css("border", "1px solid #e7e7e7").css("background", "#f5f5f5");
        $(".color-click").toggle();
    });
    $(".pattern-btn").click(function () {
        $(".pattern-btn").css("border", "1px solid #e7e7e7").css("background", "#f5f5f5");
        $(".pattern-click").toggle();
    });
    $(".discount").click(function () {
        $(".discount-btn").css("border", "1px solid #e7e7e7").css("background", "#f5f5f5");
        $(".discount-click").toggle();
    });
    $(".size-btn").click(function () {

        $(".size-btn").css("border", "1px solid #e7e7e7").css("background", "#f5f5f5");
        $(".size-click").toggle();
    })

//    cart index
    $('.removeCart').click(function () {
        var id = $(this).attr('data-id');
        removeCart(id, true);
    });

    $('.xi-step-down').click(function () {
        var id = $(this).attr('data-id');
        var qttElement = $('.qty.product_' + id);
        var m = parseInt(qttElement.attr('max'));
        var v = parseInt(qttElement.attr('value'));
        if (m < v) {
            qttElement.attr('val', v - 1);
            // $('.qnt').html(v - 1);
        } else {
            if (m > v && v > 1) {
                qttElement.attr('value', v - 1);
                qttElement.html(v - 1);
            } else if (m > v && v < 1) {
                qttElement.html('0');
            }
        }
        var products = [
            {id: id, quantity: v - 1}
        ];
        addToCart(products, 2, function (rs) {
            window.location.reload();
        });
    });
    $('.xi-step-up').click(function () {
        var id = $(this).attr('data-id');
        var qttElement = $('.qty.product_' + id);
        var m = parseInt(qttElement.attr('max'));
        var v = parseInt(qttElement.attr('value'));
        if (v < m) {
            qttElement.attr('value', v + 1);
            qttElement.html(v + 1);
        }
        var products = [
            {id: id, quantity: v + 1}
        ];
        addToCart(products, 2, function (rs) {
            window.location.reload();
        });
    });
    if ($(window).width() < 1024) {
        $(".help").click(function () {
            $(this).find('ul').toggle();
            $(this).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
        });
        $(".my-account").click(function () {
            $(this).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
            $(this).find('ul').toggle();
        });
        $(".pages").click(function () {
            $(this).find('i').toggleClass('fa-minus').toggleClass('fa-plus');
            $(this).find('ul').toggle();
        });
    }



        $('.bSactU').slick({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: "<button type='button' class='left-slick'><i class='fas fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='right-slick'><i class='fas fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

            ]
        });


    $(document).on("click",".wishlist-product-index",function() {
        AppAjax.post(
            'product/wishlistcookie',
            {'productId': $(this).attr('psid'), 'type': 6},
            function (rs) {
                if (rs.code == 1) {
                    ajaxLoadView({
                        view: 'loadWishlistMain',
                        onSuccess: function (ps) {
                            $('#wishlist-id').html(ps);
                        }
                    });
                    ajaxLoadView({
                        view: 'loadWishlist',
                        onSuccess: function (ps) {
                            $('.number-wishlist').html(ps);
                        }
                    });
                    // t.html('<img src="/tp/T0392/img/loading.svg">');
                    setTimeout(function () {
                        $(this).html('<i class="far fa-heart"></i>');
                    }, 10)
                }
            }
        )

    });
    slick();

   /* // load menu index*/
    $('.category_menu').click(function () {
        var t = $(this);
        // if(!($('#checkCatePage').val())) {
        //     window.location = '/';
        // }
        var dataId = t.attr('data-id');
        setTimeout(function () {
            loadCategory($('.category_menu[data-id="' + dataId +'"]'));
        },200);
        sessionStorage.setItem("sessionStorage", dataId);
    });
    // let lastname = sessionStorage.getItem("sessionStorage");
    // if(lastname){
    //     setTimeout(function () {
    //         loadCategory($('.category_menu[data-id="' + lastname +'"]'));
    //     },1);
    // }

});

function loadCategory(t) {
    ajaxLoadView({
        view: "loadIndexHome",
        params: "&cateId=" + t.attr('data-id') + '$name=' + t.attr('data-name'),
        onSuccess: function (rs) {
            $('#main-content-wrapper').html(rs);
            slick();
        }
    });


}

function slick() {
    $('.single-item').slick({
        autoplay: 2000,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fas fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fas fa-angle-right' aria-hidden='true'></i></button>",
        adaptiveHeight: true
    });
}

function quickview(id) {
    $.post('/product/q' + id,
        function (rs) {
            $.fancybox.open(
                rs, {
                    content: rs, padding: [10, 10, 10, 10], fitToView: false, wrapCSS: 'fancybox-qv',
                    helpers: {
                        overlay: {
                            css: {
                                'background': 'rgba(158, 158, 158, 0.5)',
                            }
                        }
                    },
                    afterShow: function () {

                        $('.slides').slick({
                            infinite: true,
                            slidesToShow: 4,
                            arrows: false,
                            slidesToScroll: 1,
                            responsive: [
                                {
                                    breakpoint: 1199,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 1,
                                        infinite: false,
                                    }
                                },
                                {
                                    breakpoint: 992,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 1,
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                }

                            ]
                        });
                        $.getScript('/tp/T0367/js/quickview.js?6');
                    },
                });
        }
    );
}


function openNav() {
    if ($(window).width() > 661) {
    document.getElementById("myNav").style.width = "50%";
    $("body").css("overflowY", "hidden");
    $('.site-overlay').toggleClass('active');
        };
    if ($(window).width() < 600) {
        document.getElementById("myNav").style.width = "76%";
        $("body").css("overflowY", "hidden");
        $('.site-overlay').toggleClass('active');
    };
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    $("body").css("overflowY", "visible");
    $("#site-overlay").removeClass('active');

}

