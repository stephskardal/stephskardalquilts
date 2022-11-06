jQuery('head').append('<link rel="stylesheet" type="text/css" href="/custom_css/fabricSwatches-v1.css? ' + jQuery.now() + '">');

jQuery(document).on('ready', function() {
  jQuery('input[name="sort-by"]').on('click', function(e) {
    colorSorting.sort(jQuery(this).data('value'));
  });
  setTimeout(function() {
    jQuery('input[name="sort-by"]:first').click();
  }, 300);
});
