fx_version 'cerulean'
game 'gta5'

author 'MaskitoDesign'
description 'Loading Screen for FiveM'
version '1.0.0'
lua54 'yes'

loadscreen 'html/index.html'

shared_script 'config.lua'

loadscreen_manual_shutdown "yes"

client_script 'client/client.lua'

files {
    'html/*.html',
    'html/*.css',
    'html/*.js',
    'html/img/*.png',
    'html/music/song.mp3'
}

