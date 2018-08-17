class ChangeDefaultSortNumToComment < ActiveRecord::Migration[5.1]
  def change
    change_column :comments, :sort_num, :integer, :default => 0
  end
end
