# Basic Node Starter (Based on Standard.JS v17)
It's useful when starting a simple npm project which doesn't require any config, db, etc...

> Please note that version 17 of Standard.JS is still a pre-release version

## Advantages of using Standard.JS v17
- Version 17 of Standard.JS based on ESLint 8.
- Don't need to configure babel parser to use experimental JavaScript (ES Next) features 

This major release fully focuses on getting in sync with the wider ESLint ecosystem and doesn't in itself introduce any new rules or features.

This pre-release exists to test out the ESLint 8 related changes and discover possible backwards incompatible changes that comes with it and mitigate unintended such before a stable release.

When you upgrade, consider running standard --fix to automatically format your code to match the current set of rules.

[Click here](https://standardjs.com/changelog.html) to see all details

## How to use this template for new projects
The way that you can use it depends on whether you want to keep repo history.

[Starting with clean repository](#starting-with-clean-repository)

[Keep only part of the commit history](#keep-only-part-of-the-commit-history)

[Keep existing repo history, only change the GIT remote to the new one](#keep-existing-repository-but-change-the-git-remote-repository-to-the-new-one)

### Starting with clean repository

1. Clone this template

    ```plaintext
    git clone https://github.com/wmitrus/basic_node-starter-standard-17.git Your_New_Project_Name
    ```

2. Enter to newly created priject directory
    ```plaintext
    cd Your_New_Project_Name
    ```

3. Remove existing .git repository
    ```plaintext
    rm -rf .git
    ```

4. Initialize new clean repository
   > **Notice**: Be sure to create the correct name of default branch
For example: If you are going to use `GitHub` or `GitLab` then your defualt branch name should be `main`
    ```plaintext
    git init -b main
    ```

5. Make initial commit
   ```plaintext
   git add .
   git commit -m "Initial commit"
   ```

6. Add your new own repository
   ```plaintext
   git remote add origin YOUR_GIT_REPOSITORY_URL
   ```

7. Push this repository to your remote
   ```plaintext
   git push origin
   ```

### Keep only part of the commit history

1. Clone this template

    ```plaintext
    git clone https://github.com/wmitrus/basic_node-starter-standard-17.git Your_New_Project_Name
    ```

2. Enter to newly created project directory
    ```plaintext
    cd Your_New_Project_Name
    ```

3. Remove existing repository
   ```plaintext
   git remote remove origin
   ```

4. Rebase history from chosen commit
   ```plaintext
   git rev-parse --verify master >> .git/info/grafts
   git filter-branch -- --all
   ```
   or
   ```plaintext
   git checkout --orphan temp COMMIT_ID
   git commit -m "Truncated history"
   git rebase --onto temp COMMIT_ID main
   git branch -D temp
   ```

5. Add your new own repository
   ```plaintext
   git remote add origin YOUR_GIT_REPOSITORY_URL
   ```

6. Push this repository to your remote
   ```plaintext
   git push origin
   ```


### Keep existing repository but change the GIT remote repository to the new one

1. Clone this template

    ```plaintext
    git clone https://github.com/wmitrus/basic_node-starter-standard-17.git Your_New_Project_Name
    ```

2. Enter to newly created project directory
    ```plaintext
    cd Your_New_Project_Name
    ```

3. Remove existing repository
   ```plaintext
   git remote remove origin
   ```

4. Add your new own repository
   ```plaintext
   git remote add origin YOUR_GIT_REPOSITORY_URL
   ```

5. Push this repository to your remote
   ```plaintext
   git push origin
   ```
