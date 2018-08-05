const MAX_INDENT = 4;   // インデントの最大数
const MIN_INDENT = 1;   // インデントの最小値

function isIndentIncrement(indent_val, prev_indent_val) {
  var diff_val = indent_val - prev_indent_val;

  /* 条件
   1. インデント値が上限値である
   2. トップのコメントである（ひとつ上のコメントがない）
   3. ひとつ上のコメントよりも2つ以上下げられない
  */

  if (indent_val >= MAX_INDENT || isNaN(prev_indent_val) || diff_val > 0) {
    return false;
  }
  return true;
}

function isIndentDecrement(indent_val) {
  /* 条件
   1. インデント値が下限値である
  */
  if (indent_val <= MIN_INDENT) {
    return false;
  }
  return true;
}

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

$(function() {
  // Comment インデント インクリメントボタン
  $('#topic-area').on(
    'click', '.cmt-indent-inc-btn', function(){
      // 対象コメントのindent-area要素を取得
      var indent_ele = $(this).parents('.cmt-block').find('.cmt-indent-num');
      //対象コメントのindent番号を取得
      var indent_val = parseInt(indent_ele.val(), 10);
      //ひとつ上のコメントのindent番号を取得
      var prev_indent_val = parseInt($(this).parents('.cmt-block').prev('ul').find('.cmt-indent-num').val(), 10);

      if (isIndentIncrement(indent_val, prev_indent_val)){
        // 1. comment.indentの値を一つ加算
        indent_ele.val(indent_val + 1);

        // 2. インデント表示を変更
        var indent_area = $(this).parents('.cmt-block').find('.indent-area');
        indent_area.removeClass("indent-" + indent_val.toString(10));
        indent_area.addClass("indent-" + (indent_val + 1).toString(10));

        // 3. 必要に応じてインデントボタンのCSSを変更する。
        // 3-1. ホバーを殺す
        // 3-2. 背景色を変える

      } else {
        console.log("インデント不可！");
      }
    }
  );

  // Commentインデント デクリメントボタン
  $('#topic-area').on(
    'click', '.cmt-indent-dec-btn', function(){
      var indent_ele = $(this).parent().find('.cmt-indent-num');
      var indent_val = parseInt(indent_ele.val(), 10);

      if (isIndentDecrement(indent_val)){
      // if (indent_val > MIN_INDENT) {
        // 1. comment.indentの値を一つ加算
        indent_ele.val(indent_val - 1);

        // 2. インデント表示を変更
        var indent_area = $(this).parents('.cmt-block').find('.indent-area');
        indent_area.removeClass("indent-" + indent_val.toString(10));
        indent_area.addClass("indent-" + (indent_val - 1).toString(10));

        // console.log(indent_ele.val());
      } else {
        // console.log(indent_ele.val() + ': もうインデントを削除出来ない');
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

      // 2. comment の表示をひとつ上げる。
      // 2-1. Commentのsort_numの設定要素を全て取得する
      // 2-2. 取得順にsort_numを設定する
    }
  );
});
