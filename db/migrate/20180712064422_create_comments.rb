class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.references :topic, foreign_key: true
      t.string :name
      t.integer :sort_num

      t.timestamps
    end
  end
end
