import $ from 'jquery';
import Swiper, {Pagination} from 'swiper';
import {Fancybox} from "@fancyapps/ui";

$(document).ready(function () {
    if (window.matchMedia('(max-width: 575px)').matches) {
        new Swiper('.tour__images', {
            modules: [Pagination],
            pagination: {
                el: '.tour__pagination',
                clickable: true
            },
            spaceBetween: 30,
            slidesPerView: "auto",
            centeredSlides: true
        })
    }

    const $videoHolder = $('.tour__fancy-video');

    $videoHolder.click(function() {
        Fancybox.show([
            {
                src: "https://www.youtube.com/embed/IZpTNq-mfNE?autoplay=1&mute=1&modestbranding=1&rel=0&hl=ru&showinfo=0&color=white",
                type: "video",
                ratio: 16 / 10,
            },
        ]);
    });

    $videoHolder.keypress(function(e) {
        if (e.key === 'Enter') {
            $(this).click();
        }
    });

    $(document).keypress(function(e) {
        if (e.key === 'Escape') {
            Fancybox.close();
        }
    });


})
