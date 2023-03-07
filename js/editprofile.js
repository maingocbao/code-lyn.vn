$(function () {
    $('#changepassword').click(function(){
        if($(this).is(':checked')) {
            $('.hidden-pwd').show();
            $('input[type="password"]').addClass('validate[required],minSize[6]');
            $('#repassword').removeClass('validate[required],minSize[6]').addClass('validate[required,equals[newpassword],minSize[6]]');
        } else {
            $('.hidden-pwd').hide();
            $('input[type="password"]').removeClass('validate[required],minSize[6]').removeClass('validate[required,equals[newpassword],minSize[6]]');
        }
    });
    jQuery('form.profile').validationEngine('hide');
    jQuery('input').attr('data-prompt-position','centerRight');
    jQuery('input').data('promptPosition','centerRight');
    jQuery('textarea').attr('data-prompt-position','centerRight');
    jQuery('textarea').data('promptPosition','centerRight');
    jQuery('select').attr('data-prompt-position','centerRight');
    jQuery('select').data('promptPosition','centerRight');
    $('form.profile').validationEngine();

    $.datepicker.regional["vi-VN"] =
        {
            closeText: "Đóng",
            prevText: "Trước",
            nextText: "Sau",
            currentText: "Hôm nay",
            monthNames: ["Tháng một", "Tháng hai", "Tháng ba", "Tháng tư", "Tháng năm", "Tháng sáu", "Tháng bảy", "Tháng tám", "Tháng chín", "Tháng mười", "Tháng mười một", "Tháng mười hai"],
            monthNamesShort: ["Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười một", "Mười hai"],
            dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
            dayNamesShort: ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            weekHeader: "Tuần",
            dateFormat: "dd/mm/yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
    $.datepicker.setDefaults($.datepicker.regional["vi-VN"]);
    $('.txtBirthday').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:+0',
        dateFormat: 'dd/mm/yy',
    });
})