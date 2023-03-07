$(function(){
    $('.product-gallery__thumb').click(function () {
        $(this).attr('src',$(this).attr('data-item'));
     $('#video').hide();
        $('#sliderproduct').show();
    });
    $('#video_slide').click(function (){
        $('#video').show();
        $('#sliderproduct').hide();
    });


    $('.product-gallery__thumb img').click(function () {
        $(this).parents('.product-gallery').find('#sliderproduct .product-gallery-item img').attr('src', $(this).attr('src'));
    });
    $('.product-gallery__thumbs').slick({
        infinite: true,
        slidesToShow: 5,
        vertical: true,
        slidesToScroll: 1,
        prevArrow: "<button type='button' class='btn-views' ><i class=\"fas fa-angle-up\"></i> </button>",
        nextArrow: "<button type='button' class='btn-views' > <i class=\"fas fa-angle-down\"></i> </button>",
    });
    if ($('#z').length) {
        CloudZoom.quickStart({});
    }
    $(".fancybox-album").fancybox({
        fitToView: true, closeBtn: true, padding: 0
    });
    $('.gender-btn').click(function () {
        var $classParent = $(this).parent()
        $('.product_desktop .gender .vrAkQ.show').removeClass('show');

        if($classParent.hasClass('show')){
            $classParent.removeClass('show');
        }else {
            $('.product_desktop .gender').removeClass('show');
            $classParent.addClass("show");
        }
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    });
    $(document).ready(function () {
        $('.filter-vendor__item').click(function () {
            location.href = $(this).attr('data-link')
        })
    });
    checkInv();
    $('.btn_add_cart').click(function () {
        var t = $(this);
        if (t.attr('data-ck') == 1) {
            var products = [], ps = {};
            ps['id'] = t.attr('data-selId');
            ps['quantity'] = $("#quantity").val();
            products.push(ps);
            addToCart(products, 1, function (rs) {
                console.log(rs);
                if (rs.status == 1) {
                    if (t.hasClass('buy-now')) {
                        window.location.href = '/cart/checkout?emptylayout=true';
                    } else {
                        ajaxLoadView({
                            view: 'headerCart',
                            onSuccess: function (rs) {
                                $(".cart-view").html(rs);
                                $("#site-nav--mobile").addClass('active show-cart');
                                $("#site-overlay").addClass('active');
                            }
                        });
                    }
                } else {
                    alert(rs.messages);
                }
            });
        }else {
            alert('Vui lòng chọn màu sắc hoặc kích thước!');
        }
    });

    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'), atc = $('.btn_add_cart'), attrs = {};
        // mainPrice = $('.item_choice_price .pro-price'),
        //     // oldPPriceLib = $('.product-price .product-price-old'),
        //     /*      discountPriceLib = $('.product-price .discounPercent .pro-sale'),*/
        //     currency = 'đ',
        //     extenDiscount = '<span class="extendDiscount">off</span>';
        var colorAt = $('.color a.active');
        if (!t.hasClass('active')) {
            size.removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if ($('.color').length && !$('.color a.active').length) {
                size.attr('title', 'Vui lòng chọn màu trước!');
            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    attrs[$('.color').attr('data-column')] = colorAt.attr('data-value');
                    attrs[$('.size').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if (rs.data.available > 0) {

                                    qtt.attr('max', rs.data.available);
                                    atc.attr('data-selId', rs.data.id).removeAttr('title').removeAttr('data-original-title').attr('data-ck', 1).removeClass('unsel');
                                } else {
                                    atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                                }

                            } else {
                                atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        },
                        'json'
                    );
                }
            }
        }
    });

    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity'), atc = $('.btn_add_cart'), attrs = {},
            src = $(this).attr('data-src')
        // mainPrice = $('.item_choice_price .pro-price'),
        //     // oldPPriceLib = $('.product-price .product-price-old'),
        //     // discountPriceLib = $('.product-price .discounPercent .pro-sale'),
        //     currency = 'đ',
        //     extenDiscount = '<span class="extendDiscount">off</span>';
        if (!t.hasClass('active')) {
            $('.thumbnailImage[data-src="' + src + '"]').click();
            $('.color a').removeClass('active');
            atc.attr('title', 'Vui lòng chọn màu sắc hoặc kích cỡ!').attr('data-ck', 0).addClass('unsel');
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('title');
                attrs[$('.color').attr('data-column')] = t.attr('data-value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + $('.btn_add_cart').attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id).attr('data-price', rs.data.price).attr('data-oldPrice', rs.data.oldPrice).attr('data-moneyDiscount', rs.data.moneyDiscount);
                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!').removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });

            } else {
                if (t.attr('qtt')) {
                    t.addClass('active');
                    atc.attr('data-selId', t.attr('data-selId')).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                    atc.removeAttr('data-original-title');
                    qtt.attr('max', t.attr('qtt'));
                }
            }


        }
    });
    $('.btn-minus-view').click(function () {
        var v = parseInt($('.qty-view').attr('value'));
        var min = 1;
        if (v > min) {
            $('.qty-view').attr('value', v-1);
            $('.qty-view').html(v - 1);
        }else {
            alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
        }
    });
    $('.btn-plus-view').click(function () {
        var max = parseInt($('.qty-view').attr('max'));
        var v = parseInt($('.qty-view').attr('value'));
        if (v < max) {
            $('.qty-view').attr('value', v+1);
            $('.qty-view').html(v + 1);
        }
        else{
            alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
        }
    });
    // $('.qty-view').keyup(function () {
    //     var t = $(this), max = parseInt(t.attr('max')), v = parseInt(t.val());
    //     if (v >= max) {
    //         alert('Bạn không thể đặt quá số lượng còn lại của sản phẩm !');
    //         t.val(max);
    //     }
    //     if (v < 1){
    //         alert('Bạn phải đặt số lượng tối thiểu là 1 sản phẩm !');
    //         t.val(1);
    //     }
    // });
    //đánh giá
    var vote = $('p.vote span');
    vote.hover(function () {
        $(this).addClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    }, function () {
        $(this).removeClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").removeClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    });
    vote.click(function(){
        vote.removeClass('active voted');
        $(this).addClass('active voted');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('active');
    });
    $('#btnRate button.btnRed').click(function (e) {
        e.preventDefault();
        var t = $(this);
        var title = $('#title');
        var comment = $('#comment'), submit = true;
        if (!vote.hasClass('voted')) {
            submit = false;
            alert(msgStarRate);
            return;
        }
        if (!comment.val()) {
            submit = false;
            alert('Quý khách vui lòng nhập bình luận!');
            return;
        }
        if (submit) {
            submit = false;
            AppAjax.post(
                '/rating/add?type=1',
                {
                    itemId: t.attr('data-pid'),
                    point: $('.vote .voted').attr('data-rate'),
                    storeId: $("#storeId").val(),
                    title: 'Tiêu đề đánh giá',
                    comment: $('#comment').val(),
                },
                function (rs) {
                    if (rs.code == 1) {
                        submit = true;
                        alert(rs.msg);
                        window.location.reload();
                    } else {
                        alert(rs.msg);
                    }
                },
                'json'
            );
        }
    });
});
function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('.btn_add_cart'), qtt = $('#quantity');

    if (req == 1) {
        if ($('.select-swap.color').length) {
            if ($('.select-swap.color a.active').length) {
                attrs[$('.select-swap.color').attr('data-column')] = $('.select-swap.color a.active').attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            qtt.attr('data-max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );

            } else {
                $('.select-swap.color a').each(function () {
                    var t = $(this);
                    attrs[$('.select-swap.color').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            t.attr('data-selId', rs.data.id);
                            if (rs.code == 1) {
                                t.attr('qtt', rs.data.available);
                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if ($('.size a.active').length) {
                attrs[$('.size').attr('data-column')] = $('.size a.active').attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if (rs.data.available > 0) {
                                qtt.attr('data-max', rs.data.available);
                                atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                            } else {
                                atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );
            } else {
                $('.size a').each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('data-psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if (rs.data.available > 0) {
                                    t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                                } else {
                                    t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                                }

                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        },
                        'json'
                    );
                });
            }
        }
        return false;
    }
    if (req > 1) {
        var colorAt = $('.select-swap.color a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.select-swap.color').attr('data-column')] = colorAt.attr('data-value');
            attrs[$('.size').attr('data-column')] = sizeAt.attr('data-value');
            AppAjax.post(
                '/product/child?psId=' + atc.attr('data-psid'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1) {
                        if (rs.data.available > 0) {
                            qtt.attr('data-max', rs.data.available);
                            atc.attr('data-selId', rs.data.id).removeAttr('title').attr('data-ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    } else {
                        atc.attr('title', 'Sản phẩm tạm thời hết hàng!');
                    }
                },
                'json'
            );
            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            attrs[$('.select-swap.color').attr('data-column')] = colorAt.attr('data-value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$('.size').attr('data-column')] = t.attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if (rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }

                        } else {
                            t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorAt.length && sizeAt.length) {
            attrs[$('.size').attr('data-column')] = sizeAt.attr('data-value');
            $('.select-swap.color a').each(function () {
                var t = $(this);
                attrs[$('.select-swap.color').attr('data-column')] = t.attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('data-psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if (rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('data-selId', rs.data.id);
                            } else {
                                t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                            }
                        } else {
                            t.addClass('deactive').attr('title', 'Sản phẩm tạm thời hết hàng!');
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
}
