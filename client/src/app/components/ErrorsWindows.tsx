import CloseIcon from '@mui/icons-material/Close';

interface Props {
    errors: string | string[],
    setError: (error: string) => void
}

const ErrorWindows = ({errors, setError}:Props) => {
    
    
    return(
        <div className="fixed top-4 z-50 bg-white border border-red-300 shadow-lg rounded-lg p-4 w-full lg:w-5/12">
            <div className='flex items-start gap-4'>
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                    {Array.isArray(errors) ?
                    <div className="w-full">
                        {errors.map(err =>(
                            <h1 key={err} className="p-1 font-bold text-center text-red-500">{err}</h1>
                        ))}
                    </div>
                    :
                    <div className="w-full">
                        <h1 className="font-bold text-red-500">{errors}</h1>
                    </div>
                    }
                </div>
                <button onClick={()=>setError('')} className='text-gray-700 border border-white rounded-lg hover:border-gray-300'>
                    <CloseIcon/>
                </button> 
            </div>
        </div> 
    )
}

export default ErrorWindows