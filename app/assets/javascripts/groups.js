$(document).on('turbolinks:load', function() {
  // メンバー追加ボタン
  $('#group-page').on('click', '#member-add-btn', function () {
    console.log("メンバー追加ボタン押下");
    /*
      1. セレクターで選択されているユーザー情報を取得
      2. member-blockを生成する
      3. member-add-selector に対象ユーザーを追加する
    */
    // 追加するユーザー情報取得
    let user_id = $('#member-selector option:selected').val();
    let user_name = $('#member-selector option:selected').text();
    let authority = $('#authority-selector option:selected').val();
    let authority_text = $('#authority-selector option:selected').text();
    let admin_flag = $('#admin-selector option:selected').val();
    let admin_text = $('#admin-selector option:selected').text();
    // console.log({user_id: user_id, authority: authority, admin: admin_flag});
    // console.log({name: user_name, authority: authority_text, admin: admin_text});

    // DB登録用のid/nameを生成
    let id_com = "group_group_members_attributes";
    let name_com = "group[group_members_attributes]";

    // 固有番号をランダム取得
    let model_num = new Date().getTime().toString(10);
    id_com += "_" + model_num;
    name_com += "[" + model_num.toString(10) + "]";
    // console.log({id: id_com, name: name_com});


    // 追加ユーザーのGroupMember Model登録用データ作成
    let member_params_ele = $('#member-block-template').find('.member-params').clone();

    let user_id_ele = member_params_ele.find('.member-user-id');
    user_id_ele.val(user_id);
    user_id_ele.attr('id', id_com + "_user_id");
    user_id_ele.attr('name', name_com + "[user_id]");

    let authority_ele = member_params_ele.find('.member-authority-flag');
    authority_ele.val(authority);
    authority_ele.attr('id', id_com + "_authority_id");
    authority_ele.attr('name', name_com + "[authority_id]");

    let admin_flag_ele = member_params_ele.find('.member-admin-flag');
    admin_flag_ele.val(admin_flag);
    admin_flag_ele.attr('id', id_com + "_admin");
    admin_flag_ele.attr('name', name_com + "[admin]");

    member_params_ele.find('.member-destroy-flag').val('false');
    member_params_ele.find('.member-destroy-flag').attr('id', id_com + "__destroy");
    member_params_ele.find('.member-destroy-flag').attr('name', name_com + "[_destroy]");
    console.log(member_params_ele.find('.member-user-id'));

    $('#member-params-area').append(member_params_ele);


    // 追加ユーザーの表示用データ作成
    let member_row_ele = $('#member-block-template').find('.member-row');
    member_row_ele.find('.user-name').text(user_name);
    member_row_ele.find('.user-authority').text(authority_text);
    member_row_ele.find('.user-admin').text(admin_text);
    $('#member-list-area').append(member_row_ele);


    // 追加ユーザーをセレクターから削除
  })

  // メンバー削除ボタン
  $('#group-page').on('click', '.member-del-btn', function () {
    console.log("メンバー削除");
    /*
      0. 削除確認メッセージを表示
      1. 表示リストから対象ユーザーブロックを削除
      2. 対象ユーザーの_destroy flagを立てる
      3. member-add-selector に対象ユーザーを追加する
    */
    $(this).parents()


  })

})


// メンバーセレクターの初期化
function initializationMemberSelector() {
  /*
    1. グループメンバーのuser_idを全て取得する
    2. memberselector 内のoption.val()とmember.user_idが一致したoptionを削除する
   */

}

