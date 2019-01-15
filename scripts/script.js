// ***** Mobile menu *****
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
// ***** Mobile menu *****

// ***** Sort filters *****
(function() {
  var $sortedContent = $('.item-list .item');
  var $buttons = $('#buttons');
  var tagged = {};

  $sortedContent.each(function() {
    var img = this;
    var tags = $(this).data('tags');

    if (tags) {
      tags.split(',').forEach(function(tagName) {
        if (tagged[tagName] == null) {
          tagged[tagName] = [];
        }
        tagged[tagName].push(img);
      })
    }
  })

  $('<button/>', {
    text: 'Show All',
    class: 'active',
    click: function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $sortedContent.show();
    }
  }).appendTo($buttons);

  $.each(tagged, function(tagName) {
    var $n = $(tagged[tagName]).length;
    $('<button/>', {
      text: tagName + '(' + $n + ')',
      click: function() {
        $(this)
          .addClass('active')
          .siblings()
          .removeClass('active');
        $sortedContent
          .hide()
          .filter(tagged[tagName])
          .show();
      }
    }).appendTo($buttons);
  });
}())
// ***** Sort filters *****

// ***** Disqus *****
var disqus_shortname  = 'rosealacroix',
    disqus_identifier = 'default',
    disqus_title      = 'Rose A. Lacroix',
    disqus_config     = function(){
        this.language = 'en';
    };

(function() {
    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    dsq.src = 'https://' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
})();

function loadDisqus( identifier, url, title )
{
    DISQUS.reset({
        reload: true,
        config: function ()
        {
            this.page.identifier = identifier;
            this.page.url        = url;
            this.page.title      = title;
            this.language        = 'en';
        }
    });
}
// ***** Disqus *****

// ***** Gallery *****
function loadDisqusForImage(imageId) {
  selector = $('[data-image-id="' + imageId + '"]');
  loadDisqus(imageId, 'http://rosealacroix.com/img'+imageId, selector.data('caption'));
}

$(document).ready(function(){

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current){
        $('#show-previous-image, #show-next-image').show();
        if(counter_max == counter_current){
            $('#show-next-image').hide();
        } else if (counter_current == 1){
            $('#show-previous-image').hide();
        }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */


    function loadGallery(setIDs, setClickAttr){
        var current_image = 0,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image').click(function(){
            if($(this).attr('id') == 'show-previous-image'){
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
            loadDisqusForImage(current_image);
        });

        function updateGallery(selector) {
            var $sel = selector;
            current_image = $sel.data('image-id');
            $('#image-gallery-caption').text($sel.data('caption'));
            $('#image-gallery-title').text($sel.data('title'));
            $('#image-gallery-image').attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if(setIDs == true){
            $('[data-image-id]').each(function(){
                counter++;
                $(this).attr('data-image-id',counter);
            });
        }
        $(setClickAttr).on('click',function(){
            updateGallery($(this));
        });
    }
});
// ***** Gallery *****
