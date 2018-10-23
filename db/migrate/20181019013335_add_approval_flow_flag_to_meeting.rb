class AddApprovalFlowFlagToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_column :meetings, :approval_flow_flag, :boolean, after: :status_id
  end
end
