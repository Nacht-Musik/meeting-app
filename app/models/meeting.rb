class Meeting < ApplicationRecord
  belongs_to :user
  belongs_to :inspector, class_name: 'User', optional: true
  belongs_to :approver, class_name: 'User', optional: true
  belongs_to :project, optional: true
  belongs_to :status, class_name: 'MeetingStatus', optional: true

  has_many :topics, class_name: 'Topic'
  accepts_nested_attributes_for :topics, allow_destroy: true, reject_if: :all_blank
end
