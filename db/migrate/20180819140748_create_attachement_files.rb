class CreateAttachementFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :attachement_files do |t|
      t.string :name
      t.references :meeting, foreign_key: true

      t.timestamps
    end
  end
end
