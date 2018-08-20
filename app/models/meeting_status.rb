class MeetingStatus < ApplicationRecord
  has_many :meetings, class_name: "Meeting", foreign_key: "status_id"
end
