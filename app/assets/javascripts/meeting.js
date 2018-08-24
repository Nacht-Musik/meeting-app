/////////////////////////////////////////////////////////////////
// 定数宣言
const MAX_INDENT = 4;   // インデントの最大数
const MIN_INDENT = 1;   // インデントの最小値

////////////////////////////////////////////////////////////////
// JavaScriptの動作確認用
$(document).on('turbolinks:load', function() {
  $('#test-btn').on('click', function () {
      console.log('#--- test-btn exec! ---#');
    }
  );
});

/////////////////////////////////////////////////////////////////
// コメント移動ボタン 関連
$(document).on('turbolinks:load', function() {
  // Comment 右移動ボタン
  $('#topic-area').on('click', '.cmt-indent-right-btn', function() {
    // 対象コメントブロック要素を取得
    var cmt_block_ele = $(this).parents('.cmt-block');

    if (isCommentMoveRight(cmt_block_ele)) {
      // 0. 子孫コメントを全て取得
      var progency_comments = findProgenyComments(cmt_block_ele);

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
      // console.log("右移動出来ない！");
    }
  });

  // Comment 左移動ボタン
  $('#topic-area').on('click', '.cmt-indent-left-btn', function(){
    // 対象コメントブロック要素を取得
    var cmt_block_ele = $(this).parents('.cmt-block');

    if (isCommentMoveLeft(cmt_block_ele)){
      // 0. 子孫コメントを全て取得
      var progency_comments = findProgenyComments(cmt_block_ele);

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
      // console.log("左移動出来ない！");
    }
  });
});


///////////////////////////////////////////////////////////
// Topic/Comment 並び順設定 関連
$(document).on('turbolinks:load', function() {
  // Meeting Submitボタン
  $('#meeting-submit-btn').on('click', function(){
    // 1. Topicのソート番号を表示順に設定
    setSortNumForTopics();

    // 2. Topic毎にCommentのソート番号を表示順に設定
    let topic_cards = findTopicCards();
    $.each(topic_cards, function(){
      setSortNumForComments($(this));
    });
  });
});

////////////////////////////////////////////////////////////////////////////////
// Topic/Comment 追加ボタン 関連
$(document).on('turbolinks:load', function() {
  $('form').on('click', '.remove_fields', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('fieldset').hide();
    return event.preventDefault();
  });

  // Topic追加ボタンの処理
  $('form').on('click', '.topic-add-btn', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');

    // 追加するDOMを設定
    var dom = $(this).data('fields').replace(regexp, time);
    // 要素をボタンの直前に追加
    $(this).before(dom);

    return event.preventDefault();
  });

  // Comment追加ボタンの処理
  $('form').on('click', '.cmt-add-btn', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');

    // 追加するDOMを設定
    var dom = $(this).data('fields').replace(regexp, time);
    // 要素をボタンの直前に追加
    $(this).before(dom);

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();

    return event.preventDefault();
  });

  // 子供コメント追加ボタン
  $('#topic-area').on('click', '.child-cmt-add-btn', function(event){
    // 対象コメント要素を取得
    var cmt_block_ele = $(this).parents('.cmt-block');

    // 子供コメント要素を作成
    var child_cmt_ele = makeChildCmtEle(cmt_block_ele);

    // 子供コメント要素を対象コメントの直下に追加
    cmt_block_ele.after(child_cmt_ele);

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();


    return event.preventDefault();
  });
});

////////////////////////////////////////////////////////////////////////////////
// Topic / Comment 削除ボタン
$(document).on('turbolinks:load', function() {
  // Topic削除ボタン
  $('#topic-area').on('click', '.topic-del-btn', function(){
    // 対象Topicの要素を取得
    var topic_card_ele = $(this).parents('.topic-card');
    // 対象Topicの削除フラグ要素を取得
    var topic_destroy_flag = topic_card_ele.prev('.topic-destroy-flag');

    // 対象トピックの削除フラグを立てて、要素を削除する。
    topic_destroy_flag.val('true');
    topic_card_ele.remove();
  });

  // Comment削除ボタン
  $('#topic-area').on('click', '.cmt-del-btn', function(){
    // 対象コメント要素を取得
    var cmt_block_ele = $(this).parents('.cmt-block');
    // 対象Commentの削除フラグ要素を取得
    var cmt_destroy_flag = cmt_block_ele.prev('.cmt-destroy-flag');

    // 子孫コメントを全て 1 段階昇格（左に1つ移動)
    var progeny_cmts = findProgenyComments(cmt_block_ele);
    $.each(progeny_cmts, function(i, progeny){
      commentMoveLeft(progeny);
    });


    // コメント削除フラグを立てて、要素を削除する
    cmt_destroy_flag.val('true');
    cmt_block_ele.remove();

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();
  });
});

////////////////////////////////////////////////////////////////////////////////
// Card開閉ボタン
$(document).on('turbolinks:load', function() {
  $('#meeting-page').on('click', '.card-toggle-btn',function(){
    var card_block_ele = $(this).closest('.card');
    var card_body_ele = card_block_ele.children('.card-body');
    card_body_ele.slideToggle();
    $(this).find('i').toggleClass('fa-toggle-on fa-toggle-off');
  });
});
