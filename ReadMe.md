# A "useless" mount tool

## Description:
A "usekess" mount tool to quickly mount/umount folders according to configuration
files

## Usage - Generate AppImage
npm install
npm run dist

## Usage - Run
A config.json must be presented in the same folder of the generated AppImage,
  in the following format:
{
  "folders": [
    "src": "192.168.1.10:/Videos",
    "dest": "/media/eric-nas-ro/Videos",
    "options": ["ro"], //can be empty
  ],
  "password": "sudo password"
}
