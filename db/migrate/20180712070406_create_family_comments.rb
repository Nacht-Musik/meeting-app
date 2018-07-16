class CreateFamilyComments < ActiveRecord::Migration[5.1]
  def change
    create_table :family_comments do |t|
      # t.string :name
      t.references :comment, foreign_key: true
      t.references :child, foreign_key: { to_table: :comments}

      t.timestamps

      t.index [:comment_id, :child_id], unique: true
    end
  end
end
