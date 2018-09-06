class SystemMailer < ApplicationMailer
  default from: 'meeting.asist.app@gmail.com'

  def welcome_email
    @user = params[:user]
    mail(to: @user.email, subject: 'ウェルカムメール')
  end
end
