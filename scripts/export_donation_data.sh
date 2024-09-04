#!/bin/bash

# Prompt for Docker container ID
read -p "Enter Docker container ID: " CONTAINER_ID

# Prompt for the folder name (e.g., data_2408)
read -p "Enter the folder name (e.g., data_2408): " FOLDER_NAME

# Define the folder paths
FOLDER_PATH="./analysis/data/donation_task/$FOLDER_NAME/"

# Create the folder if it doesn't exist
mkdir -p $FOLDER_PATH

# Define the commands to run inside the Docker container
COMMANDS=$(cat <<'EOF'
mongoexport --db documents_db --collection donation_survey --out /data/donation_survey.json
EOF
)

# Run the commands inside the Docker container
sudo docker exec -it $CONTAINER_ID sh -c "$COMMANDS"

# Run docker cp commands to copy the files to the host system
sudo docker cp $CONTAINER_ID:/data/donation_survey.json $FOLDER_PATH

echo "All files have been exported and copied to $FOLDER_PATH"
