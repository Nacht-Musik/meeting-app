const MAX_INDENT = 4;   // インデントの最大数
const MIN_INDENT = 1;   // インデントの最小値

$(document).on('turbolinks:load', function() {
  // Comment 右移動ボタン
  $('#topic-area').on(
    'click', '.cmt-indent-right-btn', function(){
      // 対象コメントブロック要素を取得
      var cmt_block_ele = $(this).parents('.cmt-block');

      if (isCommentMoveRight(cmt_block_ele)) {
        // 0. 子孫コメントを全て取得
        var progency_comments = findProgenyComments(cmt_block_ele);
        // console.log(progency_comments);

        // 1. 対象コメントをひとつ右に移動
        commentMoveRight(cmt_block_ele);

        // 2. 対象コメントの右移動ボタンの状態を必要に応じて変更(disabled or not)
        changeStateOfMoveRightBtn(cmt_block_ele);

        // 3. 対象コメントの左移動ボタンの状態を必要に応じて変更(disabled or not)
        changeStateOfMoveLeftBtn(cmt_block_ele);

        // 4. 直下コメントの右移動ボタンの状態を変更(disabled or not)
        var next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
        changeStateOfMoveRightBtn(next_cmt_block_ele);

        // 5. 対象コメントの子孫コメントも合わせて右移動する
        $.each(progency_comments, function (index, ele) {
          if (!isCommentMoveRight(ele)) {
            return;
          }
          commentMoveRight(ele);
          changeStateOfMoveRightBtn(ele);
          changeStateOfMoveLeftBtn(ele);
        });

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
      console.log(cmt_block_ele);

      if (isCommentMoveLeft(cmt_block_ele)){
        // 0. 子孫コメントを全て取得
        var progency_comments = findProgenyComments(cmt_block_ele);
        // console.log(progency_comments);

        // 1. コメントを一つ左に移動
        commentMoveLeft(cmt_block_ele);

        // 2. 対象コメントの右移動ボタンの状態を必要に応じて変更(disabled or not)
        changeStateOfMoveRightBtn(cmt_block_ele);

        // 3. 対象コメントの左移動ボタンの状態を必要に応じて変更(disabled or not)
        changeStateOfMoveLeftBtn(cmt_block_ele);

        // 4. 直下コメントの右移動ボタンの状態を必要に応じて変更
        var next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
        changeStateOfMoveRightBtn(next_cmt_block_ele);

        // 5. 対象コメントの子孫コメントも合わせて左移動する
        $.each(progency_comments, function(index, ele){
          if (!isCommentMoveLeft(ele)) {
            return;
          }
          commentMoveLeft(ele);
          changeStateOfMoveLeftBtn(ele);
          changeStateOfMoveRightBtn(ele);
        });

      } else {
        console.log("左移動出来ない！");
      }
    }
  );

  $('#test-btn').on(
    'click', function(){
      console.log('#--- test-btn exec! ---#');
      changeStateAllCommentMoveBtn();

    }
  );

  // Meeting Submitボタン
  $('#meeting-submit-btn').on(
    'click', function(){
      // Topic-cardを全て取得する。
      var topic_cards = findTopicCards();

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
$(document).on('turbolinks:load', function() {
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
