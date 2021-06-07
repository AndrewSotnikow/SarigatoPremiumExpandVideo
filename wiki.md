# Software

* [7zip](http://www.7-zip.org/)
* [atom](https://atom.io/)
* [baiduantyvirus](http://antivirus.baidu.com/en/)
* [chrome](https://www.google.pl/chrome/browser/desktop/index.html)
* [conemu](https://conemu.github.io/)
* [cyberduck](https://cyberduck.io/)
* [filezilla](https://filezilla-project.org/)
* [git](https://git-scm.com/)
* [gimp](https://www.gimp.org/)
* [inkscape](https://inkscape.org/en/)
* [irfanView](http://www.irfanview.com/)
* [nodejs](https://nodejs.org/en/)
* [notepad++](https://notepad-plus-plus.org/)
* [openoffice](https://www.openoffice.org/pl/)
* [perfectpixel](http://www.welldonecode.com/perfectpixel/)
* [ruby](https://rubyinstaller.org/)
* [skype](https://www.skype.com/pl/)
* [vlc](https://www.videolan.org/vlc/download-windows.html)
* [xampp](https://www.apachefriends.org/pl/index.html)

# Structure

* ./index.html - Publisher HTML index file
* ./loader.min.js - Function that communicates iFrame with publisher page
* ./campaigns - Directory containing campaigns

# How it works

* Server request for index.html from ./
* index.html request for loader.min.js from ./
* loader.min.js gets data from Smart Ad Server and binds it to the iFrame window object
* iFrame waits for Smart Ad Server data and when arrived invokes appropriate function

# How to create new campaign

* Clone template to ./campaigns

```console
$ git clone -b <%branch-name%> https://gitlab.com/sarigato_it/sataku-creation-template.git
```

* Find campaign identifier in http://admin.sataku.com/campaign/index
* Rename cloned project to campaign id
* Go to project directory and compile it by typing

```console
& npm install && gulp compile
```

* Get media from QNAP http://192.168.10.11:5050 | http://185.70.183.92:5050/
* In config.js set CREATION_TYPE to appropriate product
* Do the work on http://localhost?campaign=<%campaignId%>

# Documentation

* To generate documentation go to the project directory and type

```console
$ cd dist/scripts
$ jsdoc -d ../../docs doc.js
```

# Extras

* [Add variable to system PATH](https://www.computerhope.com/issues/ch000549.htm)
* [Hot to create virtual host for xampp](https://delanomaloney.com/2013/07/10/how-to-set-up-virtual-hosts-using-xampp/)
