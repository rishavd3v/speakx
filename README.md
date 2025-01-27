# QuestSearch

QuestSearch is a project that provides a question search service using gRPC and MongoDB.

## Prerequisites

- Node.js
- MongoDB
- npm

## Installation

1. Clone the repository:

```sh
git clone https://github.com/rishavd3v/speakx.git
cd speakx
```

## Running the Server

1. Install dependencies:

```sh
cd ./backend
npm install
```

2. Load Data into MongoDB:

```sh
node scripts/loadData.js
```

3. Start Server
```sh
node index.js
```

## Running the Frontend

1. Open new terminal in root dir ```/speakx```

2. Install dependencies:

```sh
cd ./frontend
npm install
```

3. Start frontend
```sh
npm run dev
```

## Usage
- The Express server provides a REST API at http://localhost:3000/api/
- The gRPC server listens for requests defined in the question.proto file.
- Frontend is running at http://localhost:5173
