class AddScopeToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_reference :meetings, :scope, foreign_key: { to_table: :meeting_scopes }, index: true, after: :type_id
  end
end
