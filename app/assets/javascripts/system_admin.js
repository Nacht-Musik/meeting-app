$(document).on('turbolinks:load', function() {
  // SystemAdmin用 Usersリストの設定
  $('#system-admin-page').find("#meetings-table").DataTable({
    //状態保持
    stateSave: true,
    // 縦方向（X軸）にスクロールを表示
    scrollX: false,
    info: false,
    language: datatables_japanese,
  });

  // SystemAdmin用 Projectsリストの設定
  $('#system-admin-page').find("#project-table").DataTable({
    //状態保持
    stateSave: true,
    // 縦方向（X軸）にスクロールを表示
    scrollX: false,
    info: false,
    language: datatables_japanese,
  });

  // SystemAdmin用 Groupsリストの設定
  $('#system-admin-page').find("#group-table").DataTable({
    //状態保持
    stateSave: true,
    // 縦方向（X軸）にスクロールを表示
    scrollX: false,
    info: false,
    language: datatables_japanese,
  });

  // SystemAdmin用 Usersリストの設定
  $('#system-admin-page').find("#user-table").DataTable({
    //状態保持
    stateSave: true,
    // 縦方向（X軸）にスクロールを表示
    scrollX: false,
    info: false,
    language: datatables_japanese,
  });
});

// DataTables のキャッシュクリア（戻るボタンでselect2要素が複製される問題の対策）
$(document).on('turbolinks:before-cache', function() {
  $("#meetings-table").DataTable().destroy();
  $("#project-table").DataTable().destroy();
  $("#group-table").DataTable().destroy();
  $("#user-table").DataTable().destroy();
});
