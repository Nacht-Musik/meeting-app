class ProjectsController < ApplicationController
  include ProjectsHelper

  before_action :set_users, only: [:show, :new, :edit, :create, :update]
  before_action :set_project, only: [:show, :edit, :destroy, :update]
  before_action :set_authorities, only: [:show, :new, :edit, :create, :update]
  before_action :set_founder_project, only: [:show, :edit, :update]

  def show

  end

  def new
    @project = Project.new

    # Project作成者を管理者権限付きで自動登録
    admin_user = @project.project_members.build
    admin_user.user_id = current_user.id
    admin_user.admin = 1
    admin_user.authority_id = 1
  end

  def create
    params = project_params
    @project = Project.new(params)

    if @project.save
      flash = {success: "#{@project.name} プロジェクトを作成しました"}
      redirect_to my_page_path, flash: flash
    else
      render 'new'
    end

  end

  def edit

  end

  def update
    params = project_params

    children = params[:children_attributes].clone
    update_children_project(children) if children.present?

    params.delete(:children_attributes)

    if @project.update(params)
      flash = {success: 'プロジェクト情報を更新しました。'}
      redirect_to my_page_path, flash: flash
    else
      render 'edit'
    end
  end

  def destroy
    # 子プロジェクトがある場合、関係を解除する
    # if @project.children.present?
    #   @project.children.each do |child|
    #     child.parent = nil
    #     child.save
    #   end
    # end
    notice_msg = "【#{@project.name}】プロジェクトを終了しました"

    @project.destroy
    redirect_to my_page_path, notice: notice_msg
  end

  private
  def set_project
    @project = Project.find(params[:id])
  end

  def set_users
    @users = User.all
  end

  def set_authorities
    @authorities = Authority.all
  end

  def set_founder_project
    @founder_project = find_founder_project(params[:id])
  end

  def project_params
    params.require(:project).permit(:id,
                                  :name,
                                  :parent_id,
                                  :remarks,
                                  project_members_attributes: [
                                      :id,
                                      :project_id,
                                      :user_id,
                                      :authority_id,
                                      :admin,
                                      :_destroy
                                  ],
                                  children_attributes: [
                                      :id,
                                      :parent_id
                                  ]
    )
  end
end
