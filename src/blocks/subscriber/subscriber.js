import $ from 'jquery';

$(document).ready(function () {
    $('.subscriber__form').submit(function (e) {
        e.preventDefault();
        $.post(
            'https://formbold.com/s/3VpP0',
            $('.subscriber__form').serialize(),
            function (msg) {
                if (msg.message === 'Submission successful') {
                    $('.subscriber__input').remove();
                    $('.subscriber__button').remove();
                    $('.subscriber__form').append(
                        '<div class="subscriber__message">' +
                        'You are subscribed now!' +
                        '</div>'
                    );
                }
            },
            'json'
        )
    })
})