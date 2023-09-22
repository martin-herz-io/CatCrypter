// Imports
import { useEffect, useState } from "react";
import { fs } from '@tauri-apps/api'
import { NavButton } from "./components/NavButton";
import { Icon } from "./components/utilities/Icon";
import { PasswordItem } from "./components/PasswordItem";
import { AddPassword } from "./components/modals/AddPassword";
import { SelectCreateOpenTray } from "./components/modals/SelectCreateOpenTray";
import { LoadTray } from "./components/modals/LoadTray";
import "./scripts/i18n";
import { useTranslation } from 'react-i18next';
import { Settings } from "./components/modals/Settings";


// Application
function App() {

  // Version
  const v = "1.2.0-beta"

  // Check if Production or Development mode
  let debugMode = false
  if (process.env.NODE_ENV === "development") {
    debugMode = true
  }

  // Language
  const [language, setLanguage] = useState<string>("en")

  // Switch Modal on and off
  const [modalState, setModalState] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>((<></>))
  const toggleModal = () => { setModalState(!modalState) }



  // Loaded tray list from file
  const [trayList, setTrayList] = useState<{ title: string; logo?: string; color?: string; date: string; location: string; }[]>([])

  // Selected tray list
  const [selectedTray, setSelectedTray] = useState<number|null>(null)

  // Current tray password
  const [currentTrayPassword, setCurrentTrayPassword] = useState<string>("")



  // Current password list
  const [passwordList, setPasswordList] = useState<{ title: string; username: string; password: string; }[]>([])



  // Load tray list from file
  useEffect(() => {

    // Config file name depending on 
    let configFile = "config.txt"
    if (debugMode) {
      configFile = "config.debug.txt"
    }

    // Check if config file exists and create it if not
    fs.exists(configFile, { dir: fs.BaseDirectory.AppLocalData }).then((exists) => {
      if (!exists) {

        // Create config file
        fs.writeTextFile(configFile, JSON.stringify({
          "language": "en",
          "trayList": []
        }), { dir: fs.BaseDirectory.AppLocalData })
      } else {

        // Load config file
        fs.readTextFile(configFile, { dir: fs.BaseDirectory.AppLocalData }).then((data) => {
          const config = JSON.parse(data)
          setTrayList(config.trayList)
          setLanguage(config.language)
        })
      }
    })

    if (debugMode === false) {
      document.addEventListener("contextmenu", (e) => { e.preventDefault() })
    }
  }, [])


  // Translation
  const { t, i18n } = useTranslation()
  useEffect(() => { i18n.changeLanguage(language) }, [language])



  return (
    <div className={"w-screen h-screen flex flex-row overflow-hidden"}>

      {/* Modal */}
      {modalState && (
        <div className={`z-10 absolute bg-black/60 backdrop-blur-sm w-full h-full flex flex-col justify-center`}>
          <div className={"bg-zinc-800 w-full py-8 relative"}>

            {/* Close button */}
            <button onClick={toggleModal} className={"absolute top-2 right-2 opacity-60 hover:opacity-100 cursor-pointer transition-all duration-300"}><Icon name={"close"} className={"w-6"} /></button>

            {/* Modal content */}
            {
              modalContent
            }

          </div>
        </div>
      )}



      {/* Tray list */}
      <div className={"min-w-[20rem] h-full bg-zinc-800/50 flex flex-col"}>

        <div className="h-full p-2.5 flex flex-col gap-2 overflow-auto">

            {/* Tray list */}
            {trayList.map((i, index) => {

              // Check if tray is selected
              const active = index === selectedTray

              return (
                <NavButton t={t} key={index} onClick={() => {setModalContent(<LoadTray t={t} select={index} trayList={trayList} setSelectedTray={setSelectedTray} setCurrentTrayPassword={setCurrentTrayPassword} setPasswordList={setPasswordList} setModalState={setModalState} />); toggleModal()}} title={i.title} logo={i.logo ? i.logo : null} color={i.color} date={i.date} active={active} />
              )
            })}

            {/* Add button */}
            <NavButton t={t} onClick={() => {setModalContent(<SelectCreateOpenTray t={t} trayList={trayList} setTrayList={setTrayList} setModalState={setModalState} setModalContent={setModalContent} />); toggleModal()}} title={""} date={""} addButton={true} />

        </div>

        <div className="min-h-fit p-2.5">
          <button

            onClick={() => {setModalContent(<Settings v={v} t={t} language={language} setLanguage={setLanguage} setModalContent={setModalContent} />); toggleModal()}}
            className={"w-full button flex justify-center items-center gap-1"}

            >

            <Icon name={"cog"} className={"w-6"} />
            {t('settings')}

          </button>
        </div>

      </div>



      {/* Password List */}
      <div className={"w-full h-full flex flex-col gap-4 py-8 overflow-auto"}>

        {selectedTray === null ? (
          <div className="w-[36rem] mx-auto h-full flex flex-col gap-4 justify-center items-center text-center">
            <Icon name={"file-tray"} className={"w-16 opacity-60"} />
            <p className={"text-2xl opacity-60 cursor-default"}>{t('noTraySelected')}</p>
          </div>
        ) : (
          <>
            {passwordList.map((i, index) => {
              return (
                <PasswordItem 
                  key={index}
                  index={index}
                  i={i}
                  passwordList={passwordList}
                  setPasswordList={setPasswordList}
                  trayList={trayList}
                  selectedTray={selectedTray}
                  currentTrayPassword={currentTrayPassword}
                  setModalState={setModalState}
                  setModalContent={setModalContent}
                  t={t}
                  toggleModal={toggleModal}
                />
              )
            })}

            <button onClick={() => {setModalContent(<AddPassword t={t} passwordList={passwordList} setPasswordList={setPasswordList} trayList={trayList} selectedTray={selectedTray} currentTrayPassword={currentTrayPassword} setModalState={setModalState} />); toggleModal()}} className={"group w-[36rem] hover:scale-[0.975] mx-auto px-4 py-4 border-2 border-zinc-800 hover:border-zinc-700 border-dashed rounded-xl relative flex items-center gap-3 cursor-pointer transition-all duration-300"}>
              <Icon name={"add-circle"} className={"w-8 opacity-60 group-hover:opacity-100 transition-all duration-300"} />
              <p className={"text-lg font-semibold mt-1 cursor-pointer opacity-60 group-hover:opacity-100 transition-all duration-300"}>{t('add')}</p>
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
