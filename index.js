const fs = require('fs')
const {exec} = require('child_process')

let app_data = new Vue ({
  el: 'div.content',
  data: {
    folders: []
  }
})

function read_config(cb) {
  fs.readFile('./config.json', (err, data) => {
    if (err)
      return cb(err);
    app_data.folders = JSON.parse(data);
    return cb()
  })
}

function refresh_mount_state()
{
  for (let folder of app_data.folders) {
    let cmd = 'mountpoint ' + folder['dest'];
    exec(cmd, (err) => {
      if (err)
        folder['state'] = 'unmounted';
      else
        folder['state'] = 'mounted'
    })
  }
}

function h_mount_folder(folder)
{
}

$(document).ready(() => {
  new Promise((resolve, reject) => {
    read_config((err) => {
      if (err)
        return reject(err);
      return resolve()
    })
  })
  .then(resolve => {
    refresh_mount_state()
  })
  .catch(e => {
    console.log("Initialization err: " + e)
  })
})
