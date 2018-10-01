$(document).on('turbolinks:load', function() {
  // カード開閉（トグル）
  $('#page-container').on('click', '.card-toggle-btn',function(){
    let card_block_ele = $(this).closest('.card');

    let card_body_ele = card_block_ele.children('.card-body');
    card_body_ele.slideToggle();

    let card_footer_ele = card_block_ele.children('.card-footer');
    card_footer_ele.slideToggle();
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off');
  });
});
