#!/usr/bin/env bash
set -euo pipefail

printf '\033[3J\033[H\033[2J'
clear
chmod 400 tools/lien-quan.pem
ssh -i tools/lien-quan.pem ubuntu@ec2-3-25-139-83.ap-southeast-2.compute.amazonaws.com
cd lien-quan
npm run build
sudo kill $(sudo lsof -t -i:3010)
nohup npm run start -- --port 3010 >/tmp/lien-quan.log 2>&1 &


cd ~/lien-quan
git pull
npm install
npm run build
pm2 restart lien-quan