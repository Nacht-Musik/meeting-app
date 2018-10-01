$(document).on('turbolinks:load', function() {
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
});
