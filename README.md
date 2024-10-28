# YouTube Video Analysis API

An advanced NestJS API for handling and analyzing YouTube video data. This API allows users to:

1. **Retrieve Video Information** - Get metadata for any YouTube video.
2. **Buffer Audio & Video** - buffer video and audio of youtube video content.
3. **Generate Summaries and Mind Maps** - Use OpenAI API to create concise summaries and mind maps in md format of the video content.
4. **Transcribe Audio** - Leverage Assembly AI for transcriptions to convert video speech to text.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

To get started, follow these steps:

**Clone the Repository**:

```bash
git clone repo;
cd yt-video-analysis-api
```

##

### **_docker_**

**Build the Docker Image**:

```bash
docker build -t container-name .
```

### **_locally_**

important: if you want to execute the code locally you have to install python3 on your machine

**Install Dependencies**:

```bash
npm install (recomended node version 20.16.0)
```

## Environment

**ASSEMBLY_AI_API_KEY** = your Assembly ai api key.

**OPEN_AI_API_KEY** = your Open ai api key.

**OPEN_AI_PROJECT_KEY** = your Open ai project key.

**OPEN_AI_ORGANIZATION_KEY** = your Open ai api key.

## Usage

### **_docker_**

**Run the Docker Image**:

```bash
docker run -p 3000:3000 -e ASSEMBLY_AI_API_KEY='' -e
OPEN_AI_API_KEY='' -e OPEN_AI_PROJECT_KEY='' -e OPEN_AI_ORGANIZATION_KEY='' container-name
```

##

### **_locally_**

important: create and integrate .env file with your api keys using dotenv

```bash
npm run start:dev
```

## Technologies

- Node.js
- NestJS
- OpenAI
- AssemblyAI

## License

This project is licensed under the MIT License.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, subject to the following conditions:

- A copy of the license is included in this repository. See the [LICENSE](LICENSE) file for details.
- This software is provided "as-is," without any warranties or guarantees.

---

By contributing to this project, you agree that your contributions will also be licensed under the MIT License.
