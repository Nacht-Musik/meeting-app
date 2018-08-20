class CreateReceiverTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :receiver_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
