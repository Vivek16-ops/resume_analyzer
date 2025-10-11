
export const testingAPI = async (req,res) =>{
    try {
        return res.json({success:true,message:"Successfully extablished connection to Testing API"})
    } catch (error) {
        return res.json({success:false,message:"testing API failed" , error_message:error.message})
    }
}