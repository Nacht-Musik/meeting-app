class AddStatusToComment < ActiveRecord::Migration[5.1]
  def change
    add_reference :comments, :status, foreign_key: { to_table: :comment_statuses}, after: :parent_id
  end
end
