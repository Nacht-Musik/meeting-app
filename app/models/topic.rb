class Topic < ApplicationRecord
  default_scope -> { order(:sort_num)}
  belongs_to :meeting
  belongs_to :status, class_name: "TopicStatus", optional: true

  has_many :comments, class_name: "Comment", dependent: :destroy
  accepts_nested_attributes_for :comments, allow_destroy: true, reject_if: :all_blank
end
