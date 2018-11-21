class MyController < ApplicationController
  include ApplicationHelper
  before_action :set_meetings, only: [:meetings]
  before_action :set_published_meetings, only: [:published_meetings]

  def page
    if user_signed_in?
      set_finished_projects
      set_join_meetings
    else
      redirect_to root_path
    end
  end

  def meetings
    set_meetings
    set_planning_meetings
    set_editing_meetings
    set_inspecting_meetings
    set_approved_meetings
    set_approving_meetings
  end

  def published_meetings
    # @meeting = Meeting.new
  end

  def editing_meeting
    if user_signed_in?
      @meeting = Meeting.new
    end
  end

  def mail
    SystemMailer.with(user: current_user).welcome_email.deliver_now
  end

  private
    # 担当会議を全て取得
    def set_meetings
      @meetings = Meeting.all.where(user_id: current_user.id)
    end

    # 開催予定の担当会議を全て取得
    def set_planning_meetings
      @planning_meetings = Meeting.where(status_id: Settings.meeting.status.planning)
                                  .where(user_id: current_user.id)
    end

    # 編集中の担当会議を全て取得
    def set_editing_meetings
      @editing_meetings = Meeting.where(status_id: Settings.meeting.status.editing)
                                 .where(user_id: current_user.id)
    end

    # 審査中の担当会議を全て取得
    def set_inspecting_meetings
      @inspecting_meetings = Meeting.where(status_id: Settings.meeting.status.inspecting)
                                    .where("(user_id = ?) OR (inspector_id = ?)", current_user.id, current_user.id)
    end

    # 承認中の担当会議を全て取得
    def set_approving_meetings
      @approving_meetings = Meeting.where(status_id: Settings.meeting.status.approving)
                                   .where("(user_id = ?) OR (approver_id = ?)", current_user.id, current_user.id)
    end

    # 承認済み(公開前)の担当会議を全て取得
    def set_approved_meetings
      @approved_meetings = Meeting.where(status_id: Settings.meeting.status.approved)
                                  .where(user_id: current_user.id)
    end

    # 航海済みの会議を全て取得
    def set_published_meetings
      @published_meetings = Meeting.where(status_id: Settings.meeting.status.published)
    end

    # 参加予定の会議を全て取得
    def set_join_meetings
      planning_meeting_ids = Meeting.where(status_id: Settings.meeting.status.planning).where('date >= ?', Date.today).select(:id)
      join_meeting_ids = Attendee.where(meeting_id: planning_meeting_ids).where(user_id: current_user.id).select(:meeting_id)
      @join_meetings = Meeting.where(id: join_meeting_ids)
      p "---- debug ----"
      p @join_meetings
      p "---- debug ----"
    end

    def set_users
      @users = User.all
    end

    def set_projects
      @projects = Project.all
    end

    def set_finished_projects
      @finished_projects = current_user.projects.only_deleted
    end

end
