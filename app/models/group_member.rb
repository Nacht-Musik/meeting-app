class GroupMember < ApplicationRecord
  belongs_to :group
  belongs_to :user
  belongs_to :authority

end
