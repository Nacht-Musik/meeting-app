class AddStatusToTopic < ActiveRecord::Migration[5.1]
  def change
    add_reference :topics, :status, foreign_key: { to_table: :topic_statuses}, after: :meeting_id
  end
end
