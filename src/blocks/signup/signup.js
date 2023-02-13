import $ from 'jquery';

$(document).ready(function () {
    const $signup = $('.signup');
    let $signupContainer = $('.signup__container');
    let $body = $('.body');

    $('.btn--signup').click(function () {
        $signup.addClass('signup--open');
        $body.addClass('body--no-scroll');
    });

    $('.signup__button--close').click(function (e) {
        e.preventDefault();
        hideModal();
    });

    $signup.click(function (e) {
        if (!$(e.target).closest('.signup__container').length) {
            hideModal();
        }
    });

    function hideModal() {
        $signup.removeClass('signup--open');
        $body.removeClass('body--no-scroll');
    }

    $signup.submit(function (e) {
        e.preventDefault();
        $.post(
            'https://formbold.com/s/oJprW',
            $signup.serialize(),
            function (msg) {
                if (msg.message === 'Submission successful') {
                    $signupContainer.empty();
                    $signupContainer.append(
                        '<div class="signup__message">' +
                        'Almost done! Check your email for further instructions' +
                        '</div>'
                    );
                }
                setTimeout(function () {
                    hideModal();
                }, 2000)
            },
            'json'
        )
    })
})