$(function(){
  // Topic追加処理
  // -> nested_fields_for Gemを使用する

  // Comment 追加処理
  // -> nested_fields_for Gemを使用する

  // Comment インデントボタン
  $('#cmt-indent-inc-btn').on({
    // 1. comment.indent を1つ上げる. # indent + 1
    // 2. comment の表示をひとつ下げる。
    'click': function(){
      console.log('インデント追加ボタンがクリックされました');
      alert('インデント追加ボタンをクリックしました');
    }
  });

  // Comment デクリメントボタン
  $('#cmt-indent-dec-btn').on({
    // 1. comment.indent を1つ下げる. # indent - 1
    // 2. comment の表示をひとつ上げる。
    'click': function(){
      console.log('インデント追加ボタンがクリックされました');
      alert('インデント追加ボタンをクリックしました');
    }
  });
});
