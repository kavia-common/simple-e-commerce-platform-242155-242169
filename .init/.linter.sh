#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-e-commerce-platform-242155-242169/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

