<h1 align="center">
  <br>
  <a href="https://github.com/shiv213/ImposterBot"><img src="https://i.imgur.com/TLMyjPM.png" alt="ImposterBot" width="100"></a>
  <br>
  ImposterBot (BETA) - NOT WORKING ON THE LATEST VERSION
  <br>
</h1>
<h4 align="center">
An open-source Discord bot to enhance your <a href="http://www.innersloth.com/gameAmongUs.php">Among Us</a> experience
</h4>
<h5 align="center">This program is in <u>beta</u>. I am working actively to resolve any and all issues! If you find any issues, please open an <a href="https://github.com/shiv213/ImposterBot/issues/new">issue</a> on this GitHub page!</h5>

<p align="center">
  <a href="https://saythanks.io/to/shiv.v.trivedi%40gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://paypal.me/shivvtrivedi">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#support">Support</a> •
  <a href="#license">License</a>
</p>

## Key Features
#### Components
* Discord Bot (ImposterBot)
    - Streamlines managing game lobbies and inviting friends via Discord
    - Mutes all players during the game, unmutes them during voting 


* Game Listener Executable (ImposterBot Among Us Game Listener)
    - While you play Among Us, the Game Listener Executable will read Among Us game data and push it to the database   

## How To Use
One person in the game who is **in the voice channel** needs to do the following:
- Run the `.info` command on your Discord server to get your server ID and voice channel ID (this is unique per Discord server)
- Launch the Among Us game (this needs to be open before the next step)
- Run the `ImposterBot Among Us Game Listener.py` file (instructions on where to find this below)
- Input your server ID and voice channel ID and press `Start`
- Get into a game of Among Us, and run the `.start` command in your Discord server once the game starts
    - Note: for the time being, everyone will be muted in the lobbies as well as in the game (this will be changed shortly)
- Once you're done with your game, run the `.stop` command in your Discord server

## Download

To use this bot on your Discord server, you need invite using this link: 

[Invite Imposter Bot](https://discord.com/api/oauth2/authorize?client_id=755510808397742171&permissions=29878336&scope=bot)

You will also need to download the latest version of [ImposterBot Among Us Game Listener](https://github.com/shiv213/ImposterBot/releases/latest) (Download the file under assets called "ImposterBot.Among.Us.Game.Listener_X.X.X.zip")

##### In order to run the `ImposterBot Among Us Game Listener.py`:
- Unzip the downloaded file and place the contents in a dedicated folder
- Open the command prompt inside the folder
- **Make sure you have Python 3 installed!**
- Run `python setup.py install`
- **Make sure you launch Among Us before running the command:**
- `python "ImposterBot Among Us Game Listener.py"` in the command prompt

## Emailware

ImposterBot is an [emailware](https://en.wiktionary.org/wiki/emailware). Meaning, if you liked using this app or it has helped you in any way, I'd like you send me an email at <shiv.v.trivedi@gmail.com> about anything you'd want to say about this software. I'd really appreciate it!

## Credits
##### Top contributors:
- [shiv213](https://shivvtrivedi.com/)
- [Krish Mody](https://github.com/Krish-Mody)
- [Abinav](https://github.com/abinav62)
- [lux](https://github.com/ynx0)
- [saisiddu321](https://github.com/saisiddu321)

This software uses the following open source packages:
- [Node.js](https://nodejs.org/)
- [discord.js](https://discord.js.org/)
- [Firebase](https://firebase.google.com/)
- [ReadWriteMemory](https://github.com/vsantiago113/ReadWriteMemory)
- [pymem](https://github.com/srounet/Pymem)
- [pyrebase](https://github.com/thisbejim/Pyrebase)
- [Gooey](https://github.com/chriskiehl/Gooey)
- [PyInstaller](https://www.pyinstaller.org/)


## Support
<a href="https://www.buymeacoffee.com/shivvtrivedi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<p>Or</p> 

<a href="https://www.patreon.com/shivvtrivedi">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## License

MIT

---
