class SystemAdminController < ApplicationController
  # before_action :set_user, only: [:edit_user, :update]
  before_action :set_user, only: [:edit_user, :update_user]

  def groups
    set_groups
  end

  def projects
    set_projects
  end

  def users
    set_users
  end

  def meetings
    set_meetings
  end

  def edit_user
    redirect_to root_path if !current_user.admin?
  end

  # def update
  def update_user
    redirect_to root_path if !current_user.admin?
    params = user_params

    if @user.update(params)
      flash = {success: "【#{@user.name}】のユーザー情報を更新しました。"}
      redirect_to system_admin_users_path, flash: flash
    else

    end

  end

  private
    def are_you_admin?
      return current_user.admin?
    end

    def set_groups
      @groups = Group.with_deleted
    end

    def set_projects
      @projects = Project.with_deleted
    end

    def set_users
      @users = User.all
    end

    def set_meetings
      @meetings = Meeting.all
    end

    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:id,
                                   :name,
                                   :last_name,
                                   :first_name,
                                   :admin
      )
    end

end
