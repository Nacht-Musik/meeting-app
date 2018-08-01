class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :inspector, class_name: 'User'
  belongs_to :approver, class_name: 'User'

  has_many :topics, class_name: 'Topic'
  #### nested_formfields対応
  # has_many :topics, class_name: 'Topic', dependent: :destroy

  accepts_nested_attributes_for :topics, allow_destroy: true, reject_if: :all_blank
end
