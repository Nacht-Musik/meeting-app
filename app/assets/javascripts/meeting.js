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
    let cmt_block_ele = $(this).parents('.cmt-block');

    if (isCommentMoveRight(cmt_block_ele)) {
      // 0. 子孫コメントを全て取得
      let progency_comments = findProgenyComments(cmt_block_ele);

      // 1. 対象コメントをひとつ右に移動
      commentMoveRight(cmt_block_ele);

      // 2. 対象コメントの右移動ボタンの状態を必要に応じて変更(disabled or not)
      changeStateOfMoveRightBtn(cmt_block_ele);

      // 3. 対象コメントの左移動ボタンの状態を必要に応じて変更(disabled or not)
      changeStateOfMoveLeftBtn(cmt_block_ele);

      // 4. 直下コメントの右移動ボタンの状態を変更(disabled or not)
      let next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
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
    let cmt_block_ele = $(this).parents('.cmt-block');

    if (isCommentMoveLeft(cmt_block_ele)){
      // 0. 子孫コメントを全て取得
      let progency_comments = findProgenyComments(cmt_block_ele);

      // 1. コメントを一つ左に移動
      commentMoveLeft(cmt_block_ele);

      // 2. 対象コメントの右移動ボタンの状態を必要に応じて変更(disabled or not)
      changeStateOfMoveRightBtn(cmt_block_ele);

      // 3. 対象コメントの左移動ボタンの状態を必要に応じて変更(disabled or not)
      changeStateOfMoveLeftBtn(cmt_block_ele);

      // 4. 直下コメントの右移動ボタンの状態を必要に応じて変更
      let next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
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
    let regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');

    // 追加するDOMを設定
    let dom = $(this).data('fields').replace(regexp, time);
    // 要素をボタンの直前に追加
    $(this).before(dom);

    return event.preventDefault();
  });

  // Comment追加ボタンの処理
  $('form').on('click', '.cmt-add-btn', function(event) {
    let regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');

    // 追加するDOMを設定
    let dom = $(this).data('fields').replace(regexp, time);

    // 要素をボタンの直前に追加
    $(this).before(dom);

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();

    // setSelect2('.cmt-user-selector');
    // setSelect2('.cmt-status-selector');

    return event.preventDefault();
  });

  // 次の同列コメント追加ボタン
  $('#topic-area').on('click', '.next-cmt-add-btn', function(event){
    // 対象コメント要素を取得
    let cmt_block_ele = $(this).parents('.cmt-block');

    // 追加するコメント要素を作成
    let next_cmt_ele = makeNextCmtEle(cmt_block_ele);

    // 子孫コメントの最後のコメントを取得
    let progeny_comments = findProgenyComments(cmt_block_ele);
    let last_progeny_comment;

    if (progeny_comments.length > 0 ){
      last_progeny_comment = progeny_comments.pop();
    } else {
      last_progeny_comment = cmt_block_ele;
    }

    // 関連コメントの直下に次のコメントを追加する
    last_progeny_comment.after(next_cmt_ele);

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();

    // select2をセレクターに適用
    // setSelect2('.cmt-user-selector');
    // setSelect2('.cmt-status-selector');

    return event.preventDefault();
  });

  // 子供コメント追加ボタン
  $('#topic-area').on('click', '.child-cmt-add-btn', function(event){
    // 対象コメント要素を取得
    let cmt_block_ele = $(this).parents('.cmt-block');

    // 子供コメント要素を作成
    let child_cmt_ele = makeChildCmtEle(cmt_block_ele);

    // 子供コメント要素を対象コメントの直下に追加
    cmt_block_ele.after(child_cmt_ele);

    // コメント移動ボタンの状態を再設定
    changeStateAllCommentMoveBtn();

    // select2をセレクターに適用
    // setSelect2('.cmt-user-selector');
    // setSelect2('.cmt-status-selector');

    return event.preventDefault();
  });
});

////////////////////////////////////////////////////////////////////////////////
// Topic / Comment 削除ボタン
$(document).on('turbolinks:load', function() {
  // Topic削除ボタン
  $('#topic-area').on('click', '.topic-del-btn', function(){
    // 対象Topicの要素を取得
    let topic_card_ele = $(this).parents('.topic-card');
    // 対象Topicの削除フラグ要素を取得
    let topic_destroy_flag = topic_card_ele.prev('.topic-destroy-flag');

    // 対象トピックの削除フラグを立てて、要素を削除する。
    topic_destroy_flag.val('true');
    topic_card_ele.remove();
  });

  // Comment削除ボタン
  $('#topic-area').on('click', '.cmt-del-btn', function(){
    // 対象コメント要素を取得
    let cmt_block_ele = $(this).parents('.cmt-block');
    // 対象Commentの削除フラグ要素を取得
    let cmt_destroy_flag = cmt_block_ele.prev('.cmt-destroy-flag');

    // 子孫コメントを全て 1 段階昇格（左に1つ移動)
    let progeny_cmts = findProgenyComments(cmt_block_ele);
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
// 参加者 追加／削除ボタン
$(document).on('turbolinks:load', function() {
  $('#meeting-page').on('click', '#attendee-add-btn',function(){
    // セレクターで選択されているユーザー名を取得
    let selected_user_name = $('#attendee-selector option:selected').text();

    // 選択ユーザー名が空の場合、追加処理を実行しない
    if(selected_user_name === ""){
      return;
    }

    let item_name = "attendees_attributes";

    // ユーザー（参加者）ブロックをコピー
    let user_block = $("#meeting-page").find('#user-block-template').clone();
    user_block.attr('ID', '');

    // 追加する参加者用のModel用識別子の共通部を生成
    let user_num = new Date().getTime().toString();
    let user_id = "meeting_" + item_name + "_" + user_num;
    let user_name = "meeting[" + item_name + "][" + user_num + "]";

    // セレクターで選択されているユーザーのuser_idを取得
    let selected_user_id = $('#attendee-selector option:selected').val();
    user_block.find('.user-name').text(selected_user_name);

    // user_id 設定要素に 追加するユーザーの識別子を設定
    let user_id_ele = user_block.find('#meeting_item_name_number_user_id');
    user_id_ele.attr('name', user_name + "[user_id]");
    user_id_ele.attr('id', user_id + "_user_id");
    user_id_ele.attr('value', selected_user_id);

    // destroyフラグに追加するユーザーの識別子を設定
    let destroy_flag_ele = user_block.find('#meeting_item_name_number__destroy');
    destroy_flag_ele.attr('name', user_name + "[_destroy]");
    destroy_flag_ele.attr('id', user_id + "__destroy");

    // 削除ボタンのclassを参加者(attendee)用に変更
    let del_btn_ele = user_block.find('.user-del-btn');
    del_btn_ele.removeClass('user-del-btn');
    del_btn_ele.addClass('attendee-del-btn');


    // 作成したユーザーブロックを指定のエリアの末に追加
    $('#attendees-view-area').append(user_block);

    // 参加者セレクターから追加したユーザーを削除
    $('#attendee-selector option:selected').remove();

    // 参加者無しメッセージを非表示にする
    if($('#attendee-empty-msg').not('d-none')){
      $('#attendee-empty-msg').addClass('d-none');
    }

    // セレクターの中身が空になったら、追加ボタンを無効にする
    let option_num = $('#attendee-selector').children('option').length;
    if(option_num <= 0){
      $(this).addClass("disabled");
    }
  });


  // 参加者削除ボタン
  $('#meeting-page').on('click', '.attendee-del-btn',function(){
    let user_block_ele = $(this).closest('.user-block');

    // 参加者セレクターに削除ユーザーを追加する
    let user_name = user_block_ele.find('.user-name').text();
    let user_id = user_block_ele.find('.attendee-user-id').attr('value');

    let add_option_attr = {value: user_id, text: user_name}
    let add_option = $('<option>', add_option_attr);

    // 対象ユーザーの削除フラグをtrueにする
    user_block_ele.find('.attendee-destroy-flag').attr('value', 'true');

    // 参加者セレクターに削除したユーザーを追加する
    $('#attendee-selector').append(add_option);

    // 削除対象ユーザーの表示要素を削除
    let user_card_ele = $(this).closest('.user-card');
    user_card_ele.remove();

    // 参加者がゼロになったら、空メッセージを表示
    if (isEmptyAttendees()){
      $('#attendee-empty-msg').removeClass('d-none');

    }

    // 追加ボタンが無効になっていたら有効にする。
    if ($('#attendee-add-btn').hasClass('disabled')){
      $('#attendee-add-btn').removeClass("disabled");
    }

  });
});


/////////////////////////////////////////////////////////////
// 配布先(受信者) 追加／削除ボタン
$(document).on('turbolinks:load', function() {
  $('#meeting-page').on('click', '#receiver-add-btn', function () {
    // セレクターで選択されているユーザー名を取得
    let selected_user_name = $('#receiver-selector option:selected').text();

    // 選択ユーザー名が空の場合、追加処理を実行しない
    if(selected_user_name === ""){
      return;
    }

    let item_name = "receiveres_attributes";

    // ユーザーブロックのテンプレートをコピー
    let user_block = $("#meeting-page").find('#user-block-template').clone();
    user_block.attr('ID', '');

    // 追加する受信者のModel用識別子の共通部を生成
    let user_num = new Date().getTime().toString();
    let user_id = "meeting_" + item_name + "_" + user_num;
    let user_name = "meeting[" + item_name + "][" + user_num + "]";

    // セレクターで選択されているユーザーのuser_idを取得
    let selected_user_id = $('#receiver-selector option:selected').val();
    user_block.find('.user-name').text(selected_user_name);

    // user_id 設定要素に 追加するユーザーの識別子を設定
    let user_id_ele = user_block.find('#meeting_item_name_number_user_id');
    user_id_ele.attr('name', user_name + "[user_id]");
    user_id_ele.attr('id', user_id + "_user_id");
    user_id_ele.attr('value', selected_user_id);


    // destroyフラグに追加するユーザーの識別子を設定
    let destroy_flag_ele = user_block.find('#meeting_item_name_number__destroy');
    destroy_flag_ele.attr('name', user_name + "[_destroy]");
    destroy_flag_ele.attr('id', user_id + "__destroy");


    // 受信タイプを取得する。
    let selected_receiver_type_id = $('#receiver-type-selector option:selected').attr('value');

    // receive_type要素を作成
    let type_id_ele = user_id_ele.clone();
    type_id_ele.removeClass("user-block-user_id");
    type_id_ele.addClass("user-block-type_id");

    type_id_ele.attr('name', user_name + "[type_id]");
    type_id_ele.attr('id', user_id + "_type_id");
    type_id_ele.attr('value', selected_receiver_type_id);

    // receive_typeの設定要素を追加
    user_block.prepend(type_id_ele);


    // 削除ボタンのclassを参加者(attendee)用に変更
    let del_btn_ele = user_block.find('.user-del-btn');
    del_btn_ele.removeClass('user-del-btn');
    del_btn_ele.addClass('receiver-del-btn');

    //
    if(selected_receiver_type_id === "1"){
      $('#receiver-to-area.card').children('.card-body').append(user_block);
    } else if(selected_receiver_type_id === "2"){
      $('#receiver-cc-area.card').children('.card-body').append(user_block);
    } else if(selected_receiver_type_id === "3"){
      $('#receiver-bcc-area.card').children('.card-body').append(user_block);
    }

    // 配信先セレクターから追加したユーザーを削除
    $('#receiver-selector option:selected').remove();

    // セレクターの中身が空になったら、追加ボタンを無効にする
    let option_num = $('#receiver-selector').children('option').length;
    if(option_num <= 0){
      $(this).addClass("disabled");
    }
  });

  // 受信者 削除ボタン
  $('#meeting-page').on('click', '.receiver-del-btn',function() {
    let user_block_ele = $(this).closest('.user-block');

    // 受信者セレクターに削除ユーザーを追加する
    let user_name = user_block_ele.find('.user-name').text();
    let user_id = user_block_ele.find('.receiver-user-id').attr('value');

    let add_option_attr = {value: user_id, text: user_name};
    let add_option = $('<option>', add_option_attr);

    // 対象ユーザーの削除フラグをtrueにする
    user_block_ele.find('.receiver-destroy-flag').attr('value', 'true');

    // 参加者セレクターに削除したユーザーを追加する
    $('#receiver-selector').append(add_option);

    // 削除対象ユーザーの表示要素を削除
    let user_card_ele = $(this).closest('.user-card');
    user_card_ele.remove();

    // 追加ボタンが無効になっていたら有効にする。
    if ($('#receiver-add-btn').hasClass('disabled')) {
      $('#receiver-add-btn').removeClass("disabled");
    }
  });
});

///////////////////////////////////////////////////////////////////
// ドロップアンドドラッグ並び替え
$(document).on('turbolinks:load', function() {
  // Topicカード D&D 並び替え
  $('#topic-area').sortable({
    cancel: ":input,button",
    items: ".card",
    containment: "#topic-area",
    tolerance: "pointer",
    delay: 200,
    distance: 15,
    opacity: 0.5,
    revert: 100,
  });
});

///////////////////////////////////////////////////////////////////
// 会議タイプセレクトページ関連
$(document).on('turbolinks:load', function() {
  // フリー会議：タブを押下
  $('#meeting-type-select').on('click', '#free-type-btn', function () {
    let type_id = FREE_MEETING_TYPE_ID;
    let scope_id = ALL_SCOPE_ID;
    let project_id = "";
    let group_id = "";
    let approval_btn = $("#free-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, project_id, group_id, scope_id, approval_flag);
  });

  // プロジェクト会議：タブを押下
  $('#meeting-type-select').on('click', '#project-type-btn', function () {
    let type_id = PROJECT_MEETING_TYPE_ID;
    let project_id = $('#project-selector option:selected').val();
    let scope_btn = $("#project-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_btn = $("#project-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, project_id, "", scope_id, approval_flag);
  });
  // プロジェクト：対象プロジェクトを変更
  $('#meeting-type-select').on('change', '#project-selector', function () {
    let type_id = PROJECT_MEETING_TYPE_ID;
    let project_id = $('#project-selector option:selected').val();
    let scope_btn = $("#project-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_btn = $("#project-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, project_id, "", scope_id, approval_flag);
  });
  // プロジェクト：参加メンバー範囲を変更
  $('#meeting-type-select').on('change', '#project-area-select input[type=radio]', function () {
    let type_id = PROJECT_MEETING_TYPE_ID;
    let project_id = $('#project-selector option:selected').val();
    let scope_id = this.value;
    let approval_btn = $("#group-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, project_id, "", scope_id, approval_flag);
  });
  // プロジェクト：承認フローを変更
  $('#meeting-type-select').on('change', '#project-approval-flow-flag input[type=radio]', function () {
    let type_id = PROJECT_MEETING_TYPE_ID;
    let project_id = $('#project-selector option:selected').val();
    let scope_btn = $("#project-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_flag = this.value;
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, project_id, "", scope_id, approval_flag);
  });

  // グループタブを押下
  $('#meeting-type-select').on('click', '#group-type-btn', function () {
    let type_id = GROUP_MEETING_TYPE_ID;
    let group_id = $('#group-selector option:selected').val();
    let scope_btn = $("#group-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_btn = $("#group-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, "", group_id, scope_id, approval_flag);
  });
  // グループ：対象グループを変更
  $('#meeting-type-select').on('change', '#group-selector', function () {
    let type_id = GROUP_MEETING_TYPE_ID;
    let group_id = $('#group-selector option:selected').val();
    let scope_btn = $("#group-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_btn = $("#group-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, "", group_id, scope_id, approval_flag);
  });
  // グループ：参加メンバー範囲を変更
  $('#meeting-type-select').on('change', '#group-area-select input[type=radio]', function () {
    let type_id = GROUP_MEETING_TYPE_ID;
    let group_id = $('#group-selector option:selected').val();
    let scope_id = this.value;
    let approval_btn = $("#group-approval-flow-flag").find(".active");
    let approval_flag = approval_btn.children("input").val();
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, "", group_id, scope_id, approval_flag);
  });
  // グループ：承認フローを変更
  $('#meeting-type-select').on('change', '#group-approval-flow-flag input[type=radio]', function () {
    let type_id = GROUP_MEETING_TYPE_ID;
    let group_id = $('#group-selector option:selected').val();
    let scope_btn = $("#group-area-select").find(".active");
    let scope_id = scope_btn.children("input").val();
    let approval_flag = this.value;
    setMeetingTypeInfo($('#new-meeting-btn'), type_id, "", group_id, scope_id, approval_flag);
  });

  // セレクターにselect2を適用
  $('#group-selector').select2({
    theme: 'bootstrap4',
    width: '100%',
  });
  $('#project-selector').select2({
    theme: 'bootstrap4',
    width: '100%'
  });
});

///////////////////////////////////////////////////////////////////
// select2 設定（セレクターに検索機能付加）
$(document).on('turbolinks:load', function() {
  $('.select2-selector').select2({
    theme: 'bootstrap4',
  });

  $('.select2-w100p').select2({
    theme: 'bootstrap4',
    width: '100%',
    class: 'form-control form-control-sm',
  });

  $('.select2-w80p').select2({
    theme: 'bootstrap4',
    width: '80%',
    class: 'form-control form-control-sm',
  });
  $('.select2-w60p').select2({
    theme: 'bootstrap4',
    width: '60%',
    class: 'form-control form-control-sm',
  });
});

// Select2 のキャッシュクリア（戻るボタンでselect2要素が複製される問題の対策）
$(document).on('turbolinks:before-cache', function() {
  $('.select2-selector').select2('destroy');
  $('.select2-w100p').select2('destroy');
  $('#group-selector').select2('destroy');
  $('#project-selector').select2('destroy');
} );