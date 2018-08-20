class AddStatusToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_reference :meetings, :status, foreign_key: { to_table: :meeting_statuses}, after: :approver_id
  end
end
