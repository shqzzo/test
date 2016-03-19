(function($) {

    //$.support.cors = true;

    $(function() {

        $('.jcarousel').jcarousel({
                animation: 'slow',
                wrap: 'circular'
            })

            .jcarouselAutoscroll({
                interval: 5000,
                target: '+=1',
                autostart: true
            });

        $('.jcarousel-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });



        //var queryPic = '';

        function renderImg(query) {

            $.ajax({
                url: 'http://api.pixplorer.co.uk/image?word=' + query + '&amount=7&size=tb',
                success: function(data) {
                    //console.log(data);
                    var img = tmpl($('#img-template').html(), data);

                    $('.grid').remove();

                    $('.ideas').append(img);
                    $('.grid').isotope({
                        itemSelector: '.grid-item',
                        layoutMode: 'masonry',
                        masonry: {
                            gutter: 20
                        }
                    });

                }
            });
        }

        $('#search').submit(function(e) {

            e.preventDefault();
            var userQuery = encodeURIComponent($('.search__input').val());

            renderImg(userQuery);

        });

        renderImg();

        // $('.grid').isotope({
        // 	itemSelector: '.grid-item',
        // 	layoutMode: 'masonry',
        // 	masonry: {
        // 		gutter: 20
        // 	}
        // });
    //
    });

})(jQuery);