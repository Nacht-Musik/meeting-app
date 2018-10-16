class AddGroupToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_reference :meetings, :group, foreign_key: true, index: true, after: :status_id
  end
end
