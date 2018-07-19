module MeetingHelper
  def sort_comments(comments)
    comments.sort do |a, b|
      a.sort_num <=> b.sort_num
    end
  end
end
