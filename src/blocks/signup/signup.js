import $ from 'jquery';

$(document).ready(function () {
    const $signup = $('.signup');
    let $signupContainer = $('.signup__container');
    let $body = $('.body');

    $('.btn--signup').click(function () {
        $signup.addClass('signup--open');
        $body.addClass('body--no-scroll');

        // why it won't work without timeout?
        setTimeout(function() {
            $('.signup__input').first().focus();
        }, 500);
    });

    $('.signup__button--close').click(function (e) {
        e.preventDefault();
        hideModal();
    });

    $(document).keyup(function(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
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
    });




    // snippet to trap focus inside modal

    // add all the elements inside modal which you want to make focusable
    const  focusableElements =
        'button, input, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.signup__container'); // select the modal

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

    document.addEventListener('keydown', function(e) {

        if (!(e.key === 'Tab')) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
    });

    firstFocusableElement.focus();

})