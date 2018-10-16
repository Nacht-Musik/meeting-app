class Meeting < ApplicationRecord
  # paranoia(論理削除用Gem)の有効/無効 設定
  # acts_as_paranoid

  belongs_to :status, class_name: 'MeetingStatus', optional: true
  belongs_to :user
  belongs_to :inspector, class_name: 'User', optional: true
  belongs_to :approver, class_name: 'User', optional: true
  belongs_to :project, optional: true
  belongs_to :type, class_name: 'MeetingType', optional: true

  has_many :attendees, class_name: 'Attendee', dependent: :destroy
  accepts_nested_attributes_for :attendees, allow_destroy: true

  has_many :receiveres, class_name: 'Receiver', dependent: :destroy
  accepts_nested_attributes_for :receiveres, allow_destroy: true

  has_many :files, class_name: 'AttachementFile'

  has_many :topics, class_name: 'Topic', dependent: :destroy
  accepts_nested_attributes_for :topics, allow_destroy: true
  # accepts_nested_attributes_for :topics, allow_destroy: true, reject_if: :all_blank
end
