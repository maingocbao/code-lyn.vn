$(document).ready(function (e) {
    Address.load('#cityId', '#districtId');
    if ($("body .validate").length) {
        $(".validate").validationEngine();
    }
    var pathname = window.location.pathname;
    if (pathname == '/user/signin') {
        $('#username, #password').on('keypress', function (even) {
            if (even.keyCode == 13) {
                signin();
            }
        });
    }
    $('#btnSignIn').on('click', function () {
        signin();
    });
    $('#btnSingup').on('click', function () {
        signup();
    });
});
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
};

function signin() {
    if ($("#customer_login").validationEngine('validate')) {
        AppAjax.ajax({
            type: "POST",
            data: $("#customer_login").serialize(),
            cache: false,
            dataType: 'json',
            url: "/user/ajaxsignin",
            success: function (rs) {
                if (rs.code) {
                    if ($.urlParam('redirectUri')) {
                        var uri = decodeURIComponent($.urlParam('redirectUri'));
                        window.location.href = uri;
                        return;
                    }
                    window.location.href = '/';
                } else if (rs.message['username'] != undefined) {
                    alert(rs.message['username']);
                } else if (rs.message['email'] != undefined) {
                    alert(rs.message['email']);
                }
            }
        });
    }
}

function signup() {
    if ($("#create_customer").validationEngine('validate')) {
        AppAjax.ajax({
            type: "POST",
            data: {
                'fullName': $('#create_customer input[name="textName"]').val(),
                'email': $('#create_customer input[name="textEmail"]').val(),
                'password': $('#create_customer input[name="textPass"]').val(),
                'mobile': $('#create_customer input[name="mobile"]').val(),
                'birthday': $('#create_customer input[name="birthday"]').val(),
                'address': $('#create_customer input[name="address"]').val(),
            },
            cache: false,
            dataType: 'json',
            url: "/user/ajaxsignup",
            beforeSend: function () {
                var html = '<div class="modal-body text-center">\
                        <div class="desc-modal"><img style="margin: 10px 0;" src="/tp/T0602/img/loading.gif"/></div>\
                   </div>';
                $('#modalShow .modal-content').html(html);
                $('#modalShow .modal-dialog').addClass('modal-xs');
                $('#modalShow .modal-backdrop').remove();
                $('#modalShow').modal('show');
            },
            success: function (rs) {
                if (rs.code == 1) {
                    $("#create_customer input[type='text'],#create_customer input[type='date'],#create_customer input[type='password'],#create_customer select,#create_customer textarea").val('');
                    $('#modalShow .modal-dialog').addClass('modal-md-x1');
                    var mess = '<div class="modal-body text-center">\
                        <div class="desc-modal alert alert-success">"Cảm ơn bạn đã đăng ký tài khoản tại Website chúng tôi. Vui lòng kiểm email, bạn vừa cung cấp và ấn vào link kích hoạt tài khoản!"</div>\
                            <div class="form-group clearfix text-center"><a class="btn close-singup w100 btn-green" href="/user/signin">OK</a></div>\
                        </div>';
                    $('#modalShow .modal-content').html(mess);
                    // setTimeout(function () {
                    //     window.location.href = '/';
                    // },8000);
                } else {
                    alert(rs.message);
                    window.location.reload();
                }
            },
        });
    }
}


