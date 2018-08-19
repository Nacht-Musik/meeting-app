class MeetingStatus < ApplicationRecord
  has_many :meetings, class_name: "Meeting"
end
