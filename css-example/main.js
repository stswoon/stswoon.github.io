$(function () {
    $(".toggles button").click(function () {
        var id = this.id;
        var current = $(".posts ." + id);

        $(".post").not(current).hide(500);
        current.show(500);
    });

    $("#showall").click(function () {
        $(".post").show(500);
    });
});

$(document).ready(function () {
    //https://owlcarousel2.github.io/OwlCarousel2/demos/basic.html
    $(".owl-carousel").owlCarousel({
        //loop: false,
        //pagination: true,
        margin: 10,
        //nav: true,
        dots: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 5
            },
            1000: {
                items: 8
            }
        }
    });
});