var $ = require('jquery');

var exports = module.exports = {}

 exports.nav = $(document).ready(function() {
    $("#navToggle a").click(function(e){
        e.preventDefault();

        $("header &gt; nav").slideToggle();
        $("#logo").toggleClass("menuUp menuDown");
    });

    $(window).resize(function() {
        if($( window ).width() &gt;= "600") {
            $("header &gt; nav").css("display", "block");

            if($("#logo").attr('class') == "menuDown") {
                $("#logo").toggleClass("menuUp menuDown");
            }
        }
        else {
            $("header &gt; nav").css("display", "none");
        }
    });

    $("header &gt; nav &gt; ul &gt; li &gt; a").click(function(e) {
        if($( window ).width() &lt;= "600") { if($(this).siblings().size() &gt; 0 ) {
                e.preventDefault();
                $(this).siblings().slideToggle("fast")
                $(this).children(".toggle").html($(this).children(".toggle").html() == 'close' ? 'expand' : 'close');
            }
        }
    });
});
