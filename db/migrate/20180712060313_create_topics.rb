class CreateTopics < ActiveRecord::Migration[5.1]
  def change
    create_table :topics do |t|
      t.references :meeting, foreign_key: true
      t.string :name
      t.integer :sort_num

      t.timestamps
    end
  end
end
