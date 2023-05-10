import axios from "axios";

export const buyNGAxios = axios.create({
    baseURL:'https://localhost:44307/api/',
    headers:{
        'Content-Type':"application/json"
    }
})


// export const axiosFormData = axios.create({
//     baseURL:'https://localhost:44307/api/',
//     headers:{
//         'Content-Type':"multipart/form-data"
//     }
// })

export const getStates = async (setStates)=>{
    try {
      const result = await buyNGAxios.get("https://locus.fkkas.com/api/states");
      setStates(result.data.data);
    } catch (error) {
      setStates([]);
    }  
}
  
export const getRegions = async (setRegions, states) =>{
    try {
      const endPoints = states.map(state=>{
          return `https://locus.fkkas.com/api/regions/${state.alias}`
      })
      const result = await axios.all(endPoints.map(endPoint=>{
        return buyNGAxios.get(endPoint);
      }))
      const regions = result.map(item=>{
          return item.data.data;
      })
      setRegions(regions);
    } catch (error) {
      setRegions([]);
    }
}

  
export const getDataOnMount = async (endPoints, setUser, setProductCategory)=>
{
  try {
    const result = await axios.all(endPoints.map(endPoint=>{
      return buyNGAxios.get(endPoint);
    }))

    if (result.length > 1) {
      setUser(result[0].data.userDetails);
      setProductCategory(result[1].data)
    }
    else{
      setProductCategory(result[0].data)
    }
  } catch (error) {
    setUser(null);
    setProductCategory([]);
  }
}
