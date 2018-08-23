class MeetingsController < ApplicationController
  include MeetingsHelper
  before_action :set_meeting, only: [:show, :edit, :update, :destroy]
  before_action :set_users, only: [:new, :edit]
  before_action :set_projects, only: [:new, :edit]

  def show
    # ソート番号順に並んだTopicsを取得
    @topics = sort_topics(@meeting.topics)
    # 始祖コメントを全て取得
    @founder_comments = set_founder_comments(@topics)
  end

  def new
    @meeting = Meeting.new
    @meeting.topics.build
    # @meeting.topics.first.comments.build
  end

  def create
    params = meeting_params
    meeting = Meeting.new(params)

    # 各コメントに親コメントを設定
    set_parent_comments(meeting)

    if meeting.save
      # Meeting Save成功時の処理
      flash = {success: '会議録を保存しました。'}
      redirect_to my_meeting_path, flash: flash
    else
      # Meeting Save失敗時の処理
    end
  end

  def edit
    # p '#--- editアクション実行 ---#'
  end

  def update
    # p 'updateアクション実行'
    params = meeting_params

    # 各コメントに親コメントを設定
    set_parent_comments(@meeting)

    if @meeting.update(params)
      # Meeting Update成功時の処理
      flash = {success: '会議録を保存しました。'}
      redirect_to my_meeting_path, flash: flash
    else
      # Meeting Update失敗時の処理
    end
  end

  def destroy
    @meeting.destroy
    redirect_to my_meeting_path, notice: '会議録を削除しました'
  end

  private
    def set_meeting
      @meeting = Meeting.find(params[:id])
    end

    def set_users
      @users = User.all
    end

    def set_projects
      @projects = Project.all
    end

    # Strong parameters
    def meeting_params
      params.require(:meeting).permit(:id,
                                      :title,
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
                                        :id,
                                        :meeting_id,
                                        :name,
                                        :sort_num,
                                        :_destroy,
                                        comments_attributes: [
                                          :id,
                                          :name,
                                          :sort_num,
                                          :indent,
                                          :_destroy
                                        ]
                                      ]
                                    )
    end
end
