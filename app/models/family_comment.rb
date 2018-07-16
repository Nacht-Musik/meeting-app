class FamilyComment < ApplicationRecord
  belongs_to :comment
  belongs_to :child, class_name: 'Comment'

  validates :comment_id, presence: true
  validates :child_id, presence: true
end
