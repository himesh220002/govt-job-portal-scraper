#!/bin/bash
# Automatically generated script to run the govt-jobs-scraper

# Export display variables so notify-send works from a background cron job
export DISPLAY=:0
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus

# Send starting notification
notify-send -u normal -i terminal "Govt Jobs Scraper" "Cron Job Triggered! Starting automated scraping process in the background..."

# Navigate to the backend directory
cd /home/himesh/MYProjects/Nextjs/govt-jobs-scraper/backend

# Run the python scraper and append output to a log file
/usr/bin/python3 scraper.py >> /home/himesh/MYProjects/Nextjs/govt-jobs-scraper/backend/cron_scraper.log 2>&1

# Send completion notification
notify-send -u normal -i checkmark "Govt Jobs Scraper" "Scraping completed and database updated successfully!"
