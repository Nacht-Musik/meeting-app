class RenameAuthoritherColumnToMeeting < ActiveRecord::Migration[5.1]
  def change
    rename_column :meetings, :authorither_id, :approver_id
  end
end
