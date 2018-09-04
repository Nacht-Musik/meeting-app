class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :name
      t.string :nick_name
      t.references :parent, foreign_key: { to_table: :groups }

      t.timestamps
    end
  end
end
