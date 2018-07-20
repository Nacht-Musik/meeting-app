class MeetingsController < ApplicationController
  before_action :set_meeting, only: [:show]

  def show
    # ソート番号順に並んだTopicsを取得
    @topics = sort_topics(@meeting.topics)
    # 始祖コメントを全て取得
    @founder_comments = set_founder_comments(@topics)
  end


  def new
    @meeting = Meeting.new
  end

  def create
    @meeting.save
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    def sort_topics (topics)
      topics.sort do |a, b|
        a.sort_num <=> b.sort_num
      end
    end

    # 始祖コメントを集める
    def set_founder_comments (topics)
      founder_comments = Array.new()

      topics.each do |topic|
        if topic.comments.present?
          topic.comments.each do |comment|
            founder_comments.push(comment) if comment.parent.blank?
          end
        end
      end
      return founder_comments
    end

    # Strong parameters
    # def meeting_params
    #   params.require(:meeting).permit(:title, :user_id, :date)
    # end
end
