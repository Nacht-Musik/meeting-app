// 指定user-idのmember表示部要素を取得
function findMemberRowEle(user_id) {
  let member_rows = $('#member-list-area').find('.member-row');
  let member_ele;

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
  let params;

  members_params.each(function(index, member){
    if(parseInt($(member).attr('data-user-id')) === user_id){
      params = $(member);
      return false;
    }
  });
  return params;
}

// 指定ユーザー情報を取得
function getMemberUserInfo(user_id) {
  let member_ele = findMemberRowEle(user_id);

  let last_name = member_ele.find('.user-name').attr('data-last-name');
  let first_name = member_ele.find('.user-name').attr('data-first-name');
  let email = $.trim(member_ele.find('.user-email').text());
  let authority = $.trim(member_ele.find('.user-authority').text());
  let admin_mark = member_ele.find('.user-admin').children().clone();

  let info = {last_name: last_name,
              first_name: first_name,
              email: email,
              authority: authority,
              admin_mark: admin_mark};

  return info;
}

