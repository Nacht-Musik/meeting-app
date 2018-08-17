class AddDefaultSortnumToTopic < ActiveRecord::Migration[5.1]
  def change
    change_column :topics, :sort_num, :integer, :default => 1
  end
end
