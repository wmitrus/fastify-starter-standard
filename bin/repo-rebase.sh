#!/bin/bash
usage="$(basename "$0") [-h][-b DEFAULT_BRANCH] [-r REPO_URL] [-m REBASE_COMMIT_MESSAGE] [-c COMMIT_ID]
where:
    -h  show this help text
    -b  default branch name (main, master, etc...)
    -r  url of your new repository
    -m  your first commit message (latest on the git tree)
    -c  commit ID from which to start making rebase"

DEFAULT_BRANCH="main"
REBASE_COMMIT_MESSAGE="Project starting point"
LAST_COMMIT_ID=$(git rev-parse --verify HEAD)
FIRST_COMMIT_ID=$(git rev-list --max-parents=0 HEAD)
COMMIT_ID=$FIRST_COMMIT_ID

while getopts hb:r: flag
do
    case "${flag}" in
        h) echo "$usage"; exit;;
        b) DEFAULT_BRANCH=${OPTARG};;
        r) REPO=${OPTARG};;
        m) REBASE_COMMIT_MESSAGE=${OPTARG};;
        c) COMMIT_ID==${OPTARG};;
    esac
done

# mandatory arguments
if [ ! "$REPO" ]; then
  echo "arguments -r must be provided"
  echo "$usage" >&2; exit 1
fi

printf "\n### Step 1: Remove current remote repo (origin)\n"
git remote remove origin
printf "\n### Step 2: Rebase history\n"
git checkout --orphan temp $COMMIT_ID &&
git commit -m "$REBASE_COMMIT_MESSAGE"
git rebase --onto temp $COMMIT_ID main
git branch -D temp &&
printf "\n### Step 3: Changing default branch name\n"
git branch -m $DEFAULT_BRANCH
printf "\n### Step 4: Add new repository URL: $REPO\n"
git remote add origin $REPO &&
printf "\n### Step 5: Pushing to new remote repo...\n"
git push --set-upstream origin $DEFAULT_BRANCH
