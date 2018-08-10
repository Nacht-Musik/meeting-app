class AddIndentToComment < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :indent, :integer, after: :sort_num, null: false
  end
end
