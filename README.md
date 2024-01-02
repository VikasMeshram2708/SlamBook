# SlamBook ~ BackEnd


### TODO : 

#### Model

* USER [This Collection will be responsible for Createing new Users.] 

    * [] Name 
        - Maximum 300 Characters
        - Minimum 2 Characters
        - Required

    * [] Username
        - Unique
        - Maximum 11 Characters
        - Required

    * [] Email
        - Required

    * [] Password 
        - Maximum 500 Characters
        - Minimum 10 Characters
        - Required

    * [] Avatar
        - Optional for users we'll provide by default based on the Gender.
        - Optional


* SLAMS [This Collectin will store our Slams Created by the users.]

    * [] Title
        - [] Maximum 250 Characters
        - [] Minimum 2 Characters
        - Required

    * [] Slug
        - [] Maximum 250 Characters
        - [] Minimum 2 Characters
        - Required

    * [] Content
        - [] Maximum 500 Characters
        - [] Minimum 2 Characters
        - Required

    * [] Author
        - This will be automatically handled
        - Required

    * [] AuthorId
        - This will be automatically handled
        - Required



