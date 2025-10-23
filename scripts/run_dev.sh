#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  Starting Dashboard Development Servers  ${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo -e "${BLUE}Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend server
echo -e "${GREEN}[1/2] Starting Backend (Tornado)...${NC}"
cd /workspaces/dashboard/apps/api
python server.py &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
echo -e "      → http://localhost:8888"
echo ""

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo -e "${GREEN}[2/2] Starting Frontend (Vite)...${NC}"
cd /workspaces/dashboard/apps/web
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend started (PID: $FRONTEND_PID)${NC}"
echo -e "      → http://localhost:5173"
echo ""

echo -e "${BLUE}===========================================${NC}"
echo -e "${GREEN}✓ Both servers are running!${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""
echo -e "Press ${GREEN}Ctrl+C${NC} to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
