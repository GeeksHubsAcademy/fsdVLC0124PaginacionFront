
import axios from 'axios'

export const bringCharactersP = async (page) => {
    
    return await axios.get(page || `https://rickandmortyapi.com/api/character/?page=1`)
}