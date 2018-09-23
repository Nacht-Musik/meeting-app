class CreateProjectMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :project_members do |t|
      t.references :project, foreign_key: true
      t.references :user, foreign_key: true
      t.references :authority, foreign_key: true
      t.boolean :admin, default: false, null: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
