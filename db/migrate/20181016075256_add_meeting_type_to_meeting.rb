class AddMeetingTypeToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_reference :meetings, :type, foreign_key: { to_table: :meeting_types }, index: true, after: :title
  end
end
