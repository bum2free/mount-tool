const fs = require('fs')
const {exec} = require('child_process')
const req = require('electron').remote.require;
const { execSync } = req('child_process');

let app_data = new Vue ({
  el: 'div.content',
  data: {
    folders: [],
    password: ''
  }
})

function read_config(cb) {
  fs.readFile('./config.json', (err, data) => {
    if (err)
      return cb(err);
    let config_data = JSON.parse(data)
    app_data.folders = config_data['folders'];
    app_data.password = config_data['password'];
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
  let cmd = 'sudo -S mount';
  if (folder['options'] != null) {
    for (opt of folder['options']) {
      cmd += " -o " + opt
    }
  }

  cmd += ' ' + folder['src'] + ' ' + folder['dest'];
  console.log(cmd);
  try {
    execSync(cmd, {input: app_data.password});
    folder.state = 'mounted'
  } catch (e) {
    console.log('mount exception: ' +e)
  }
}

function h_umount_folder(folder)
{
  console.log("umount " + folder['dest']);
  let cmd = 'sudo -S umount -l -f ' + folder['dest']
  try {
    execSync(cmd, {input: app_data.password});
    folder.state = 'unmounted'
  } catch (e) {
    console.log('umount exception: ' +e)
  }
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
