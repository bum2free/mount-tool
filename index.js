const {exec} = require('child_process')

let folders = [
{
  src: '192.168.1.10:/Videos',
  dest: '/media/eric-nas-ro/Videos',
  options: ['ro'],
  state: 'tbd'
},
{
  src: '192.168.1.10:/Child-Multimedia-2',
  dest: '/media/eric-nas-ro/Child-Multimedia',
  options: ['ro'],
  state: 'tbd'
},
{
  src: '192.168.1.10:/Music-Uncompress',
  dest: '/media/eric-nas-ro/Music-Uncompress',
  options: ['ro'],
  state: 'tbd'
},
{
  src: '192.168.1.10:/git-repositories',
  dest: '/media/eric-nas/git-repositories',
  state: 'tbd'
},
{
  src: '192.168.1.10:/Work',
  dest: '/media/eric-nas/Work',
  state: 'tbd'
},
]

let app_data = new Vue ({
  el: 'div.content',
  data: {
    folders: folders
  }
})

function refresh_mount_state()
{
  for (let folder of folders) {
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
  refresh_mount_state()
})
