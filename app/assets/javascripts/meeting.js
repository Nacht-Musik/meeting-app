$(function(){
  // Topic追加処理
  var topicNum = 1;
  $('#topic-add-btn').on({
    // 1. Topicブロックを所定の位置に追加する
    'click': function(){
      // Topicナンバーを更新
      topicNum++;
      // Topicのテンプレートブロックを取得
      topicTemplate = $('#topic-template').clone(true);

      // （未解決部分) %input のVlue値を一つ更新する！
      // （未解決部分) renderに引数sort_numを渡す

      // 要素非表示クラスを除去
      $(topicTemplate).removeClass('d-none');
      // 要素非表示クラスを除去
      $(topicTemplate).removeAttr('id');
      // 追加するTopicブロックのidを設定
      var id = 'topic-' + topicNum;
      $(topicTemplate).attr('id', id);

      // 作成したTopicブロックを追加
      $('#topic-area').append(topicTemplate);

    }
  });

  // Comment 追加処理
  $('#cmt-add-btn').on({
    // 1. commentブロックを所定の位置に追加する
    'click': function(){
      console.log('Comment追加ボタンがクリックされました');
      alert('Comment追加ボタンをクリックしました');
    }
  });

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
