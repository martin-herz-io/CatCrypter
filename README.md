<p align="center">
  <p align="center">
    <img src="https://raw.githubusercontent.com/martin-herz-io/CatCrypter/master/public/logo/4x/icon-text-red.png?token=GHSAT0AAAAAAB6VXU7XYEWYNUDC7E2AIXYAZC4JDAA" height="128">
  </p>
</p>

<p align="center">
<a href="https://github.com/martin-herz-io/CatCrypter/releases">
  <img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/martin-herz-io/CatCrypter?include_prereleases&logo=github&style=for-the-badge">
</a>

<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/martin-herz-io/CatCrypter?logo=github&style=for-the-badge">

<a href="https://github.com/martin-herz-io/CatCrypter/releases">
  <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/martin-herz-io/CatCrypter/total?logo=github&style=for-the-badge">
</a>

<br>
 
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/martin-herz-io/CatCrypter?logo=github&style=for-the-badge">

<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/martin-herz-io/CatCrypter?logo=github&style=for-the-badge">

<a href="https://www.codefactor.io/repository/github/martin-herz-io/catcrypter">
  <img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/martin-herz-io/CatCrypter?logo=github&style=for-the-badge">
</a>

<a href="https://creativecommons.org/publicdomain/zero/1.0/deed">
  <img alt="GitHub" src="https://img.shields.io/github/license/martin-herz-io/CatCrypter?logo=github&label=License&style=for-the-badge">
</a>

</p>



## What is CatCrypter?
CatCrypter is a tool that allows to store account data (username or email and password) in an encrypted (AES-256) file protected by password. The files can be stored locally or in the cloud.

CatCrypter is developed using web technologies in React, Vite and Tauri. Currently there is no web or mobile app version of CatCrypter, but it is planned, but no date is set yet.

### Warning:
At the moment there is no productive version of CatCrypter available. Bugs are still possible.



## How to install CatCrypter?
To install and use CatCrypter, it is recommended to use the installer. Just go to [Releases](https://github.com/martin-herz-io/CatCrypter/releases) and download the latest version (msi installer).

### MSI Installier (Recommended)
Coming soon

### ZIP Installer (Not recommended)
Coming soon

### Repository Build (Not recommended)
1. Clone the repository (or download it as a ZIP).
2. Open a terminal in the same path (e.g. Windows Powershell or the terminal via Visual Studio Code).
3. Download all needed npm packages by typing `npm install`.
4. Now create a build version of the project by entering the following command `npm run tauri build`.
5. Now you can install CatCrypter in the displayed folder *(usually: /src-tauri/target/release/bundle/msi/)* using MSI.
