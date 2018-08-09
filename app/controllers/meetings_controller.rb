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
    @meeting.topics.build
    @meeting.topics.first.comments.build
    @users = User.all
    @projects = Project.all
  end

  def create
    params = meeting_params
    @meeting = Meeting.new(params)
    if @meeting.save
      # Meeting Save成功時の処理
      redirect_to my_meeting_path
    else
      # Meeting Save失敗時の処理
      redirect_to new_meeting_path
    end
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
    def meeting_params
      params.require(:meeting).permit(:title,
                                      :date,
                                      :start_time,
                                      :finish_time,
                                      :place,
                                      :project_id,
                                      :user_id,
                                      :inspector_id,
                                      :approver_id,
                                      :note,
                                      topics_attributes: [
                                        :meeting_id,
                                        :name,
                                        :sort_num,
                                        :_destroy,
                                        comments_attributes: [
                                          :id,
                                          :name,
                                          :sort_num,
                                          :indent,
                                          :parent_id,
                                          :_destroy]
                                      ]
                                    )
    end
end
