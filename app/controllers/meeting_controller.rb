class MeetingController < ApplicationController
  before_action :set_meeting, only: [:show]

  def show
    # ソート番号順に並んだTopicsを取得
    @topics = sort_topics(@meeting)
    # トップのコメントを全て取得
    # @fountder_comments = ""
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    def sort_topics (meeting)
      meeting.topics.sort do |a, b|
        a.sort_num <=> b.sort_num
      end
    end

    # Strong parameters
    # def meeting_params
    #   params.require(:meeting).permit(:title, :user_id, :date)
    # end
end
