// Imports
import { exists, BaseDirectory, writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { useEffect, useState } from "react";
import { NavButton } from "./components/NavButton";
import { Icon } from "./components/Icon";


// Application
function App() {

  // Switch Modal on and off
  const [modal, setModal] = useState("flex")
  const toggleModal = () => setModal(modal === "hidden" ? "flex" : "hidden")

  // const [config, setConfig] = useState({ "trays": [] });

  // useEffect(() => {
  //   const init = async () => {
  //     await exists('config.json', { dir: BaseDirectory.App }).then(async (exists) => {
  //       if (!exists) {
  //         alert('Config not found');
  //         await writeTextFile(
  //           'config.json',
  //           JSON.stringify(config),
  //           { dir: BaseDirectory.App }
  //         );
  //       } else {
  //         alert('Config found');
  //         await readTextFile('config.json', { dir: BaseDirectory.App }).then((data) => {
  //           setConfig(JSON.parse(data));
  //         });
  //       }
  //     });
  //   }

  //   init();
  // }, []);

  const pwList = [
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
  ]
  
  return (
    <div className={"w-screen h-screen flex flex-row overflow-hidden"}>

      {/* Modal */}
      <div className={`z-10 absolute bg-black/60 backdrop-blur-sm w-full h-full ${modal} flex-col justify-center`}>
        <div className={"bg-zinc-800 w-full py-8 relative"}>

          {/* Close button */}
          <button onClick={toggleModal} className={"absolute top-2 right-2 opacity-60 hover:opacity-100 cursor-pointer transition-all duration-300"}><Icon name={"close"} className={"w-6"} /></button>

          {/* New tray */}
          <div className={"flex flex-col gap-4 items-center"}>
            <p className={"text-2xl opacity-60"}>Neue Ablage</p>
            <div className={"flex flex-row gap-4"}>
              <input className={"outline-none bg-zinc-800 border-2 border-zinc-700 rounded-full px-4 py-2"} placeholder={"Name"} />
            </div>
          </div>

        </div>
      </div>

      {/* Tray list */}
      <div className={"min-w-[20rem] h-full bg-zinc-800/50 p-2.5 flex flex-col gap-2 overflow-auto"}>

        <NavButton title={"BetterVisuals Social Media"} date={"1675258838"} active={true} />
        <NavButton title={"BetterVisuals Server"} date={"1675258838"} />
        <NavButton title={"martin-herz.io"} date={"1675258838"} />

        <NavButton onClick={() => {toggleModal()}} title={""} date={""} addButton={true} />

      </div>

      {/* Password List */}
      <div className={"w-full h-full flex flex-col gap-4 py-8 overflow-auto"}>

        {pwList.map((pw, index) => {

          // Hidden password
          const hidenPassword = pw.password.replace(/./g, "•")

          // Switch between password and hidden password
          const [showPassword, setShowPassword] = useState(false)
          const togglePassword = () => setShowPassword(!showPassword)

          // Switch between password and hidden password on click
          const [password, setPassword] = useState(hidenPassword)
          const [viewIcon, setViewIcon] = useState("eye")
          const togglePasswordOnClick = () => {
            if (showPassword) {
              setPassword(hidenPassword)
              setViewIcon("eye")
            } else {
              setPassword(pw.password)
              setViewIcon("eye-off")
            }
            togglePassword()
          }

          // Copy password or username to clipboard
          const copyToClipboard = (text: string) => {
            navigator.clipboard.writeText(text)
          }

          return (
            <div className={"w-[36rem] mx-auto px-4 py-2 bg-zinc-800/50 border-2 border-zinc-800 rounded-xl relative"}>
              <p className={"font-semibold text-xl opacity-60 cursor-default"}>{ pw.title }</p>
              
              <div className={"mt-2 flex gap-8"}>
                <div>
                  <p className={"opacity-60 font-light cursor-default"}>Anmelde-ID: </p>
                  <p className={"opacity-60 font-light cursor-default"}>Passwort: </p>
                </div>

                <div>
                  <div className={"flex gap-1 items-center"}>
                    <p className={""}>{pw.username}</p>
                    <button onClick={() => {copyToClipboard(pw.username)}}><Icon name={"copy"} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
                  </div>
                  
                  <div className={"flex gap-1 items-center"}>
                    <p className={""}>{password}</p>
                    <button onClick={() => {copyToClipboard(pw.password)}}><Icon name={"copy"} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
                    <button onClick={togglePasswordOnClick}><Icon name={viewIcon} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
                  </div>
                </div>
              </div>

              <div className={"absolute top-2 right-2 flex gap-2"}>
                <button><Icon name={"cog"} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
                <button><Icon name={"copy"} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
                <button><Icon name={"trash"} className={"w-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"} /></button>
              </div>
            </div>
          )
        })}

        <button onClick={() => {toggleModal()}} className={"group w-[36rem] hover:scale-[0.975] mx-auto px-4 py-4 border-2 border-zinc-800 hover:border-zinc-700 border-dashed rounded-xl relative flex items-center gap-3 cursor-pointer transition-all duration-300"}>
          <Icon name={"add-circle"} className={"w-8 opacity-60 group-hover:opacity-100 transition-all duration-300"} />
          <p className={"text-lg font-semibold mt-1 cursor-pointer opacity-60 group-hover:opacity-100 transition-all duration-300"}>Hinzufügen</p>
        </button>

      </div>
    </div>
  );
}

export default App;
