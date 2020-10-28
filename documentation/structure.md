# Shlack Components

* Splash Component
  * SplashNavbar Component
    * img (logo)
    * h1 (name)
    * button (Launch Shlack)
    * LaunchDropdown Component
      * Button(Login)
      * Button(SignUp)
  * SplashBody Component
    * img (static)
    * img (active)
    * SplashContent Component
      * h1
      * text
* LaunchContainer Component
  * LaunchNavbar Component
    * button/img (icon)
    * button (Create Account - hidden for create screen)
  * LaunchBody Component
    * h1
    * SignInForm Component
      * text input (email)
      * text input (password)
      * button (Sign In)
    * SignUpForm Component
      * text input (email)
      * text input (password)
      * text input (confirm password)
      * button (Sign Up)
* Main Component
  * MainNavBar Component
    * NavSearchBar Component
    * NavAvatar Component
      * ProfileDropdown Component
        * Avatar
        * h1 (User full name)
        * button (Edit Profile)
        * button (Sign Out)
      * EditProfileForm Component
        * h1
        * Avatar
        * input (fullName)
        * input (bio)
        * button (Cancel)
        * button (Save)
  * MainLeftPanel Component
    * h1 (Shlack)
    * ChannelList Component
      * h1 (Channels)
      * button/icon (create channel)
      * button/link (channel title)
    * DirectGroupList Component
      * h1 (Direct Messages)
      * button/icon (create DM)
      * button/link (member list)
  * MainBanner Component
    * avatars/button (list of members)
    * h1 (number of members)
    * MemberList Component
      * h1 (channel title)
      * h1/button (Add people)
      * text box (search member)
      * dropdown box
        * MemberListItem Component
        * MemberCard Component
          * Avatar
          * h1 (fullName)
          * bio
          * button (message)
    * MemberAdd Component
      * h1 (Add people)
      * text box (search member)
      * drobdown box
        * MemberListItem Component
          * Avatar
          * h1 (user fullName)
      * button (add)
    * button/icon (add member)
    * button/icon (details)
    * ChannelDetails Component
      * h1 (Details)
      * h1 (title)
      * button/icon (cancel)
      *
