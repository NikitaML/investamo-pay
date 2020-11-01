$(document).ready(function() {
    // блокируем все уровни
    $('.payment__step').addClass('lock');
    // снимаем блокировку с 1 уровня
    $('.payment__step:first-child').removeClass('lock');
    // устанавливае все инпутам аттрибут 
    $('.payment-form__input').attr('data-empty', 'yes');


    $('.payment-cards__active').on('click', function() {
        $('.payment-cards__list').slideUp('300');
        $('.payment-cards__list').removeClass('show');

        if ($(this).next().hasClass('show')) {
            $(this).next().removeClass('show');
            $(this).next().slideUp('300');
            return;
        } else {
            $(this).next().addClass('show');
            $(this).next().slideDown('300');
        }
    });

    $('.payment-card[data-type]').on('click', function() {
        var image = $(this).find('.card-i').attr('src');
        $('#method').text($(this).text());
        $('#ico').attr('style', `background-image: url(${image}) `);
        $('.payment-cards__item').removeClass('active');
        $('.payment-cards__item').removeAttr('data-choose');
        $('.payment-card').attr('style', '');
        $(this).closest('.payment-cards__item').addClass('active');
        $(this).closest('.payment-cards__item').attr('data-choose', 'true');
        $(this).fadeOut('300');
        $('.payment-card[data-type]').parent().parent().addClass('lock');
        $(this).parent().parent().removeClass('lock');

        

        var teampleate = `<svg class="icon"><use class="icon-tag" xlink:href></use></svg>`;

        $('.payment-card[data-def]').each(function() {
            $(this).children('.payment-card__title').text($(this).attr("data-title"));
            $(this).children('.payment-card__icon').html(teampleate);
            $(this).find('.icon-tag').attr('xlink:href', $(this).attr('data-img'));
        });

        $(this).parent().prev().children('.payment-card').children('.payment-card__title').text($(this).children('.payment-card__title').text());
        $(this).parent().prev().children('.payment-card').children('.payment-card__icon').html($(this).children('.payment-card__icon').html());

       

        // if($('.payment-cards__item[data-choose="true"]').length > 0){
        //     $('.payment-cards__item[data-choose="true"]').removeClass('lock');
        // }
        

    });

    $('.payment-modal__btn').on('click', function() {
        $('.payment-modal').removeClass('active');
        $('#page-wrapper').removeClass('hidden-modal');
        $('.payment__step_two').addClass('lock');
        $('.payment__step_one').removeClass('lock');
        $('.payment__step_three').addClass('lock');
        $('.payment-form__input').val('');
        $('.payment-form__input').attr('data-empty', 'no');
        $('.payment-form__input').attr('style', '');
        $('.payment-cards__item').removeClass('active');
        $('.payment-cards__item').removeAttr('data-choose');
        $('.payment-cards__list').removeClass('show');
        $('.payment-cards__list').removeAttr('style', '');
        $('.payment-card').removeAttr('style', '');
        $('.payment-cards__item').removeClass('lock');

        var teampleate = `<svg class="icon"><use class="icon-tag" xlink:href></use></svg>`;
        $('.payment-requisites .payment-form__button_blue').text('cripto');

        $('.payment-card[data-def]').each(function() {
            $(this).children('.payment-card__title').text($(this).attr("data-title"));
            $(this).children('.payment-card__icon').html(teampleate);
            $(this).find('.icon-tag').attr('xlink:href', $(this).attr('data-img'));
        });
    });
});


$('.payment-form__input').on('keyup', function() {
    validate($(this));

    var length = $('input[data-empty="no"]').length;

    if (length < 2) {
        $('.payment__step_two').addClass('lock');
        $('.payment__step_three').addClass('lock');
    }
});

// проверка 1 уровня
$('#submit-level-1').on("click", function() {
    if (validate('#input-one') === true && validate('#input-two') === true) {
        $('.payment__step_two').removeClass('lock');
        $('.payment__step_one').addClass('lock');
    } else {
        $('.payment__step_two').addClass('lock');
    }
});

// проверка 2 уровня
$('.payment-card[data-type]').on("click", function() {
    validate('#input-one');
    validate('#input-two');
    if (validate('#input-one') === true && validate('#input-two') === true ) {
        $('.payment__step_three').removeClass('lock');
    } else {
        $('.payment__step_three').addClass('lock');
    }
});

// проверка 3 уровня
$('#submit-level-3').on("click", function() {
    validate('#input-one')
    validate('#input-two')
    validate('#input-three')
    validate('#input-five');

    if (validate('#input-one') === true && validate('#input-two') === true && validate('#input-three') === true && validate('#input-five') === true && $('.payment-cards__item[data-choose="true"]').length > 0) {
        $('.payment-modal').addClass('active');
        $('#page-wrapper').addClass('hidden-modal');
    }
});


// validate input
function validate(input) {
    if ($(input).val().length > 1 && !isNaN($(input).val())) {
        $(input).attr('data-empty', 'no').css('border-color', 'lightgreen');
        return true;
    } else if ($(input).val() == '' || isNaN($(input).val())) {
        $(input).attr('data-empty', 'yes').css('border-color', 'red');
        return false;
    }
}