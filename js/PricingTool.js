//1-Instagram
//2-Google search
//3-Google network
//4-Youtube
//5-Snapchat
//6-Twitter


//////////CampaignType
//Engagement = 1,
//WebsiteClicks = 2,
//Impressions = 3,
//VideoViews = 4,
//Install = 5,
//Clicks = 6,
//Call = 7,
//Followers = 8,
//VideoCall = 9

var _AllCompiegne = [];
function CalculatePrice(id, SocailMediaType, CampaignType, target, value, percentage, processType) {

    let _MultiplyValue;
    let _divideValue;
    if (processType == "multiply") {
        _MultiplyValue = Round(parseFloat(percentage * value), 2);
        $("#" + target.id).val(_MultiplyValue);
        if (_MultiplyValue > 0) {
            //addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Cost", "Id": id, "value": _MultiplyValue , "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });//for
            //addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Result", "Id": target.id, "value": value , "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });
            addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Cost",  "value": _MultiplyValue , "Result": value , "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });

        }
    }
    else if (processType == "divide") {
        _divideValue = Round(parseFloat(value / percentage), 0);
        $("#" + target.id).val(_divideValue);
        if (_divideValue > 0) {
            //addOrReplaceAllCompiegne(_AllCompiegne, {"Type": "Cost", "Id": id, "value": value, "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });
            //addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Result", "Id": target.id, "value": _divideValue, "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });
            addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Cost", "value": value, "Result": _divideValue,  "SocailMediaType": SocailMediaType, "CampaignType": CampaignType });

        }
    }



    //calac total
    var _elements = $('.cost');
    var _total = 0;
    for (var i = 0; i < _elements.length; i++) {
        _total += Round(getNum(parseFloat($("#" + _elements[i].id).val()), 2));
        addOrReplaceAllCompiegne(_AllCompiegne, { "Type": "Total", "value": _total, "SocailMediaType": 100 });

    }
    $("#TXT_total").val(_total);


    $("#CompiegneDetails").val(JSON.stringify(_AllCompiegne));

}


function addOrReplaceAllCompiegne(array, item) { // (1)
    const i = array.findIndex(_item => _item.SocailMediaType === item.SocailMediaType && _item.CampaignType === item.CampaignType );
    if (i > -1) {
        array[i] = item; // (2)
    }
    else
        array.push(item);
}

const Round = (n, dp) => {
    const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
}


function getNum(val) {
    if (isNaN(val)) {
        return 0;
    }
    return val;
}











$("input[name=QuestionOne]").on("click", function () {

    var _data = $("input[name='QuestionOne']:checked").val();

    if (_data == "4") {
        $("#Div_Other").show();
    }
    else {
        $("#TXTother").val('');
        $("#Div_Other").hide();
    }
});
let ValidatState;
$("input[name=Questiontwo]").on("click", function () {
    var _data = $("input[name='Questiontwo']:checked").val();
    if (_data == "1") {
        $("#Div_PostLink").show();
        $("#Fileuploader").val('');
        $("#Div_Fileuploader").hide();
    }
    else if (_data == "2") {
        $("#Div_PostLink").hide();
        $("#TXTLinkPost").val('');
        $("#Div_Fileuploader").show();
    }
    else if (_data == "3") {

        $("#Fileuploader").val('');
        $("#Div_Fileuploader").hide();

        $("#Div_PostLink").hide();
        $("#TXTLinkPost").val('');

    }
});


let _currentUser;
function SendFirstTab(ele) {

    var _lang = getCookie('.AspNetCore.Culture');

    let _Data = {
        CompanyName: $("#TXT_company").val(),
        Email: $("#TXT_email").val(),
        CompanyWebsite: $("#TXT_URl").val()
    }

    $.ajax({
        method: "POST",
        url: "/Pricing/PostPhaseOneEquation",
        data: JSON.stringify(_Data),
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json'
        },
        async: true,
        success: (data) => {
            if (data.state == true) {

                _currentUser = data.data.data;
                $("#CustomerId").val(_currentUser.id);
            }
        },
        error: function (data) {
            var _error = 'Failure sending mail'
            if (data.responseText.includes(_error)) {
                _error = _lang == "c=en|uic=en" ? 'Failure sending mail,Please check your email or send again' : 'من فضلك اعد الارسال مره اخري';
            }
            showDynamicMSG("DivError", _error);
            //data.responseText.replace('["', '').replace('"]', '')
        }
    });
}















function SecondStep(ele) {
    //if (ValidatState == false) {
    //    return false;
    //}

    var parent_fieldset = $(ele).parents('fieldset');
    var next_step = true;
    // navigation steps / progress steps
    var current_active_step = $(ele).parents('.pricing-form').find('.pricing-step.active');
    var progress_line = $(ele).parents('.pricing-form').find('.pricing-progress-line');


    if (next_step) {
        parent_fieldset.fadeOut(400, function () {
            // change icons
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            // progress bar
            bar_progress(progress_line, 'right');
            // show next step
            $(ele).next().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class($('.pricing-form'), 20);
        });
    }

}









// next step
$('#BTN_StepOne').on('click', function () {

    var _lang = getCookie('.AspNetCore.Culture')
    ValidatState = true;

    //if ($("#TXT_email").val() == "") {

    //    $("#TXT_email").focus();
    //    showDynamicMSG("DivPasswordError", _lang == "c=en|uic=en" ? 'Email is required' : 'حقل البريد إلالكتروني إلزمي');

    //    return false;
    //} else {
    //    if (!ValidateEmail($("#TXT_email").val())) {
    //        $("#TXT_email").focus();
    //        showDynamicMSG("DivPasswordError", _lang == "c=en|uic=en" ? 'Wrong Email' : 'خطأ في البريد إلالكتروني ');

    //        return false;
    //    }
    //}

    //SendFirstTab();

    var parent_fieldset = $(this).parents('fieldset');
    var next_step = true;
    // navigation steps / progress steps
    var current_active_step = $(this).parents('.pricing-form').find('.pricing-step.active');
    var progress_line = $(this).parents('.pricing-form').find('.pricing-progress-line');


    if (next_step) {
        parent_fieldset.fadeOut(400, function () {
            // change icons
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            // progress bar
            bar_progress(progress_line, 'right');
            // show next step
            $(this).next().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class($('.pricing-form'), 20);
        });
    }
});

$('#BTN_StepTwo').on('click', function () {
    var _lang = getCookie('.AspNetCore.Culture')

    var _total = parseFloat($("#TXT_total").val());
    if (isNaN(_total) || _total == 0) {
        showDynamicMSG("DivPasswordErrorStepTwo", _lang == "c=en|uic=en" ? 'Total cannot be 0' : 'لايمكن للاجمالي ان يساوي 0');
        return false;
    }

    var parent_fieldset = $(this).parents('fieldset');
    var next_step = true;
    // navigation steps / progress steps
    var current_active_step = $(this).parents('.pricing-form').find('.pricing-step.active');
    var progress_line = $(this).parents('.pricing-form').find('.pricing-progress-line');


    if (next_step) {
        parent_fieldset.fadeOut(400, function () {
            // change icons
            current_active_step.removeClass('active').addClass('activated').next().addClass('active');
            // progress bar
            bar_progress(progress_line, 'right');
            // show next step
            $(this).next().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class($('.pricing-form'), 20);
        });
    }
});

// previous step
$('.pricing-form .btn-previous').on('click', function () {
    // navigation steps / progress steps
    var current_active_step = $(this).parents('.pricing-form').find('.pricing-step.active');
    var progress_line = $(this).parents('.pricing-form').find('.pricing-progress-line');

    $(this).parents('fieldset').fadeOut(400, function () {
        // change icons
        current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
        // progress bar
        bar_progress(progress_line, 'left');
        // show previous step
        $(this).prev().fadeIn();
        // scroll window to beginning of the form
        scroll_to_class($('.pricing-form'), 20);
    });
});







$("#BTN_PURCHASE").on("click", function () {


    let _Data = {
        QuestionOne: $("input[name='QuestionOne']:checked").val(),
        QuestionTwo: $("input[name='Questiontwo']:checked").val(),
        Other: $("#TXTother").val(),
        LinkPost: $("#TXTLinkPost").val(),
        AllCompiegne: _AllCompiegne,
    }


    //var formData = new FormData($("#QuestionForm")[0]);

    var formData = new FormData($("#clacForm")[0]);
    $.ajax({
        url: "/Pricing/PostEquation",
        type: 'POST',
        data: formData,
        processData: false,  // tell jQuery not to process the data
        contentType: false,  // tell jQuery not to set contentType
        success: function (data) {
            if (data.state == true) {

                window.location.href = data.data.invoiceLink;
            }
            else if (data.statusCode == 400) {
                alert("Please contact adminstration");
            }
        },
        error: function (data) {
            toastr.error(data.responseText.replace('["', '').replace('"]', ''));
        }
    });





    //$.ajax({
    //    method: "POST",
    //    url: "/Pricing/PostEquation",
    //    data: formData,
    //    processData: false,  // tell jQuery not to process the data
    //    contentType: false,  // tell jQuery not to set contentType
    //    headers: {
    //        'Accept': 'application/json; charset=utf-8',
    //        'Content-Type': 'application/json'
    //    },
    //    async: true,
    //    success: (data) => {
    //        if (data.state == true) {
    //            _currentUser = data.data.data;
    //        }
    //    },
    //    error: function (data) {
    //        var _error = 'Failure sending mail'
    //        if (data.responseText.includes(_error)) {
    //            _error = _lang == "c=en|uic=en" ? 'Failure sending mail,Please check your email or send again' : 'من فضلك اعد الارسال مره اخري';
    //        }
    //        showDynamicMSG("DivError", _error);
    //        //data.responseText.replace('["', '').replace('"]', '')
    //    }
    //});


});
