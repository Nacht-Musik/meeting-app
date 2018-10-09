# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  prepend_before_action :require_no_authentication, only: [:cancel]
  # prepend_before_action :authenticate_scope!, only: [:new, :create, :edit, :update, :destroy]

  # GET /resource/sign_up
  def new
    if user_signed_in? && !current_user.admin?
      #  一般ユーザーがアクセスしたら、ルートページに転送 #不正アクセス対策
      redirect_to root_path
    else
      # System Adminが一人以上登録されているか判定
      @no_admin = User.where('admin = ?', true).empty?
      super
    end
  end

  # POST /resource
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        if user_signed_in?
          # System Admin用の処理
          set_flash_message! :notice, :signed_up
          sign_up(resource_name, current_user)

          flash = {success: "新しいアカウント【#{resource.name}】を作成しました。"}
          redirect_to my_page_path, flash: flash
        else
          # Guest User用の処理
          set_flash_message! :notice, :signed_up
          sign_up(resource_name, resource)
          # Welcome Messageをメールで送付する（予定）
          respond_with resource, location: after_sign_up_path_for(resource)
        end
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name,
                                                       :email,
                                                       :last_name,
                                                       :first_name,
                                                       :admin])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:name,
                                                              :email,
                                                              :last_name,
                                                              :first_name,
                                                              :admin])
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
