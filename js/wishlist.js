$(function () {
    $("#inputWishlist").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".product-item").filter(function() {
            $(this).toggle($(this).children('.search-data').val().toLowerCase().indexOf(value) > -1)
        });
    });

})