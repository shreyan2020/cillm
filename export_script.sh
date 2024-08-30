#!/bin/bash

# Prompt for Docker container ID
read -p "Enter Docker container ID: " CONTAINER_ID

# Prompt for the folder name (e.g., data_2408)
read -p "Enter the folder name (e.g., data_2408): " FOLDER_NAME

# Define the folder paths
FOLDER_PATH="./analysis/data/$FOLDER_NAME/"

# Create the folder if it doesn't exist
mkdir -p $FOLDER_PATH

# Define the commands to run inside the Docker container
COMMANDS=$(cat <<'EOF'
mongoexport --db documents_db --collection activity_log --out /data/activity_log.json
mongoexport --db documents_db --collection document --out /data/document.json
mongoexport --db documents_db --collection participant_info --out /data/participant_info.json
mongoexport --db documents_db --collection recipe --out /data/recipe.json
mongoexport --db documents_db --collection survey_response --out /data/survey_response.json
EOF
)

# Run the commands inside the Docker container
sudo docker exec -it $CONTAINER_ID sh -c "$COMMANDS"

# Run docker cp commands to copy the files to the host system
sudo docker cp $CONTAINER_ID:/data/activity_log.json $FOLDER_PATH
sudo docker cp $CONTAINER_ID:/data/document.json $FOLDER_PATH
sudo docker cp $CONTAINER_ID:/data/participant_info.json $FOLDER_PATH
sudo docker cp $CONTAINER_ID:/data/recipe.json $FOLDER_PATH
sudo docker cp $CONTAINER_ID:/data/survey_response.json $FOLDER_PATH

echo "All files have been exported and copied to $FOLDER_PATH"
