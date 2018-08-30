/////////////////////////////////////////////////////////////////
// 定数宣言
const MAX_INDENT = 5;   // インデントの最大数
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

////////////////////////////////////////////////////////////////////////////////
// Attendee追加ボタン
$(document).on('turbolinks:load', function() {
  $('#meeting-page').on('click', '.attendee-add-btn',function(){
    // セレクターで選択されているユーザー名を取得
    var selected_user_name = $('#attendee-selector option:selected').text();

    // 選択ユーザー名が空の場合、追加処理を実行しない
    if(selected_user_name === ""){
      return;
    }

    var item_name = "attendees_attributes";

    // ユーザー（参加者）ブロックをコピー
    var user_block = $("#meeting-page").find('#user-block-template').clone();
    user_block.attr('ID', '');

    // 追加する参加者用のModel用識別子の共通部を生成
    var user_num = new Date().getTime().toString();
    var user_id = "meeting_" + item_name + "_" + user_num;
    var user_name = "meeting[" + item_name + "][" + user_num + "]";

    // セレクターで選択されているユーザーのuser_idを取得
    var selected_user_id = $('#attendee-selector option:selected').val();
    user_block.find('.user-name').text(selected_user_name);

    // user_id 設定要素に 追加するユーザーの識別子を設定
    var user_id_ele = user_block.find('#meeting_item_name_number_user_id');
    user_id_ele.attr('name', user_name + "[user_id]");
    user_id_ele.attr('id', user_id + "_user_id");
    user_id_ele.attr('value', selected_user_id);


    // destroyフラグに追加するユーザーの識別子を設定
    var destroy_flag_ele = user_block.find('#meeting_item_name_number__destroy');
    destroy_flag_ele.attr('name', user_name + "[_destroy]");
    destroy_flag_ele.attr('id', user_id + "__destroy");


    // 作成したユーザーブロックを指定のエリアの末に追加
    $('#attendees-view-area').append(user_block);

    // 参加者セレクターから追加したユーザーを削除
    $('#attendee-selector option:selected').remove();
  });


  // 参加者削除ボタン
  $('#meeting-page').on('click', '.attendee-del-btn',function(){
    var user_block_ele = $(this).closest('.user-block');

    // 参加者セレクターに削除ユーザーを追加する
    var user_name = user_block_ele.find('.user-name').text();
    var user_id = user_block_ele.find('.attendee-user-id').attr('value');

    var add_option_attr = {value: user_id, text: user_name}
    var add_option = $('<option>', add_option_attr);

    // 対象ユーザーの削除フラグをtrueにする
    user_block_ele.find('.attendee-destroy-flag').attr('value', 'true');

    // 参加者セレクターに削除したユーザーを追加する
    $('#attendee-selector').append(add_option);

    // 削除対象ユーザーの表示要素を削除
    var user_card_ele = $(this).closest('.user-card');
    user_card_ele.remove();
  });
});

///////////////////////////////////////////////////////////////////
// ドロップアンドドラッグ並び替え
$(document).on('turbolinks:load', function() {
  // Topicカード D&D 並び替え
  $('#topic-area').sortable();
});

