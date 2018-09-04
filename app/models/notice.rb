class Notice < ApplicationRecord
  belongs_to :user
  belongs_to :notifier, class_name: 'User'
  belongs_to :category, class_name: 'NoticeCategory'
end
