class CreateGroupMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :group_members do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      t.boolean :admin, default: false, null: false

      t.timestamps
    end
  end
end
