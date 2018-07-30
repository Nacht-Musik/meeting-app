const MAX_INDENT = 4;   // インデントの最大数
const MIN_INDENT = 1;   // インデントの最小値


$(function(){
  $('#topic-area').on(
    'click', '#comment-add-btn', function(){

    }
  );
  // Comment インデント インクリメントボタン
  $('#topic-area').on(
    'click', '.cmt-indent-inc-btn', function(){
      //対象コメントのindent設定要素を取得
      var indent_ele = $(this).parent().find('.cmt-indent-num');
      var indent_val = parseInt(indent_ele.val(), 10);

      // indentが実行可能な条件を洗い出し、
      // 条件分岐を実装する！
      if (indent_val < MAX_INDENT) {
        // 1. comment.indentの値を一つ加算
        indent_ele.val(indent_val + 1);

        // 2. インデント表示を変更
        var indent_area = $(this).parent().parent().find('.indent-area');
        indent_area.removeClass("indent-" + indent_val.toString(10));
        indent_area.addClass("indent-" + (indent_val + 1).toString(10));

        // debug用
        // console.log(indent_ele.val());
      } else {
        // debut用
        // console.log(indent_ele.val() + ': もうインデントを追加出来ない');
      }
    }
  );

  // Commentインデント デクリメントボタン
  $('#topic-area').on(
    'click', '.cmt-indent-dec-btn', function(){
      var indent_ele = $(this).parent().find('.cmt-indent-num');
      var indent_val = parseInt(indent_ele.val(), 10);

      if (indent_val > MIN_INDENT) {
        // 1. comment.indentの値を一つ加算
        indent_ele.val(indent_val - 1);

        // 2. インデント表示を変更
        var indent_area = $(this).parent().parent().find('.indent-area');
        indent_area.removeClass("indent-" + indent_val.toString(10));
        indent_area.addClass("indent-" + (indent_val - 1).toString(10));

        // debug用
        // console.log(indent_ele.val());
      } else {
        // debug用
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
