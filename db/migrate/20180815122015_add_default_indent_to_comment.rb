class AddDefaultIndentToComment < ActiveRecord::Migration[5.1]
  def change
    change_column :comments, :indent, :integer, :default => 1
  end
end
