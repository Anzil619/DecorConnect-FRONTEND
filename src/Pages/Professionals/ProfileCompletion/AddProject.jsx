import React from 'react'
import Logo from "../../../assets/logos/dc-black-transparent.png"
import { Input } from "@material-tailwind/react";
import { Progress, Textarea } from "@material-tailwind/react";

function AddProject() {
    

  return (
    <div className=''>
    <div className='flex justify-center my-12'>
        <img src={Logo} className='w-20' alt="" />
    </div>
    <Progress
  value={50}
  size="lg"
  className="border border-gray-900/10 bg-gray-900/5 p-1 my-12"
/>

<div className='flex justify-center my-20'>
    <h1 className='text-2xl font-bold text-blue-gray-400'>COMPLETE YOUR PROFILE</h1>
</div>

<div className='flex justify-center'>
<form action="" className="grid grid-cols-2 gap-x-20 gap-y-8">
<Input color="teal" label="Project Name" className='w-96 '/>
<Input color="teal" label="Project Year" className='w-96 border-gray-300'/>
<Textarea color="teal" label="Project Address"/>
<Input color="teal" label="Project Cost" className='w-96 border-gray-300'/>
<Input color="teal" label="Project Image" className='w-96 border-gray-300' type='file'/>
<button className="col-span-2 bg-teal-500 text-white px-4 py-2 w-28 rounded-2xl hover:bg-blue-600 ml-auto">
  Continue
</button>

</form>
</div>


</div>
  )
}

export default AddProject