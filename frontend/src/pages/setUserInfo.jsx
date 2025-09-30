
export default function setProfileInformation() {


    return (
        <div className="bg-gray-600 flex justify-center min-h-screen  " >

            <div className="bg-gray-800 relative h-max  self-center p-10 rounded-2xl    " >

                <div className="flex flex-col justify-center items-center self-center">
                    <img className="h-40 wo-40 rounded-full m-5    bg-emerald-300" src="/vite.svg  " ></img>
                    <div>
                        <input type="file" name="profilePicture " accept="image/* " className="bg-emerald-600" ></input>
                    </div>

                </div>


                <div className="flex flex-row ml-4 mr-2 my-5 ">
                    <label className="text-white  self-start  mx-10">
                        Status 
                    </label>
                    <input className="w-full rounded-xl focus:outline-none  focus:border-transparent transition-all duration-200 backdrop-blur-sm pl-14" type="text" name="Status"></input>
                </div>
            </div>
        </div>
    )
}