// メンバーセレクターの初期化
function initializationMemberSelector() {
  // 所属済みのメンバーを追加セレクターから削除
  let member_ids = $('#member-params-area').find('.member-user-id');
  member_ids.each(function(i, user_id){
    $('#member-selector option[value=' + user_id.value + ']').remove();
  });

  // メンバー追加セレクターが空なら、メンバー追加機能を無効化
  let member_option_num = $('#member-selector').children('option').length;
  if(member_option_num <= 0){
    disabledMemberAddFunction();
  }else{
    enableMemberAddFunction();
  }
}

// 指定user-idのmember表示部要素を取得
function findMemberRowEle(user_id) {
  let member_rows = $('#member-list-area').find('.member-row');
  let member_ele = "";

  member_rows.each(function(index, member){
    if(parseInt($(member).attr('data-user-id')) === user_id){
      member_ele = $(member);
      return false;
    }
  });
  return member_ele;
}

// memberパラメータ要素を取得
function findMemberParamsEle(user_id) {
  let members_params = $('#member-params-area').find('.member-params');
  let params = '';

  members_params.each(function(index, member){
    if(parseInt($(member).attr('data-user-id')) === user_id){
      params = $(member);
      return false;
    }
  });
  return params;
}

// 指定ユーザー情報を表示部から取得
function getMemberUserInfo(user_id) {
  let member_ele = findMemberRowEle(user_id);

  let last_name = member_ele.find('.user-name').attr('data-last-name');
  let first_name = member_ele.find('.user-name').attr('data-first-name');
  let email = $.trim(member_ele.find('.user-email').text());
  let authority = $.trim(member_ele.find('.user-authority').text());
  let admin_flag = member_ele.find('.user-admin').attr('data-admin-flag');

  let admin_mark = member_ele.find('.user-admin').children().clone();

  let info = {last_name: last_name,
    first_name: first_name,
    email: email,
    authority: authority,
    admin_flag: admin_flag,
    admin_mark: admin_mark};

  return info;
}

// プロジェクトメンバー追加機能を無効化
function enableMemberAddFunction() {
  $('#member-add-modal').find('.empty-message').addClass('d-none');
  $('#member-add-modal').find('.add-member-info').removeClass('d-none');
  $('#member-add-btn').removeClass('d-none');
}

// プロジェクトメンバー追加機能を無効化
function disabledMemberAddFunction() {
  $('#member-add-modal').find('.empty-message').removeClass('d-none');
  $('#member-add-modal').find('.add-member-info').addClass('d-none');
  $('#member-add-btn').addClass('d-none');
}
