class AddParentToComment < ActiveRecord::Migration[5.1]
  def change
    add_reference :comments, :parent, foreign_key: { to_table: :comments }, index: true
  end
end
