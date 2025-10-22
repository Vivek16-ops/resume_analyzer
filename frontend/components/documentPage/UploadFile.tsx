import { useNavigate } from 'react-router-dom';

const uploadFile = () => {
     const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/Resume_checker')
    }

    return (
        <button onClick={()=>handleClick()}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold 
                 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 
                 backdrop-blur-lg border border-white/20"
        >
            Upload More Files for Analysis
        </button>
    );
}

export default uploadFile
