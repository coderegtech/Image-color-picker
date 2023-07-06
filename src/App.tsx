import { useCallback, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useEyeDropper from 'use-eye-dropper';
export default function Home() {
  const [imgUrl, setImgUrl] = useState<any>("")
  const [preview, setPreview] = useState<any>("")
  const [hexColor, setHexColor] = useState<string>("#bf1d85")
  const imgRef = useRef<any>(null)
  const { open } = useEyeDropper()

  const previewImg = () => {
    setPreview(imgUrl)
  }

  // get image from file input then set to preview 
  const getImgFile = (event: any) => {
    const file = event.target.files[0]
    setPreview(URL.createObjectURL(file))
    setImgUrl("")
  }


  // enable file picker
  const openImgSelector = () => {
    imgRef.current.click()
  }

  // enable Eye Dropper
  const pickColor = useCallback(() => {
    // Using async/await (can be used as a promise as-well)
    const openPicker = async () => {
      try {
        const color = await open()
        setHexColor(color.sRGBHex)
      } catch (e) {
        console.log(e)
      }
    }
    openPicker()
  }, [open])


  // copy hexcode to clipboard
  const copyHexColor = () => {
    navigator.clipboard.writeText(hexColor)
    // alert popup
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  return (
    <main className="w-full h-screen flex items-center justify-center bg-wall bg-center bg-cover relative ">

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="container max-w-[90vw] w-full h-[90dvh] bg-white rounded-xl md:overflow-hidden flex  flex-wrap shadow-2xl overflow-y-auto">

        <div className="md:max-w-[400px] w-full h-full  p-5 overflow-y-auto">

          <h2 className="font-sans text-white text-xl md:text-3xl font-bold  text-center">IMAGE COLOR PICKER</h2>

          <div className="pt-5">
            <p className="py-3 text-white text-base">IMAGE URL</p>
            <div className="flex gap-2 ">
              <input
                onChange={(e) => setImgUrl(e.target.value)}
                value={imgUrl}
                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-md focus:outline-none text-white" type="text" placeholder="Enter Image Url..." />
              <button onClick={previewImg} className="rounded-md px-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white" type="button">SUBMIT</button>
            </div>

            <p className="py-3 text-white text-base">UPLOAD FILE</p>

            <div onClick={openImgSelector} className=" w-48 h-32 border-dashed border-2 border-[#f8f8f85d]  rounded-md grid place-items-center cursor-pointer">
              <span className="">
                <input ref={imgRef} type="file" hidden accept="image/*" onChange={getImgFile} />
                <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <g id="Complete">

                    <g data-name="add" id="add-2">

                      <g>

                        <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5" />

                        <line fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12" />

                      </g>

                    </g>

                  </g>

                </svg>

              </span>
            </div>

          </div>


          <div className="pt-5">
            <p className="py-3 text-white text-base">COLOR PICKER</p>
            <button onClick={pickColor} className="mb-3 w-full px-3 py-2 rounded-md bg-white shadow-md">Open EyeDropper</button>
            <div onClick={copyHexColor} style={{ backgroundColor: hexColor }} className="shadow-xl w-full h-60 rounded-md grid place-items-center cursor-pointer" title="Copy to clipboard">
              <span className="text-4xl text-white drop-shadow-2xl">{hexColor}</span>
            </div>

          </div>

        </div>
        <div className=" grow md:h-full bg-black/30  p-10 rounded-2xl">

          <div className="w-full h-full relative grid place-items-center ">
            <span className={`${preview ? 'block' : 'hidden'}  absolute -top-3 -right-3  rounded-full bg-black/50 p-1`} onClick={() => {
              setImgUrl("")
              setPreview("")
            }}>
              <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" /></svg>

            </span>

            {!preview ?
              <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10V6C4 4.89543 4.89543 4 6 4H12M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V15M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8481 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5864L15.7901 12.4679C16.4651 11.9279 17.4053 11.8855 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5301L20 14.1901M20 14.1901V6C20 4.89543 19.1046 4 18 4H17M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              :
              <img className="duration-300 w-full h-full object-cover rounded-md overflow-hidden shadow-xl" src={preview} alt="" />
            }


          </div>

        </div>


      </div>

    </main>
  )
}
