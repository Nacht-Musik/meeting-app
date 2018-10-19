/////////////////////////////////////////////////////
// 会議録フォームの初期化関数
function initializationMeetingForm(){
  // コメント移動ボタンの状態を初期化
  changeStateAllCommentMoveBtn();

  // ユーザーセレクタを初期化
  initializationUserSelector();

  // データピッカーの初期化
  initializationDataPicker();

  // 日付の初期値を設定
  setInitialDataTime();

  // 参加者表示領域の初期化
  initializationAttendeesField();
}

// 参加者表示領域を初期化
function initializationAttendeesField(){
  // 参加者無しならその旨のメッセージを表示
  if(isEmptyAttendees()){
    $('#attendee-empty-msg').removeClass('d-none');
  }
}

function initializationDataPicker(){
  $('#date-picker').datetimepicker({
    format: 'YYYY-MM-DD',
  });
}

function setInitialDataTime(){
  $(function () {
    $('#start-time-picker').datetimepicker({
      format: 'HH:mm',
      stepping: 5,
      defaultDate: moment('10:00', 'HH:mm'),
    });
    $('#finish-time-picker').datetimepicker({
      format: 'HH:mm',
      stepping: 5,
      defaultDate: moment('11:00', 'HH:mm'),
    });
  });
}

/////////////////////////////////////////////////////
// 会議タイプ選択ページの初期化
function initializationMeetingTypeSelect(){

}


// 会議タイプ情報をボタンにセット
function setMeetingTypeInfo(btn_ele, type_id, project_id, group_id, scope_id, approval_flow_flag){
  let common = '/meetings/new?';
  let scope = 'scope_id=' + scope_id;
  let group = 'group_id=' + group_id;
  let project = 'project_id=' + project_id;
  let type = 'type_id=' + type_id;
  let approval = 'approval_flow_flag=' + approval_flow_flag;
  let href = common + scope + "&" + project + "&" + group + "&" + type + "&" + approval;
  btn_ele.attr('href', href);
}


/////////////////////////////////////////////////////
// コメントの右移動可否を確認
function isCommentMoveRight(cmt_block_ele) {
  /* 移動不可能条件
   1. インデント値が上限値である
   2. トップのコメントである（ひとつ上のコメントがない）
   3. ひとつ上のコメントよりも2つ以上下げられない
  */
  let indent_val = getIndentVal(cmt_block_ele);
  let prev_cmt_block_ele = findPrevCmtBlockEle(cmt_block_ele);
  let prev_indent_val = getIndentVal(prev_cmt_block_ele);
  let diff_val = indent_val - prev_indent_val;

  if (indent_val >= MAX_INDENT || isNaN(prev_indent_val) || diff_val > 0) {
    return false;
  }
  return true;
}

// コメントの左移動可否を確認
function isCommentMoveLeft(cmt_block_ele) {
  let indent_val = getIndentVal(cmt_block_ele);

  /* 条件
   1. インデント値が下限値(最左)である
  */
  if (indent_val <= MIN_INDENT) {
    return false;
  }
  return true;
}

// 指定コメントを右に移動させる
function commentMoveRight(cmt_block_ele) {
  // 1. 現在のインデント値を取得
  let actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);

  // 2.View(見かけ)のインデントを変更
  let indent_area = cmt_block_ele.find('.indent-area');
  indent_area.removeClass("indent-" + actual_val.toString(10));
  indent_area.addClass("indent-" + (actual_val + 1).toString(10));

  // 3. 指定コメントのインデント値を一つ上げる
  incrementIndentVal(cmt_block_ele);
}

// 指定コメントを左に移動させる
function commentMoveLeft(cmt_block_ele) {
  // 1. 現在のインデント値を取得
  let actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);

  // 2.View(見かけ)のインデントを変更
  let indent_area = cmt_block_ele.find('.indent-area');
  indent_area.removeClass("indent-" + actual_val.toString(10));
  indent_area.addClass("indent-" + (actual_val - 1).toString(10));

  // 3. 指定コメントのインデント値を一つ下げる
  decrementIndentVal(cmt_block_ele);
}

// 指定コメント要素の子供コメント要素を全て取得
function findChildComments(cmt_block_ele){
  let child_cmts = [];
  let actual_indent_val = getIndentVal(cmt_block_ele);
  let next_cmt_block_ele;
  let next_cmt_indent_val;

  // 子コメントを1つ以上持っているかを確認。１つもなかったらNaNを返す.
  if(!hasChildComment(cmt_block_ele)){
    return NaN;
  } else {
    next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
    child_cmts.push(next_cmt_block_ele);
  }
  // 子孫コメントがなくなるまでループ
  while(true){
    next_cmt_block_ele = findNextCmtBlockEle(next_cmt_block_ele);
    next_cmt_indent_val = getIndentVal(next_cmt_block_ele);
    if(isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val){
      break;
    }
    if(actual_indent_val + 1 ===  next_cmt_indent_val){
      child_cmts.push(next_cmt_block_ele);
    }
  }
  return child_cmts;
}

// 指定コメント要素の子孫コメント要素を全て取得
function findProgenyComments(cmt_block_ele) {
  let progency_comments = [];
  let actual_indent_val = getIndentVal(cmt_block_ele);
  let next_cmt_block_ele;
  let next_cmt_indent_val;

  // 子コメントを1つ以上持っているかを確認。１つもなかったらNaNを返す.
  if(!hasChildComment(cmt_block_ele)){
    return NaN;
  } else {
    // next_cmt_block_ele = cmt_block_ele.next('ul');
    next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
    progency_comments.push(next_cmt_block_ele);
  }
  // 子孫コメントがなくなるまでループ
  while(true){
    next_cmt_block_ele = findNextCmtBlockEle(next_cmt_block_ele);
    next_cmt_indent_val = getIndentVal(next_cmt_block_ele);
    if(isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val){
      break;
    }
    progency_comments.push(next_cmt_block_ele);
  }
  return progency_comments;
}

// 子コメントを持っているか否かを判定
function hasChildComment(cmt_block_ele) {
  let actual_indent_val = getIndentVal(cmt_block_ele);
  let next_cmt_block_ele = findNextCmtBlockEle(cmt_block_ele);
  let next_cmt_indent_val = getIndentVal(next_cmt_block_ele);

  if (isNaN(next_cmt_indent_val) || actual_indent_val >= next_cmt_indent_val) {
    return false;
  }
  return true;
}

// 直前のコメントブロック要素を取得
function findPrevCmtBlockEle(cmt_block_ele) {
  let prev_cmt_block_ele = cmt_block_ele.prev();

  // 前の要素がある限り探し続ける
  while(prev_cmt_block_ele.length == 1) {
    if(prev_cmt_block_ele.hasClass('cmt-block')){
      break;
    }

    prev_cmt_block_ele = prev_cmt_block_ele.prev();
  }
  return prev_cmt_block_ele;
}

// 直後のコメントブロック要素を取得
function findNextCmtBlockEle(cmt_block_ele) {
  let next_cmt_block_ele = cmt_block_ele.next();

  // 次の要素がある限り探し続ける
  while(next_cmt_block_ele.length == 1) {
    if(next_cmt_block_ele.hasClass('cmt-block')){
      break;
    }

    next_cmt_block_ele = next_cmt_block_ele.next();
  }
  return next_cmt_block_ele;
}

// コメント左移動ボタン要素を取得
function findCmtLeftMoveBtnEle(cmt_block_ele) {
  return cmt_block_ele.find('.cmt-indent-left-btn');
}

// コメント右移動ボタン要素を取得
function findCmtRightMoveBtnEle(cmt_block_ele) {
  return cmt_block_ele.find('.cmt-indent-right-btn');
}

// コメントのインデント値を取得
function getIndentVal(cmt_block_ele) {
  let indent_val_ele = cmt_block_ele.find('.cmt-form-indent');
  return parseInt(indent_val_ele.val(), 10);
}

// インデント値を一つ増やす
function incrementIndentVal(cmt_block_ele) {
  let actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);
  cmt_block_ele.find('.cmt-form-indent').val(actual_val + 1);
}

// インデント値を一つ下げる
function decrementIndentVal(cmt_block_ele) {
  let actual_val = parseInt(cmt_block_ele.find('.cmt-form-indent').val(), 10);
  cmt_block_ele.find('.cmt-form-indent').val(actual_val - 1);
}

// 全てのコメント移動ボタンの状態を適切な状態に変更
function changeStateAllCommentMoveBtn(){
  // Topicカードの要素を全て取得
  let topic_cards = findTopicCards();
  // 全てのコメントブロックを取得
  let comments = new Array(topic_cards.length);
  $.each(topic_cards, function(i) {
    comments[i] = findCommentBlocks($(this));
  });

  $.each(comments, function(){
    $.each($(this), function(){
      changeStateOfMoveLeftBtn($(this));
      changeStateOfMoveRightBtn($(this));
    });
  });
}

// 右移動ボタンの状態変更
function changeStateOfMoveRightBtn(cmt_block_ele){
  let right_btn_ele = findCmtRightMoveBtnEle(cmt_block_ele);

  if (!isCommentMoveRight(cmt_block_ele)) {
    right_btn_ele.addClass("disabled");
  } else {
    right_btn_ele.removeClass("disabled");
  }
}

// 左移動ボタンの状態変更
function changeStateOfMoveLeftBtn(cmt_block_ele) {
  let left_btn_ele = findCmtLeftMoveBtnEle(cmt_block_ele);

  if (!isCommentMoveLeft(cmt_block_ele)) {
    left_btn_ele.addClass("disabled");
  } else {
    left_btn_ele.removeClass("disabled");
  }
}

// トピックカードを全て取得
function findTopicCards() {
  return $('#topic-area').find('.topic-card');
}

// コメントブロックを全て取得
function findCommentBlocks(topic_card_ele) {
  return topic_card_ele.find('.cmt-block');
}

// 全てのTopicにソート番号を設定
function setSortNumForTopics() {
  let topic_cards = findTopicCards();

  $.each(topic_cards, function(i){
    $(this).find('.topic-sort-num').val(i);
  });
}

// 指定Topic内の全てのCommentにソート番号を設定
function setSortNumForComments(topic_card_ele) {
  let cmt_blocks = findCommentBlocks(topic_card_ele);
  $.each(cmt_blocks, function(i){
    $(this).find('.cmt-form-sort-num').val(i);
  });
}

///////////////////////////////////////////////////////////////////////////////
//// 子コメント追加ボタン関連
// 次の同列コメント追加ボタン
function makeNextCmtEle(cmt_block_ele){
  // コメントブロックのコピーを作成
  let next_cmt_ele = cmt_block_ele.clone();

  let id_components = getChildCmtIdComponents(cmt_block_ele);
  let next_id_com = makeChildCmtId(id_components);
  let next_name_com = makeChildCmtName(id_components);
  let cmt_items = findCmtFormItemNames(cmt_block_ele);


  $.each(cmt_items, function(i, item_name) {
    let next_id = next_id_com + "_" + item_name;
    let next_name = next_name_com + "[" + item_name + "]";

    next_cmt_ele.find("[id$=" + item_name + "]").attr('id', next_id);
    next_cmt_ele.find("[id$=" + item_name + "]").attr('name', next_name);

    // コメント内容をクリアする
    if (item_name === "name") {
      next_cmt_ele.find("[id$=" + item_name + "]").val('');
    }
  });

  return next_cmt_ele;
}

// 子コメントのID/Nameを設定する
function makeChildCmtEle(cmt_block_ele){
  // コメントブロックのコピーを作成
  let child_cmt_ele = cmt_block_ele.clone();

  let id_components = getChildCmtIdComponents(cmt_block_ele);
  let child_id_com = makeChildCmtId(id_components);
  let child_name_com = makeChildCmtName(id_components);
  let cmt_items = findCmtFormItemNames(cmt_block_ele);


  $.each(cmt_items, function(i, item_name){
    let child_id = child_id_com + "_" + item_name;
    let child_name = child_name_com + "[" + item_name + "]";

    child_cmt_ele.find("[id$=" + item_name + "]").attr('id', child_id);
    child_cmt_ele.find("[id$=" + item_name + "]").attr('name', child_name);

    // コメント内容をクリアする
    if(item_name === "name"){
      child_cmt_ele.find("[id$=" + item_name + "]").val('');
    }

    // indentをひとつ変更
    if(item_name === "indent"){
      let current_val = Number(child_cmt_ele.find("[id$=" + item_name + "]").attr('value'));
      if(current_val < MAX_INDENT){
        commentMoveRight(child_cmt_ele);
      }
    }
  });

  return child_cmt_ele
}

// 対象コメントのIDの構成要素を取得
function getChildCmtIdComponents(cmt_block_ele){
  let ele = cmt_block_ele.find("[class^=cmt-form]");
  let name = ele.attr('name');
  name = name.replace(/]/g, "")

  let components = name.split('[');
  // 最後の要素は項目名なので不要
  components.pop();

  // 新規Commentの識別子を設定
  let time = new Date().getTime();
  components[components.length - 1] = time.toString(10);

  return components;
}

// コメントForm用のidを作成
function makeChildCmtId(id_components){
  let child_id = "";

  for(let i = 0; i < id_components.length; i++){
    if( i !== id_components.length - 1){
      child_id += id_components[i] + "_";
    }else{
      child_id += id_components[i];
    }
  }
  return child_id;
}

// コメントForm用のnameを作成
function makeChildCmtName(id_components){
  let name = "";
  for(let i = 0; i < id_components.length; i++){
    if( i === 0){
      name += id_components[i];
    }else{
      name += "[" + id_components[i] + "]";
    }
  }
  return name;
}

// コメントフォーム内のItem名を全て取得
function findCmtFormItemNames(cmt_block_ele){
  let cmt_forms = cmt_block_ele.find("[class^=cmt-form]");
  let item_names = [];

  cmt_forms.each(function(i, ele){
    let name = getFormItemName(ele);
    item_names.push(name);
  });

  return item_names;
}

// 指定フォーム(<input>)のItem名を取得
function getFormItemName(item_ele){
  let ele_name = item_ele.name;

  ele_name = ele_name.replace(/]/g, "");
  let name_components = ele_name.split('[');

  //取得したname値の最後の要素のみを返す
  return name_components.pop();
}

// ユーザー（参加者／配信先）追加セレクターの初期化メソッド
function initializationUserSelector(){
  // 参加者として登録済みのユーザーをセレクターから削除する
  let attendee_ids = $('#attendees-view-area').find('.attendee-user-id');
  attendee_ids.each(function(i, user_id){
    $('#attendee-selector option[value=' + user_id.value + ']').remove();
  });

  // 配信先に登録済みのユーザーをセレクターから削除する
  let receiver_ids = $('#receiver-view-area').find('.receiver-user-id');
  receiver_ids.each(function(i, user_id){
    $('#receiver-selector option[value=' + user_id.value + ']').remove();
  });

  // 参加者追加セレクターが空だったら、追加ボタンを無効にする
  let attendee_option_num = $('#attendee-selector').children('option').length;
  if(attendee_option_num <= 0){
    $('#attendee-add-btn').addClass("disabled");
  }

  // 受信者追加セレクターが空だったら、追加ボタンを無効にする
  let receiver_option_num = $('#receiver-selector').children('option').length;
  if(receiver_option_num <= 0){
    $('#receiver-add-btn').addClass("disabled");
  }
}

// 参加者の空判定
function isEmptyAttendees(){
  let attendees_num = $('#attendees-view-area').find('.user-card').size();
  if (attendees_num > 0){
    return false;
  }
  return true
}

// select2をセットする関数
function setSelect2(selector){
 $(selector).select2({
   theme: 'bootstrap4',
   // width: '100%',
   // class: 'form-control form-control-sm',
   // allowClear: true
 });
}

