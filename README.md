PolymerNPM-notscoped
===================

Polymer lib and Polymer elements are published by @polymer scope in NPM, so if you are working with a NPM version lower
than 2.7.0 in your corporative environment and you can't change it, scoped packages are not supported and you can not
work with Polymer elements.

This projects gets Polymer lib, polyfill and Polymer Iron and Paper elements from NPM version 3.x and transforms them
modifying package.json to remove @polymer references.
Generates a serie of packages without @polymer in their names and dependencies ready to publish in a NPM version &lt; 2.7.x
repository

Requirements
-------------
You need to have installed a NPM version equal or greater than 3.0.x because it's necessary download Polymer packages from NPM.

You can update your NPM version executing this command:

> npm install npm -g

Generating new Polymer packages
-------------
You just have to execute

> npm install

from the root directory.

There is defined a postinstall script that launches:

> gulp transform-polymer-libs

Publishing new Polymer packages
-------------
If you want to publish all the new packages generated, you can execute

> gulp publish-polymer-libs

This command will try to publish each package in /polymerNPM/new_packages to your NPM repository.





