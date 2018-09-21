class Authority < ApplicationRecord
  has_many :users,  class_name: "User"
  has_many :group_members,  class_name: "GroupMember"
end
