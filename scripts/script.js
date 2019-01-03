var $els = $('.mobile-menu a, .mobile-menu header');
var count = $els.length;
var grouplength = Math.ceil(count/3);
var groupNumber = 0;
var i = 1;
$('.mobile-menu').css('--count',count+'');
$els.each(function(j){
    if ( i > grouplength ) {
        groupNumber++;
        i=1;
    }
    $(this).attr('data-group',groupNumber);
    i++;
});

$('.mobile-menu footer button').on('click',toggleMenu);

function toggleMenu(e) {
    if(e !== null) {
      e.preventDefault();
    }
    $els.each(function(j){
        $(this).css('--top',$(this)[0].getBoundingClientRect().top + ($(this).attr('data-group') * -15) - 20);
        if(e !== null) {
          $(this).css('--delay-in',j*.1+'s');
          $(this).css('--delay-out',(count-j)*.1+'s');
        }
    });
    $('.mobile-menu').toggleClass('closed');
    if(e !== null) {
      e.stopPropagation();
    }
}

$( document ).ready(function() {
    toggleMenu(null);
});
