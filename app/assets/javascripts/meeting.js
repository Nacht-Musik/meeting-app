const MAX_INDENT = 4;   // インデントの最大数
const MIN_INDENT = 1;   // インデントの最小値


$(function() {
  // Comment 右移動ボタン
  $('#topic-area').on(
    'click', '.cmt-indent-right-btn', function(){
      // 対象コメントブロック要素を取得
      var cmt_block_ele = $(this).parents('.cmt-block');

        if (isCommentMoveRight(cmt_block_ele)) {
          // 子コメントを全て取得
          // 孫、ひ孫コメントも全て取得
          // ⇑ が存在する場合、合わせて移動する(?)

          // 1. コメントをひとつ右に移動
          commentMoveRight(cmt_block_ele);

          // 2. 必要に応じて右移動ボタンを無効化
          if (isCommentMoveRight(cmt_block_ele)) {
            $(this).removeClass("disabled");
          } else {
            $(this).addClass("disabled");
          }

          // 3. 左移動ボタンを有効化
          var move_left_btn_ele = $(this).parent().find('.cmt-indent-left-btn');
          if (move_left_btn_ele.hasClass('disabled'))
            move_left_btn_ele.removeClass('disabled');


          // 4. 直下コメントの右移動可否を確認 => (動けるようになってたら)右移動ボタンを有効化
          var next_cmt_block_ele = cmt_block_ele.next('ul');
          var next_move_right_btn_ele = findCmtRightMoveBtnEle(next_cmt_block_ele);
          if (isCommentMoveRight(next_cmt_block_ele) && next_move_right_btn_ele.hasClass('disabled')) {
            next_move_right_btn_ele.removeClass("disabled");
          }

          //////  ↓ たぶん不要  #コメント右移動後、直下コメントの左移動可否は変化しない（はず）
          // 左移動について確認 => (動けるようになってたら)左移動ボタンを有効化
          // var next_move_left_btn_ele = findCmtLeftMoveBtnEle(next_cmt_block_ele);
          // if (isCommentMoveLeft(next_cmt_block_ele) && next_move_left_btn_ele.hasClass('disabled')) {
          //   next_move_left_btn_ele.removeClass("disabled");
          // }

        } else {
          console.log("右移動出来ない！");
        }
      }
  );

  // Comment 左移動ボタン
  $('#topic-area').on(
    'click', '.cmt-indent-left-btn', function(){
      // 対象コメントブロック要素を取得
      var cmt_block_ele = $(this).parents('.cmt-block');

      if (isCommentMoveLeft(cmt_block_ele)){

        // 1. コメントを一つ左に移動
        commentMoveLeft(cmt_block_ele);

        // 2. 必要に応じて右移動ボタンを有効化する
        var move_right_btn_ele = findCmtRightMoveBtnEle(cmt_block_ele);

        if(move_right_btn_ele.hasClass('disabled'))
          move_right_btn_ele.removeClass('disabled');

        // 3. 移動後のインデント値が最小出会った場合、左移動ボタンを無効化
        if(getIndentVal(cmt_block_ele) === MIN_INDENT){
          $(this).addClass('disabled');
        }

        // 4. 直下コメントの右移動可否を確認 => 必要に応じて無効化
        var next_cmt_block_ele = cmt_block_ele.next('ul');
        var next_move_right_btn_ele = findCmtRightMoveBtnEle(next_cmt_block_ele);
        if (!isCommentMoveRight(next_cmt_block_ele) && !next_move_right_btn_ele.hasClass('disabled')) {
          next_move_right_btn_ele.addClass("disabled");
        }

      } else {
        console.log("左移動出来ない！");
      }
    }
  );

  // Meeting Submitボタン
  $('#meeting-submit-btn').on(
    'click', function(){
      // Topic-cardを全て取得する。
      var topic_cards = $("#topic-area").find('.topic-card');
      $.each(topic_cards, function(i){
        // Topic-cardを取得した順にソート番号を設定する
        var topic_sort_num = i + 1;
        $(this).find('.topic-sort-num').val(topic_sort_num);
      });

      // 2. commentソート番号を設定
      // 2-1. Commentのsort_numの設定要素を全て取得する
      // 2-2. 取得順にsort_numを設定する
    }
  );
});



////////////////////////////////////////////////////////////////////////////////////////////////////////
// Topic/Comment の動的追加関連
$(function() {
  $('form').on('click', '.remove_fields', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('fieldset').hide();
    return event.preventDefault();
  });
  return $('form').on('click', '.add_fields', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $(this).before($(this).data('fields').replace(regexp, time));
    return event.preventDefault();
  });
});
