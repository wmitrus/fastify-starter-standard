#!/bin/bash
usage="$(basename "$0") [-b DEFAULT_BRANCH] [-r REPO_URL]
where:
    -h  show this help text
    -b  default branch name (main, master, etc...)
    -r  url of your new repository"

DEFAULT_BRANCH="main"

while getopts hb:r: flag
do
    case "${flag}" in
        h) echo "$usage"; exit;;
        b) DEFAULT_BRANCH=${OPTARG};;
        r) REPO=${OPTARG};;
    esac
done

# mandatory arguments
if [ ! "$REPO" ]; then
  echo "arguments -r must be provided"
  echo "$usage" >&2; exit 1
fi

printf "\n### Step 1: Removing old repository...\n"
rm -rf .git &&
printf "\n### Step 2: Initialization of new repository with default branch name $DEFAULT_BRANCH...\n"
git init -b $DEFAULT_BRANCH &&
printf "\n### Step 3: Add all files to first commit...\n"
git add . &&
printf "\n### Step 4: Making commit...\n"
git commit -m "Initial commit" &&
printf "\n### Step 5: Add new repository URL: $REPO\n"
git remote add origin $REPO &&
printf "\n### Step 6: Pushing to new remote repo...\n"
git push --set-upstream origin $DEFAULT_BRANCH
