// Imports
import { exists, BaseDirectory, writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { useState } from "react";
import { NavButton } from "./components/NavButton";
import { Icon } from "./components/utilities/Icon";
import { PasswordItem } from "./components/PasswordItem";


// Application
function App() {

  // Switch Modal on and off
  const [modalState, setModalState] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>((<></>))
  const toggleModal = () => { setModalState(!modalState) }



  // Loaded tray list from file
  const [trayList, setTrayList] = useState([
    {
      "title": "BetterVisuals Social Media",
      "date": "1675258838"
    },
    {
      "title": "BetterVisuals Server",
      "date": "1675258838"
    },
    {
      "title": "martin-herz.io",
      "date": "1675258838"
    },
  ])

  // Selected tray list
  const [selectedTray, setSelectedTray] = useState<number|null>(null)



  // Current password list
  const [passwordList, setPasswordList] = useState([
    {
      "title": "Instagram",
      "username": "Max.Mustermann",
      "password": "U8UawqbxOfOJ7H5C£99=swDLLDxx!+6R",
    },
    {
      "title": "Twitter",
      "username": "MaxMustermann",
      "password": "XS4$g¤C5@-J$La+SLUx-XZ£h#YR+-u+Q",
    },
    {
      "title": "Facebook",
      "username": "max@mustermann.de",
      "password": "A3AKC63zI#AQQqyZ§CU3g57%O302ZH¤T",
    },

    {
      "title": "Instagram",
      "username": "Max.Mustermann",
      "password": "U8UawqbxOfOJ7H5C£99=swDLLDxx!+6R",
    },
    {
      "title": "Twitter",
      "username": "MaxMustermann",
      "password": "XS4$g¤C5@-J$La+SLUx-XZ£h#YR+-u+Q",
    },
    {
      "title": "Facebook",
      "username": "max@mustermann.de",
      "password": "A3AKC63zI#AQQqyZ§CU3g57%O302ZH¤T",
    },
  ])


  
  // Add Account Modal
  const addAccountModal = (
    <div className={`flex flex-col gap-4 items-center`}>
      <div className={"text-center"}>
        <p className={"text-2xl opacity-60 cursor-default"}>Account hinzufügen</p>
      </div>
      <div className={"flex flex-col gap-4"}>
          
        <input type="text" placeholder={"Titel"} className={"textbox"} />
          
        <input type="text" placeholder={"Anmelde-ID"} className={"textbox"} />
          
        <input type="password" placeholder={"Passwort"} className={"textbox"} />

        <div className={"flex flex-row gap-4"}>
          <button onClick={() => {}} className={"button btn-ok"}>Hinzufügen</button>
          <button onClick={() => {setModalState(false)}} className={"button"}>Abbrechen</button>
        </div>
      </div>
    </div>
  )



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
      <div className={"min-w-[20rem] h-full bg-zinc-800/50 p-2.5 flex flex-col gap-2 overflow-auto"}>

        {/* Tray list */}
        {trayList.map((i, index) => {

          // Check if tray is selected
          const active = index === selectedTray

          return (
            <NavButton key={index} onClick={() => {setSelectedTray(index)}} title={i.title} date={i.date} active={active} />
          )
        })}

        {/* Add button */}
        <NavButton onClick={() => {setModalContent(<></>); toggleModal()}} title={""} date={""} addButton={true} />

      </div>



      {/* Password List */}
      <div className={"w-full h-full flex flex-col gap-4 py-8 overflow-auto"}>

        {selectedTray === null ? (
          <div className="w-[36rem] mx-auto h-full flex flex-col gap-4 justify-center items-center text-center">
            <Icon name={"file-tray"} className={"w-16 opacity-60"} />
            <p className={"text-2xl opacity-60 cursor-default"}>Keine Ablage ausgewählt.</p>
          </div>
        ) : (
          <>
            {passwordList.map((i, index) => {
              return (
                <PasswordItem 
                  index={index}
                  i={i}
                  passwordList={passwordList}
                  setPasswordList={setPasswordList}
                  setModalState={setModalState}
                  setModalContent={setModalContent}
                  toggleModal={toggleModal}
                />
              )
            })}

            <button onClick={() => {setModalContent(addAccountModal); toggleModal()}} className={"group w-[36rem] hover:scale-[0.975] mx-auto px-4 py-4 border-2 border-zinc-800 hover:border-zinc-700 border-dashed rounded-xl relative flex items-center gap-3 cursor-pointer transition-all duration-300"}>
              <Icon name={"add-circle"} className={"w-8 opacity-60 group-hover:opacity-100 transition-all duration-300"} />
              <p className={"text-lg font-semibold mt-1 cursor-pointer opacity-60 group-hover:opacity-100 transition-all duration-300"}>Hinzufügen</p>
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default App;
