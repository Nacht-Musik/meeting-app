class Group < ApplicationRecord
  has_many :children, :class_name => "Group", foreign_key: "parent_id", dependent: :destroy
  belongs_to :parent, :class_name => "Group", foreign_key: "parent_id", optional: true
end
